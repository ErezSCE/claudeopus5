import { Injectable } from '@angular/core';
import { Tile } from '../../shared/types';
import { PacMan } from '../entities/pacman';
import { Ghost } from '../entities/ghost';
import { SettingsStorageService } from '../../core/storage/settings-storage.service';

/** Pixels per maze tile. 28 columns × 16px = 448px canvas width. */
const TILE_SIZE = 16;

/** Color constants for maze rendering. */
const COLORS = {
  background: '#000000',
  wall: '#2121de',
  wallStroke: '#2121ff',
  dot: '#ffb8ae',
  pellet: '#ffb8ae',
  ghostDoor: '#ffb8de',
  ghostHouse: '#000000',
  tunnel: '#000000',
  empty: '#000000',
  pacman: '#ffff00',
} as const;

/** Standard ghost colors (red, pink, cyan, orange). */
const GHOST_COLORS_STANDARD = {
  blinky: '#ff0000',
  pinky: '#ffb8ff',
  inky: '#00ffff',
  clyde: '#ffb847',
} as const;

/** Colorblind-friendly ghost colors (high contrast, distinct hues). */
const GHOST_COLORS_COLORBLIND = {
  blinky: '#ff6b35',    // Orange-red
  pinky: '#004e89',     // Dark blue
  inky: '#f7b801',      // Yellow
  clyde: '#7209b7',     // Purple
} as const;

/** Dot radius in pixels. */
const DOT_RADIUS = 2;

/** Power pellet radius in pixels. */
const PELLET_RADIUS = 6;

/** Pac-Man radius in pixels (slightly smaller than half tile). */
const PACMAN_RADIUS = 7;

/** Number of animation frames in one full chomp cycle. */
const CHOMP_CYCLE_FRAMES = 12;

/** Maximum mouth opening angle in radians (one side). */
const MAX_MOUTH_ANGLE = Math.PI / 4; // 45 degrees

/**
 * RendererService (MOD-RENDERER)
 *
 * Draws the maze, Pac-Man (with chomp animation and directional facing),
 * and provides extension points for ghosts, fruit, and HUD overlays.
 *
 * All drawing uses standard Canvas 2D API calls for cross-browser
 * compatibility (Chrome, Firefox, Safari, Edge).
 */
@Injectable({ providedIn: 'root' })
export class RendererService {
  private ctx: CanvasRenderingContext2D | null = null;
  private canvasWidth = 0;
  private canvasHeight = 0;

  /** Pixels per tile, exposed for coordinate conversion by other services. */
  readonly tileSize: number = TILE_SIZE;

  constructor(private settingsStorage: SettingsStorageService) {}

  /**
   * Bind the renderer to a canvas element.
   * Call this once when the gameplay component initialises its canvas.
   */
  setCanvas(canvas: HTMLCanvasElement): void {
    this.ctx = canvas.getContext('2d');
    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;
  }

  /** Clear the entire canvas to black. */
  clear(): void {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
  }

  // ─── Maze Rendering ───────────────────────────────────────────────

  /**
   * Draw the full maze from the tile layout.
   * Iterates every tile and delegates to the appropriate tile-draw helper.
   */
  drawMaze(layout: ReadonlyArray<ReadonlyArray<Tile>>): void {
    if (!this.ctx) return;
    const ctx = this.ctx;

    for (let row = 0; row < layout.length; row++) {
      const rowData = layout[row];
      for (let col = 0; col < rowData.length; col++) {
        const tile = rowData[col];
        const x = col * TILE_SIZE;
        const y = row * TILE_SIZE;

        switch (tile) {
          case 'wall':
            this.drawWallTile(ctx, x, y, layout, row, col);
            break;
          case 'dot':
            this.drawDot(ctx, x, y);
            break;
          case 'pellet':
            this.drawPellet(ctx, x, y);
            break;
          case 'ghost-door':
            this.drawGhostDoor(ctx, x, y);
            break;
          case 'ghost-house':
          case 'tunnel':
          case 'empty':
            // These are all rendered as background (black)
            this.drawEmptyTile(ctx, x, y);
            break;
        }
      }
    }
  }

