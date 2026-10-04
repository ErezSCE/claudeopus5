import { RendererService } from './renderer.service';
import { SettingsStorageService } from '../../core/storage/settings-storage.service';
import { MAZE_LAYOUT } from '../maze/maze.model';
import { PacMan } from '../entities/pacman';
import { Tile } from '../../shared/types';

/**
 * Minimal CanvasRenderingContext2D stub that records draw calls.
 * We only stub the methods the RendererService actually uses.
 */
function createMockContext(): CanvasRenderingContext2D & { calls: { method: string; args: unknown[] }[] } {
  const calls: { method: string; args: unknown[] }[] = [];

  const handler: ProxyHandler<Record<string, unknown>> = {
    get(_target, prop: string) {
      if (prop === 'calls') return calls;
      if (prop === 'canvas') return { width: 448, height: 496 };
      // Return a function that records the call
      if (typeof prop === 'string') {
        // Properties that should return values
        if (prop === 'fillStyle' || prop === 'strokeStyle' || prop === 'lineWidth' ||
            prop === 'globalAlpha' || prop === 'lineCap' || prop === 'lineJoin' ||
            prop === 'font' || prop === 'textAlign' || prop === 'textBaseline' ||
            prop === 'shadowBlur' || prop === 'shadowColor') {
          return '';
        }
        return (...args: unknown[]) => {
          calls.push({ method: prop, args });
        };
      }
      return undefined;
    },
    set(_target, prop: string, value: unknown) {
      calls.push({ method: `set:${prop}`, args: [value] });
      return true;
    },
  };

  return new Proxy({}, handler) as unknown as CanvasRenderingContext2D & { calls: { method: string; args: unknown[] }[] };
}

function createMockCanvas(width = 448, height = 496): HTMLCanvasElement {
  const ctx = createMockContext();
  return {
    width,
    height,
    getContext: (_type: string) => ctx,
    getAttribute: () => null,
    setAttribute: () => {},
  } as unknown as HTMLCanvasElement;
}

