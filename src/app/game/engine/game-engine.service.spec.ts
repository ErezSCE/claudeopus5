import { TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { Direction } from '../../shared/types';
import { getTileAt } from '../maze/maze.model';
import {
  FIXED_STEP_MS,
  GameEngineService,
  MAX_FRAME_DELTA_MS,
  PACMAN_SPAWN,
} from './game-engine.service';

describe('GameEngineService', () => {
  let service: GameEngineService;
  let pendingFrame: FrameRequestCallback | null;
  let now: number;
  let handleSeq: number;

  /** Fire one mocked animation frame `deltaMs` after the previous one. */
  function frame(deltaMs: number): void {
    now += deltaMs;
    const cb = pendingFrame;
    pendingFrame = null;
    if (cb) {
      cb(now);
    }
  }

  /** Fire the first frame (establishes the timestamp baseline) then frames with the given delta. */
  function runFor(totalMs: number, deltaMs: number | (() => number)): void {
    frame(0);
    let elapsed = 0;
    while (elapsed < totalMs - 1e-9) {
      const d = typeof deltaMs === 'number' ? deltaMs : deltaMs();
      const step = Math.min(d, totalMs - elapsed);
      frame(step);
      elapsed += step;
    }
  }

  beforeEach(() => {
    pendingFrame = null;
    now = 1000;
    handleSeq = 0;
    spyOn(window, 'requestAnimationFrame').and.callFake((cb: FrameRequestCallback) => {
      pendingFrame = cb;
      return ++handleSeq;
    });
    spyOn(window, 'cancelAnimationFrame').and.callFake(() => {
      pendingFrame = null;
    });
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameEngineService);
  });

  afterEach(() => service.stop());

  it('should be created', () => {
    expect(service).toBeInstanceOf(GameEngineService);
  });

  describe('fixed-timestep loop', () => {
    it('[US-002#1] performs ~60 updates per second regardless of frame rate', () => {
      const counts: number[] = [];
      for (const fps of [30, 60, 75, 144, 240]) {
        service.start();
        runFor(1000, 1000 / fps);
        counts.push(service.ticks);
      }
      for (const c of counts) {
        expect(c).toBeGreaterThanOrEqual(59);
        expect(c).toBeLessThanOrEqual(60);
      }
    });

    it('[US-002#1] logged update count over a jittery interval matches the fixed timestep', () => {
      let seed = 7;
      const jitter = (): number => {
        seed = (seed * 9301 + 49297) % 233280;
        return 5 + (seed / 233280) * 40; // 5ms .. 45ms
      };
      service.start();
      runFor(2000, jitter);
      expect(Math.abs(service.ticks - 2000 / FIXED_STEP_MS)).toBeLessThanOrEqual(1);
    });

    it('[US-002#1] clamps huge frame deltas to avoid a spiral of death', () => {
      service.start();
      frame(0);
      frame(5000);
      expect(service.ticks).toBe(Math.floor(MAX_FRAME_DELTA_MS / FIXED_STEP_MS + 1e-6));
    });

    it('[US-002#1] emits tick$ once per fixed update', () => {
      const ticks: number[] = [];
      const sub = service.tick$.subscribe((t) => ticks.push(t));
      service.start();
      runFor(100, 50);
      sub.unsubscribe();
      expect(ticks.length).toBe(service.ticks);
      expect(ticks).toEqual(ticks.map((_, i) => i + 1));
    });

    it('[US-002#2] at 60Hz each animation frame performs exactly one update (no dropped frames)', () => {
      const alphas: number[] = [];
      const sub = service.frame$.subscribe((a) => alphas.push(a));
      service.start();
      frame(0);
      const perFrame: number[] = [];
      for (let i = 0; i < 120; i++) {
        const before = service.ticks;
        frame(FIXED_STEP_MS);
        perFrame.push(service.ticks - before);
      }
      sub.unsubscribe();
      expect(perFrame.every((n) => n === 1)).toBeTrue();
      expect(alphas.length).toBe(121);
      expect(window.requestAnimationFrame).toHaveBeenCalledTimes(122);
    });

    it('pause stops updates and resume does not fast-forward over paused time', () => {
      service.start();
      runFor(500, FIXED_STEP_MS);
      const atPause = service.ticks;
      service.pause();
      expect(service.isRunning).toBeFalse();
      frame(10000);
      expect(service.ticks).toBe(atPause);
      service.resume();
      expect(service.isRunning).toBeTrue();
      frame(0);
      frame(FIXED_STEP_MS);
      expect(service.ticks).toBe(atPause + 1);
    });

    it('stop cancels the loop', () => {
      service.start();
      runFor(100, FIXED_STEP_MS);
      service.stop();
      const t = service.ticks;
      frame(1000);
      expect(service.ticks).toBe(t);
      expect(service.isRunning).toBeFalse();
    });
  });

  describe('maze-aligned entities', () => {
    it('[US-001#1] spawns Pac-Man on a MAZE_LAYOUT corridor tile so rendering aligns with maze data', () => {
      service.start();
      expect(service.pacman.x).toBe(PACMAN_SPAWN.col);
      expect(service.pacman.y).toBe(PACMAN_SPAWN.row);
      expect(getTileAt(PACMAN_SPAWN.row, PACMAN_SPAWN.col)).not.toBe('wall');
    });

    it('[US-001#2] drives rendering through the standard requestAnimationFrame API with alpha in [0,1)', () => {
      const alphas: number[] = [];
      const sub = service.frame$.subscribe((a) => alphas.push(a));
      service.start();
      runFor(500, 7);
      sub.unsubscribe();
      expect(window.requestAnimationFrame).toHaveBeenCalled();
      expect(alphas.every((a) => a >= 0 && a < 1)).toBeTrue();
    });
  });

  describe('direction input', () => {
    it('[US-003#1] a direction from the bound stream is applied within one animation frame', () => {
      const dir$ = new Subject<Direction>();
      service.bindDirectionStream(dir$);
      service.start();
      frame(0);
      dir$.next('right');
      frame(FIXED_STEP_MS);
      expect(service.pacman.direction).toBe('right');
      expect(service.pacman.x).toBeGreaterThan(PACMAN_SPAWN.col);
    });

    it('[US-003#1] setDirection reverses Pac-Man mid-tile on the next frame', () => {
      service.start();
      frame(0);
      frame(FIXED_STEP_MS);
      expect(service.pacman.x).toBeLessThan(PACMAN_SPAWN.col);
      service.setDirection('right');
      frame(FIXED_STEP_MS);
      expect(service.pacman.direction).toBe('right');
    });

    it('[US-003#2] does not turn into a wall tile', () => {
      // Tile above the spawn is a wall.
      expect(getTileAt(PACMAN_SPAWN.row - 1, PACMAN_SPAWN.col)).toBe('wall');
      service.start();
      frame(0);
      service.setDirection('up');
      frame(FIXED_STEP_MS);
      expect(service.pacman.direction).toBe('left');
      expect(service.pacman.y).toBe(PACMAN_SPAWN.row);
    });

    it('[US-003#2] stops at the tile centre in front of a wall and never enters walls', () => {
      service.start();
      frame(0);
      for (let i = 0; i < 300; i++) {
        frame(FIXED_STEP_MS);
        const tile = getTileAt(Math.round(service.pacman.y), Math.round(service.pacman.x));
        expect(tile).not.toBe('wall');
      }
      // Row 23 corridor heading left from col 13 ends at col 6 (col 5 is a wall).
      expect(service.pacman.x).toBe(6);
      expect(service.pacman.y).toBe(PACMAN_SPAWN.row);
    });

    it('[US-003#2] queued turn is taken at the next walkable junction', () => {
      service.start();
      frame(0);
      // Col 12 on row 22 is a corridor; queue "up" while moving left.
      service.setDirection('up');
      for (let i = 0; i < 60; i++) {
        frame(FIXED_STEP_MS);
      }
      expect(service.pacman.direction).toBe('up');
      expect(service.pacman.x).toBe(12);
      expect(service.pacman.y).toBeLessThan(PACMAN_SPAWN.row);
    });
  });
});