  // ─── Pac-Man Rendering ────────────────────────────────────────────

  /**
   * Draw Pac-Man with chomp animation and directional facing.
   *
   * @param pacman  The PacMan entity with position and direction.
   * @param frameCount  Global animation frame counter for chomp timing.
   */
  drawPacman(pacman: PacMan, frameCount: number): void {
    if (!this.ctx) return;
    const ctx = this.ctx;

    const centerX = pacman.x * TILE_SIZE + TILE_SIZE / 2;
    const centerY = pacman.y * TILE_SIZE + TILE_SIZE / 2;

    // Determine mouth angle based on animation frame
    const mouthAngle = this.computeMouthAngle(pacman, frameCount);

    // Determine rotation based on direction
    const rotation = this.directionToRotation(pacman.direction);

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(rotation);

    // Draw Pac-Man as a filled arc with a mouth wedge cut out
    ctx.fillStyle = COLORS.pacman;
    ctx.beginPath();
    ctx.arc(0, 0, PACMAN_RADIUS, mouthAngle, 2 * Math.PI - mouthAngle);
    ctx.lineTo(0, 0);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }

  /**
   * Draw a ghost with its color based on the ghost name and colorblind setting.
   * Draws a simple rounded-rectangle ghost shape.
   *
   * @param ghost  The Ghost entity with position and name.
   */
  drawGhost(ghost: Ghost): void {
    if (!this.ctx) return;
    const ctx = this.ctx;

    const x = ghost.x * TILE_SIZE;
    const y = ghost.y * TILE_SIZE;
    const radius = 4;

    // Get the color based on ghost name and colorblind mode
    const color = this.getGhostColor(ghost.name);
    ctx.fillStyle = color;

    // Draw a rounded-rectangle ghost shape
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + TILE_SIZE - radius, y);
    ctx.quadraticCurveTo(x + TILE_SIZE, y, x + TILE_SIZE, y + radius);
    ctx.lineTo(x + TILE_SIZE, y + TILE_SIZE - radius);
    ctx.quadraticCurveTo(x + TILE_SIZE, y + TILE_SIZE, x + TILE_SIZE - radius, y + TILE_SIZE);
    ctx.lineTo(x + radius, y + TILE_SIZE);
    ctx.quadraticCurveTo(x, y + TILE_SIZE, x, y + TILE_SIZE - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.fill();

    // Draw eyes (simple white circles)
    ctx.fillStyle = '#ffffff';
    const eyeRadius = 2;
    const eyeOffsetX = 4;
    const eyeOffsetY = 5;
    ctx.beginPath();
    ctx.arc(x + eyeOffsetX, y + eyeOffsetY, eyeRadius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x + TILE_SIZE - eyeOffsetX, y + eyeOffsetY, eyeRadius, 0, 2 * Math.PI);
    ctx.fill();
  }

  // ─── Private Helpers ──────────────────────────────────────────────

  /**
   * Draw a wall tile with rounded-edge styling.
   * Uses neighbor awareness to draw connecting wall segments.
   */
  private drawWallTile(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    layout: ReadonlyArray<ReadonlyArray<Tile>>,
    row: number,
    col: number,
  ): void {
    ctx.fillStyle = COLORS.wall;
    ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);

    // Draw a slightly inset border for wall definition
    ctx.strokeStyle = COLORS.wallStroke;
    ctx.lineWidth = 1;

    const isWall = (r: number, c: number): boolean => {
      if (r < 0 || r >= layout.length) return false;
      if (c < 0 || c >= layout[0].length) return false;
      return layout[r][c] === 'wall';
    };

