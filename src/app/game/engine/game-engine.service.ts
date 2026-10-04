import { Injectable, NgZone, OnDestroy } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { Direction } from '../../shared/types';
import { PacMan } from '../entities/pacman';
import { MAZE_LAYOUT, getTileAt, isWalkable } from '../maze/maze.model';

/** Fixed simulation timestep: 60 updates per second regardless of display refresh rate. */
export const FIXED_STEP_MS = 1000 / 60;

/**
 * Upper bound on a single frame's delta. Prevents a "spiral of death" after the tab
 * was backgrounded or the device stalled (we drop time instead of fast-forwarding).
 */
export const MAX_FRAME_DELTA_MS = 250;

/** Pac-Man base speed in tiles per second. */
export const PACMAN_SPEED_TILES_PER_SEC = 7.5;

/** Classic Pac-Man spawn tile (column, row). */
export const PACMAN_SPAWN = { col: 13, row: 23 } as const;

const EPSILON = 1e-6;

const DIRECTION_VECTORS: Record<Direction, { dx: number; dy: number }> = {
  up: { dx: 0, dy: -1 },
  down: { dx: 0, dy: 1 },
  left: { dx: -1, dy: 0 },
  right: { dx: 1, dy: 0 },
  none: { dx: 0, dy: 0 },
};

const OPPOSITE: Record<Direction, Direction> = {
  up: 'down',
  down: 'up',
  left: 'right',
  right: 'left',
  none: 'none',
};

/** Pac-Man may not enter walls nor the ghost house / its door. */
function isPacManWalkable(row: number, col: number): boolean {
  const width = MAZE_LAYOUT[0].length;
  const wrappedCol = ((col % width) + width) % width;
  const tile = getTileAt(row, wrappedCol);
  return isWalkable(row, wrappedCol) && tile !== 'ghost-house' && tile !== 'ghost-door';
}

/**
 * Game engine service (MOD-GAME-ENGINE).
 *
 * Runs a requestAnimationFrame loop with an accumulator so that the simulation
 * advances in fixed {@link FIXED_STEP_MS} steps independent of the display frame rate.
 *
 * - `tick$` emits the running step count after every fixed update. Per-tick systems
 *   (collision checks, level / scared / scatter-chase timers) subscribe here.
 * - `frame$` emits once per animation frame with the interpolation alpha (0..1)
 *   so the renderer can draw at the display's refresh rate.
 */
@Injectable({ providedIn: 'root' })
export class GameEngineService implements OnDestroy {
  private readonly tickSubject = new Subject<number>();
  private readonly frameSubject = new Subject<number>();

  readonly tick$: Observable<number> = this.tickSubject.asObservable();
  readonly frame$: Observable<number> = this.frameSubject.asObservable();

  readonly pacman = new PacMan(PACMAN_SPAWN.col, PACMAN_SPAWN.row);

  private tickCount = 0;
  private accumulator = 0;
  private lastTimestamp: number | null = null;
  private frameHandle: number | null = null;
  private running = false;
  private paused = false;
  private queuedDirection: Direction | null = null;
  private directionSubscription: Subscription | null = null;

  constructor(private readonly zone: NgZone) {}

  /** Number of fixed updates performed since the last `start()`. */
  get ticks(): number {
    return this.tickCount;
  }

  get isRunning(): boolean {
    return this.running && !this.paused;
  }

  /** Reset the simulation and begin the animation-frame loop. */
  start(): void {
    this.cancelFrame();
    this.tickCount = 0;
    this.accumulator = 0;
    this.lastTimestamp = null;
    this.queuedDirection = null;
    this.resetPacMan();
    this.running = true;
    this.paused = false;
    this.scheduleFrame();
  }

  stop(): void {
    this.running = false;
    this.paused = false;
    this.cancelFrame();
  }

  pause(): void {
    if (!this.running || this.paused) {
      return;
    }
    this.paused = true;
    this.cancelFrame();
  }

  resume(): void {
    if (!this.running || !this.paused) {
      return;
    }
    this.paused = false;
    // Discard elapsed paused time so the simulation does not jump forward.
    this.lastTimestamp = null;
    this.scheduleFrame();
  }

  /** Queue a direction change; applied to Pac-Man at the next fixed update. */
  setDirection(direction: Direction): void {
    this.queuedDirection = direction;
  }