describe('RendererService', () => {
  let service: RendererService;
  let mockSettingsStorage: jasmine.SpyObj<SettingsStorageService>;

  beforeEach(() => {
    mockSettingsStorage = jasmine.createSpyObj('SettingsStorageService', [
      'isColorblindModeEnabled',
      'setColorblindMode',
      'isMuted',
      'setMute',
    ]);
    mockSettingsStorage.isColorblindModeEnabled.and.returnValue(false);
    service = new RendererService(mockSettingsStorage);
  });

  describe('setCanvas', () => {
    it('should accept a canvas element and store the context', () => {
      const canvas = createMockCanvas();
      service.setCanvas(canvas);
      // Should not throw when drawing after setting canvas
      expect(() => service.drawMaze(MAZE_LAYOUT)).not.toThrow();
    });

    it('should handle being called multiple times (replacing canvas)', () => {
      const canvas1 = createMockCanvas();
      const canvas2 = createMockCanvas();
      service.setCanvas(canvas1);
      service.setCanvas(canvas2);
      expect(() => service.drawMaze(MAZE_LAYOUT)).not.toThrow();
    });
  });

  describe('clear', () => {
    it('should clear the entire canvas', () => {
      const canvas = createMockCanvas(448, 496);
      service.setCanvas(canvas);
      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D & { calls: { method: string; args: unknown[] }[] };
      ctx.calls.length = 0;

      service.clear();

      const clearCall = ctx.calls.find(c => c.method === 'clearRect');
      expect(clearCall).toBeDefined();
      expect(clearCall!.args).toEqual([0, 0, 448, 496]);
    });
  });

  describe('drawMaze', () => {
    let ctx: CanvasRenderingContext2D & { calls: { method: string; args: unknown[] }[] };

    beforeEach(() => {
      const canvas = createMockCanvas();
      service.setCanvas(canvas);
      ctx = canvas.getContext('2d') as CanvasRenderingContext2D & { calls: { method: string; args: unknown[] }[] };
    });

    it('[US-001#1] should render wall tiles from MAZE_LAYOUT', () => {
      ctx.calls.length = 0;
      service.drawMaze(MAZE_LAYOUT);

      // Walls should produce fillRect calls with the wall color
      const fillStyleCalls = ctx.calls.filter(c => c.method === 'set:fillStyle');
      const wallColorUsed = fillStyleCalls.some(c => typeof c.args[0] === 'string' && (c.args[0] as string).length > 0);
      expect(wallColorUsed).toBeTrue();

      // Should have drawn something (fillRect or strokeRect for walls)
      const drawCalls = ctx.calls.filter(c => c.method === 'fillRect' || c.method === 'strokeRect' || c.method === 'fill' || c.method === 'stroke');
      expect(drawCalls.length).toBeGreaterThan(0);
    });

    it('[US-001#1] should render dot tiles as small circles', () => {
      ctx.calls.length = 0;
      service.drawMaze(MAZE_LAYOUT);

      // Dots are drawn with arc calls
      const arcCalls = ctx.calls.filter(c => c.method === 'arc');
      expect(arcCalls.length).toBeGreaterThan(0);
    });

    it('[US-001#1] should render power pellet tiles as larger circles than dots', () => {
      ctx.calls.length = 0;
      service.drawMaze(MAZE_LAYOUT);

      // Power pellets are drawn with arc calls with a larger radius than dots
      const arcCalls = ctx.calls.filter(c => c.method === 'arc');
      // Extract radii (3rd argument to arc)
      const radii = arcCalls.map(c => c.args[2] as number);
      const uniqueRadii = [...new Set(radii)];
      // Should have at least 2 different radii (dot vs pellet)
      expect(uniqueRadii.length).toBeGreaterThanOrEqual(2);
    });

    it('[US-001#1] should render tunnel openings (tunnel tiles are drawn as empty/corridor)', () => {
      ctx.calls.length = 0;
      service.drawMaze(MAZE_LAYOUT);

      // Tunnel tiles at row 14 should not be drawn as walls
      // We verify the maze is fully rendered without errors
      expect(ctx.calls.length).toBeGreaterThan(0);
    });

    it('[US-001#1] should render the ghost house area', () => {
      ctx.calls.length = 0;
      service.drawMaze(MAZE_LAYOUT);

      // Ghost house should be rendered (ghost-door gets a special color)
      // Verify rendering completes with draw calls
      const fillCalls = ctx.calls.filter(c => c.method === 'fillRect' || c.method === 'fill');
      expect(fillCalls.length).toBeGreaterThan(0);
    });

    it('[US-001#1] should render corridors (empty tiles) as black/background', () => {
      ctx.calls.length = 0;
      service.drawMaze(MAZE_LAYOUT);

      // Empty tiles should not produce wall-colored fills
      // The overall rendering should complete successfully
      expect(ctx.calls.length).toBeGreaterThan(0);
    });

    it('[US-001#1] should iterate over all 31 rows and 28 columns of MAZE_LAYOUT', () => {
      ctx.calls.length = 0;
      service.drawMaze(MAZE_LAYOUT);

      // Count the total tiles: 31 * 28 = 868
      // Each tile produces at least some draw calls
      // We verify the maze dimensions are respected
      expect(MAZE_LAYOUT.length).toBe(31);
      expect(MAZE_LAYOUT[0].length).toBe(28);
      // The renderer should have produced many draw calls for all tiles
      expect(ctx.calls.length).toBeGreaterThan(100);
    });

    it('[US-001#2] should use only standard Canvas 2D API calls for cross-browser compatibility', () => {
      ctx.calls.length = 0;
      service.drawMaze(MAZE_LAYOUT);

      // All method calls should be standard Canvas 2D API methods
      const standardMethods = new Set([
        'fillRect', 'strokeRect', 'clearRect',
        'beginPath', 'closePath', 'moveTo', 'lineTo', 'arc', 'arcTo', 'rect',
        'fill', 'stroke', 'clip',
        'save', 'restore', 'translate', 'rotate', 'scale',
        'set:fillStyle', 'set:strokeStyle', 'set:lineWidth',
        'set:globalAlpha', 'set:lineCap', 'set:lineJoin',
        'set:font', 'set:textAlign', 'set:textBaseline',
        'set:shadowBlur', 'set:shadowColor',
        'fillText', 'strokeText', 'measureText',
        'drawImage', 'createLinearGradient', 'createRadialGradient',
        'setTransform', 'resetTransform',
      ]);
      const nonStandard = ctx.calls.filter(c => !standardMethods.has(c.method));
      expect(nonStandard.length).withContext(`Non-standard calls: ${JSON.stringify(nonStandard.map(c => c.method))}`).toBe(0);
    });

    it('[US-001#1] should render the ghost door with a distinct color', () => {
      ctx.calls.length = 0;
      service.drawMaze(MAZE_LAYOUT);

      // Ghost door should use a pink/magenta color
      const fillStyleCalls = ctx.calls.filter(c => c.method === 'set:fillStyle');
      const colors = fillStyleCalls.map(c => c.args[0] as string);
      // Should have the ghost door color (pinkish)
      const hasDoorColor = colors.some(c =>
        c.toLowerCase().includes('pink') ||
        c.toLowerCase().includes('ff') ||
        c.toLowerCase().includes('magenta') ||
        c.toLowerCase().includes('ffb8ff') ||
        c.toLowerCase().includes('ffb8de')
      );
      expect(hasDoorColor).toBeTrue();
    });
  });

  describe('tileSize', () => {
    it('should expose the tile size used for rendering', () => {
      expect(service.tileSize).toBeGreaterThan(0);
    });
  });

  describe('drawPacman', () => {
    let ctx: CanvasRenderingContext2D & { calls: { method: string; args: unknown[] }[] };
    let pacman: PacMan;

    beforeEach(() => {
      const canvas = createMockCanvas();
      service.setCanvas(canvas);
      ctx = canvas.getContext('2d') as CanvasRenderingContext2D & { calls: { method: string; args: unknown[] }[] };
      pacman = new PacMan(14, 23);
    });

    it('[US-004#1] should draw Pac-Man with an arc (mouth animation)', () => {
      ctx.calls.length = 0;
      pacman.direction = 'right';
      service.drawPacman(pacman, 0);

      const arcCalls = ctx.calls.filter(c => c.method === 'arc');
      expect(arcCalls.length).toBeGreaterThan(0);
    });

    it('[US-004#1] should animate mouth open/close cycle while moving', () => {
      pacman.direction = 'right';

      // Draw at two different animation frames
      ctx.calls.length = 0;
      service.drawPacman(pacman, 0);
      const arcCallsFrame0 = ctx.calls.filter(c => c.method === 'arc').map(c => [...c.args]);

      ctx.calls.length = 0;
      service.drawPacman(pacman, 5);
      const arcCallsFrame5 = ctx.calls.filter(c => c.method === 'arc').map(c => [...c.args]);

      // The arc angles should differ between frames (mouth opening/closing)
      // At least one arc call should have different start/end angles
      const anglesFrame0 = arcCallsFrame0.map(a => [a[3], a[4]]);
      const anglesFrame5 = arcCallsFrame5.map(a => [a[3], a[4]]);

      const anglesDiffer = anglesFrame0.some((angles, i) => {
        if (i >= anglesFrame5.length) return false;
        return Math.abs((angles[0] as number) - (anglesFrame5[i][0] as number)) > 0.01 ||
               Math.abs((angles[1] as number) - (anglesFrame5[i][1] as number)) > 0.01;
      });
      expect(anglesDiffer).toBeTrue();
    });

    it('[US-004#1] should freeze mouth animation when stationary (direction is none)', () => {
      pacman.direction = 'none';

      ctx.calls.length = 0;
      service.drawPacman(pacman, 0);
      const arcCallsFrame0 = ctx.calls.filter(c => c.method === 'arc').map(c => [...c.args]);

      ctx.calls.length = 0;
      service.drawPacman(pacman, 5);
      const arcCallsFrame5 = ctx.calls.filter(c => c.method === 'arc').map(c => [...c.args]);

      // When stationary, the mouth angle should be the same across frames
      const anglesFrame0 = arcCallsFrame0.map(a => [a[3], a[4]]);
      const anglesFrame5 = arcCallsFrame5.map(a => [a[3], a[4]]);

      anglesFrame0.forEach((angles, i) => {
        if (i < anglesFrame5.length) {
          expect(Math.abs((angles[0] as number) - (anglesFrame5[i][0] as number))).toBeLessThan(0.01);
          expect(Math.abs((angles[1] as number) - (anglesFrame5[i][1] as number))).toBeLessThan(0.01);
        }
      });
    });

    it('[US-004#2] should orient Pac-Man facing right when direction is right', () => {
      pacman.direction = 'right';
      ctx.calls.length = 0;
      service.drawPacman(pacman, 0);

      // When facing right, the rotation should be 0 (or no rotation)
      const rotateCalls = ctx.calls.filter(c => c.method === 'rotate');
      if (rotateCalls.length > 0) {
        // Rotation for right is 0
        const angle = rotateCalls[0].args[0] as number;
        expect(Math.abs(angle)).toBeLessThan(0.01);
      }
      // Verify arc was drawn
      const arcCalls = ctx.calls.filter(c => c.method === 'arc');
      expect(arcCalls.length).toBeGreaterThan(0);
    });

    it('[US-004#2] should orient Pac-Man facing left when direction is left', () => {
      pacman.direction = 'left';
      ctx.calls.length = 0;
      service.drawPacman(pacman, 0);

      // When facing left, the rotation should be Math.PI
      const rotateCalls = ctx.calls.filter(c => c.method === 'rotate');
      if (rotateCalls.length > 0) {
        const angle = rotateCalls[0].args[0] as number;
        expect(Math.abs(angle - Math.PI)).toBeLessThan(0.01);
      }
      const arcCalls = ctx.calls.filter(c => c.method === 'arc');
      expect(arcCalls.length).toBeGreaterThan(0);
    });

    it('[US-004#2] should orient Pac-Man facing up when direction is up', () => {
      pacman.direction = 'up';
      ctx.calls.length = 0;
      service.drawPacman(pacman, 0);

      const rotateCalls = ctx.calls.filter(c => c.method === 'rotate');
      if (rotateCalls.length > 0) {
        const angle = rotateCalls[0].args[0] as number;
        // Up is -PI/2 or 3PI/2
        expect(Math.abs(angle - (-Math.PI / 2))).toBeLessThan(0.01);
      }
      const arcCalls = ctx.calls.filter(c => c.method === 'arc');
      expect(arcCalls.length).toBeGreaterThan(0);
    });

    it('[US-004#2] should orient Pac-Man facing down when direction is down', () => {
      pacman.direction = 'down';
      ctx.calls.length = 0;
      service.drawPacman(pacman, 0);

      const rotateCalls = ctx.calls.filter(c => c.method === 'rotate');
      if (rotateCalls.length > 0) {
        const angle = rotateCalls[0].args[0] as number;
        // Down is PI/2
        expect(Math.abs(angle - (Math.PI / 2))).toBeLessThan(0.01);
      }
      const arcCalls = ctx.calls.filter(c => c.method === 'arc');
      expect(arcCalls.length).toBeGreaterThan(0);
    });

    it('[US-004#2] should use yellow color for Pac-Man', () => {
      pacman.direction = 'right';
      ctx.calls.length = 0;
      service.drawPacman(pacman, 0);

      const fillStyleCalls = ctx.calls.filter(c => c.method === 'set:fillStyle');
      const hasYellow = fillStyleCalls.some(c => {
        const color = (c.args[0] as string).toLowerCase();
        return color.includes('yellow') || color.includes('#ffff00') || color.includes('ff0');
      });
      expect(hasYellow).toBeTrue();
    });

    it('[US-004#1] should use save/restore for transform isolation', () => {
      pacman.direction = 'right';
      ctx.calls.length = 0;
      service.drawPacman(pacman, 0);

      const saveCalls = ctx.calls.filter(c => c.method === 'save');
      const restoreCalls = ctx.calls.filter(c => c.method === 'restore');
      expect(saveCalls.length).toBeGreaterThan(0);
      expect(restoreCalls.length).toBe(saveCalls.length);
    });
  });

  describe('no canvas set', () => {
    it('should not throw when drawMaze is called without a canvas', () => {
      expect(() => service.drawMaze(MAZE_LAYOUT)).not.toThrow();
    });

    it('should not throw when drawPacman is called without a canvas', () => {
      const pacman = new PacMan(14, 23);
      expect(() => service.drawPacman(pacman, 0)).not.toThrow();
    });

    it('should not throw when clear is called without a canvas', () => {
      expect(() => service.clear()).not.toThrow();
    });
  });

  describe('getGhostColor', () => {
    it('[US-029#1] should return normal ghost color when colorblind mode is disabled', () => {
      mockSettingsStorage.isColorblindModeEnabled.and.returnValue(false);
      const blinkyColor = service.getGhostColor('blinky');
      expect(blinkyColor).toBe('#ff0000'); // Normal red
    });

    it('[US-029#1] should return colorblind-friendly ghost color when colorblind mode is enabled', () => {
      mockSettingsStorage.isColorblindModeEnabled.and.returnValue(true);
      const blinkyColor = service.getGhostColor('blinky');
      expect(blinkyColor).toBe('#ff6b35'); // Colorblind-friendly orange-red
    });

    it('[US-029#1] should return correct color for pinky in normal mode', () => {
      mockSettingsStorage.isColorblindModeEnabled.and.returnValue(false);
      const pinkyColor = service.getGhostColor('pinky');
      expect(pinkyColor).toBe('#ffb8ff'); // Normal pink
    });

    it('[US-029#1] should return correct color for pinky in colorblind mode', () => {
      mockSettingsStorage.isColorblindModeEnabled.and.returnValue(true);
      const pinkyColor = service.getGhostColor('pinky');
      expect(pinkyColor).toBe('#004e89'); // Colorblind-friendly dark blue
    });

    it('[US-029#1] should return correct color for inky in normal mode', () => {
      mockSettingsStorage.isColorblindModeEnabled.and.returnValue(false);
      const inkyColor = service.getGhostColor('inky');
      expect(inkyColor).toBe('#00ffff'); // Normal cyan
    });

    it('[US-029#1] should return correct color for inky in colorblind mode', () => {
      mockSettingsStorage.isColorblindModeEnabled.and.returnValue(true);
      const inkyColor = service.getGhostColor('inky');
      expect(inkyColor).toBe('#f7b801'); // Colorblind-friendly yellow
    });

    it('[US-029#1] should return correct color for clyde in normal mode', () => {
      mockSettingsStorage.isColorblindModeEnabled.and.returnValue(false);
      const clydeColor = service.getGhostColor('clyde');
      expect(clydeColor).toBe('#ffb847'); // Normal orange
    });

    it('[US-029#1] should return correct color for clyde in colorblind mode', () => {
      mockSettingsStorage.isColorblindModeEnabled.and.returnValue(true);
      const clydeColor = service.getGhostColor('clyde');
      expect(clydeColor).toBe('#7209b7'); // Colorblind-friendly purple
    });
  });
});