    // Draw inner edges where wall meets non-wall
    const inset = 2;
    if (!isWall(row - 1, col)) {
      ctx.beginPath();
      ctx.moveTo(x + inset, y + inset);
      ctx.lineTo(x + TILE_SIZE - inset, y + inset);
      ctx.stroke();
    }
    if (!isWall(row + 1, col)) {
      ctx.beginPath();
      ctx.moveTo(x + inset, y + TILE_SIZE - inset);
      ctx.lineTo(x + TILE_SIZE - inset, y + TILE_SIZE - inset);
      ctx.stroke();
    }
    if (!isWall(row, col - 1)) {
      ctx.beginPath();
      ctx.moveTo(x + inset, y + inset);
      ctx.lineTo(x + inset, y + TILE_SIZE - inset);
      ctx.stroke();
    }
    if (!isWall(row, col + 1)) {
      ctx.beginPath();
      ctx.moveTo(x + TILE_SIZE - inset, y + inset);
      ctx.lineTo(x + TILE_SIZE - inset, y + TILE_SIZE - inset);
      ctx.stroke();
    }
  }

  /** Draw a small dot at the center of a tile. */
  private drawDot(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    ctx.fillStyle = COLORS.dot;
    ctx.beginPath();
    ctx.arc(x + TILE_SIZE / 2, y + TILE_SIZE / 2, DOT_RADIUS, 0, 2 * Math.PI);
    ctx.fill();
  }

  /** Draw a larger power pellet at the center of a tile. */
  private drawPellet(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    ctx.fillStyle = COLORS.pellet;
    ctx.beginPath();
    ctx.arc(x + TILE_SIZE / 2, y + TILE_SIZE / 2, PELLET_RADIUS, 0, 2 * Math.PI);
    ctx.fill();
  }

  /** Draw the ghost house door as a colored horizontal bar. */
  private drawGhostDoor(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    // Background first
    ctx.fillStyle = COLORS.background;
    ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
    // Door bar in the middle
    ctx.fillStyle = COLORS.ghostDoor;
    ctx.fillRect(x, y + TILE_SIZE / 2 - 2, TILE_SIZE, 4);
  }

  /** Draw an empty/corridor/tunnel/ghost-house tile as background. */
  private drawEmptyTile(ctx: CanvasRenderingContext2D, x: number, y: number): void {
    ctx.fillStyle = COLORS.background;
    ctx.fillRect(x, y, TILE_SIZE, TILE_SIZE);
  }

  /**
   * Compute the mouth opening angle for the chomp animation.
   * Returns 0 (closed) to MAX_MOUTH_ANGLE (fully open).
   * When stationary (direction === 'none'), returns a fixed half-open angle.
   */
  private computeMouthAngle(pacman: PacMan, frameCount: number): number {
    if (pacman.direction === 'none') {
      // Stationary: freeze at a fixed partially-open mouth
      return MAX_MOUTH_ANGLE * 0.5;
    }

    // Cycle through open/close using a triangle wave
    const phase = frameCount % CHOMP_CYCLE_FRAMES;
    const halfCycle = CHOMP_CYCLE_FRAMES / 2;
    const t = phase < halfCycle
      ? phase / halfCycle
      : 1 - (phase - halfCycle) / halfCycle;

    return MAX_MOUTH_ANGLE * t;
  }

  /**
   * Convert a Direction to a rotation angle in radians.
   * Right = 0, Down = π/2, Left = π, Up = -π/2.
   */
  private directionToRotation(direction: PacMan['direction']): number {
    switch (direction) {
      case 'right': return 0;
      case 'down':  return Math.PI / 2;
      case 'left':  return Math.PI;
      case 'up':    return -Math.PI / 2;
      case 'none':  return 0; // Default facing right when stationary
    }
  }

  /**
   * Get the color for a ghost based on its name and the current colorblind setting.
   * Returns the appropriate color from either the standard or colorblind palette.
   * Uses the cached colorblind mode value for performance.
   */
  getGhostColor(ghostName: 'blinky' | 'pinky' | 'inky' | 'clyde'): string {
    const isColorblindMode = this.settingsStorage.getColorblindMode();
    const palette = isColorblindMode ? GHOST_COLORS_COLORBLIND : GHOST_COLORS_STANDARD;
    return palette[ghostName];
  }
}