  /** Consume a direction stream (e.g. InputService) — replaces any previous binding. */
  bindDirectionStream(direction$: Observable<Direction>): void {
    this.directionSubscription?.unsubscribe();
    this.directionSubscription = direction$.subscribe((direction) => this.setDirection(direction));
  }

  ngOnDestroy(): void {
    this.stop();
    this.directionSubscription?.unsubscribe();
    this.tickSubject.complete();
    this.frameSubject.complete();
  }

  private scheduleFrame(): void {
    this.zone.runOutsideAngular(() => {
      this.frameHandle = requestAnimationFrame((timestamp) => this.onFrame(timestamp));
    });
  }

  private cancelFrame(): void {
    if (this.frameHandle !== null) {
      cancelAnimationFrame(this.frameHandle);
      this.frameHandle = null;
    }
  }

  private onFrame(timestamp: number): void {
    this.frameHandle = null;
    if (!this.running || this.paused) {
      return;
    }
    const delta = this.lastTimestamp === null ? 0 : timestamp - this.lastTimestamp;
    this.lastTimestamp = timestamp;
    this.accumulator += Math.min(Math.max(delta, 0), MAX_FRAME_DELTA_MS);

    // Small tolerance absorbs floating-point drift from 1000/60 arithmetic.
    while (this.accumulator + EPSILON >= FIXED_STEP_MS && this.running && !this.paused) {
      this.accumulator = Math.max(0, this.accumulator - FIXED_STEP_MS);
      this.update();
    }

    this.frameSubject.next(this.accumulator / FIXED_STEP_MS);
    if (this.running && !this.paused) {
      this.scheduleFrame();
    }
  }

  /** One fixed simulation step. */
  private update(): void {
    if (this.queuedDirection !== null) {
      this.pacman.setDirection(this.queuedDirection);
      this.queuedDirection = null;
    }
    this.movePacMan((PACMAN_SPEED_TILES_PER_SEC * FIXED_STEP_MS) / 1000);
    this.tickCount++;
    this.tickSubject.next(this.tickCount);
  }

  private resetPacMan(): void {
    this.pacman.x = PACMAN_SPAWN.col;
    this.pacman.y = PACMAN_SPAWN.row;
    this.pacman.direction = 'left';
    this.pacman.nextDirection = 'left';
  }

  /**
   * Tile-grid movement: turns are taken at tile centres, reversals are immediate,
   * and Pac-Man stops at a tile centre when the way ahead is a wall.
   */
  private movePacMan(distance: number): void {
    const pac = this.pacman;
    const width = MAZE_LAYOUT[0].length;
    let remaining = distance;

    while (remaining > EPSILON) {
      const col = Math.round(pac.x);
      const row = Math.round(pac.y);
      const atCentre = Math.abs(pac.x - col) < EPSILON && Math.abs(pac.y - row) < EPSILON;

      if (atCentre) {
        pac.x = col;
        pac.y = row;
        const next = pac.nextDirection;
        if (next !== 'none') {
          const v = DIRECTION_VECTORS[next];
          if (isPacManWalkable(row + v.dy, col + v.dx)) {
            pac.direction = next;
          }
        }
        const v = DIRECTION_VECTORS[pac.direction];
        if (pac.direction === 'none' || !isPacManWalkable(row + v.dy, col + v.dx)) {
          return;
        }
        const step = Math.min(remaining, 1);
        pac.x += v.dx * step;
        pac.y += v.dy * step;
        remaining -= step;
      } else {
        if (pac.direction === 'none') {
          return;
        }
        if (pac.nextDirection === OPPOSITE[pac.direction] && pac.nextDirection !== 'none') {
          pac.direction = pac.nextDirection;
        }
        const v = DIRECTION_VECTORS[pac.direction];
        const target =
          v.dx > 0 ? Math.ceil(pac.x) : v.dx < 0 ? Math.floor(pac.x) : v.dy > 0 ? Math.ceil(pac.y) : Math.floor(pac.y);
        const current = v.dx !== 0 ? pac.x : pac.y;
        const step = Math.min(remaining, Math.abs(target - current));
        pac.x += v.dx * step;
        pac.y += v.dy * step;
        remaining -= step;
        if (step < EPSILON) {
          // Snap to avoid stalling on float residue.
          pac.x = v.dx !== 0 ? target : pac.x;
          pac.y = v.dy !== 0 ? target : pac.y;
        }
      }

      // Tunnel wraparound.
      if (pac.x < -0.5) {
        pac.x += width;
      } else if (pac.x >= width - 0.5) {
        pac.x -= width;
      }
    }
  }
}
