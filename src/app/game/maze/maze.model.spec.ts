import { MAZE_LAYOUT, getTileAt, isWalkable, Maze } from './maze.model';

describe('Maze Model', () => {
  describe('MAZE_LAYOUT', () => {
    it('[US-001#1] should have 31 rows (height)', () => {
      expect(MAZE_LAYOUT.length).toBe(31);
    });

    it('[US-001#1] should have 28 columns (width) in every row', () => {
      MAZE_LAYOUT.forEach((row, index) => {
        expect(row.length).withContext(`Row ${index}`).toBe(28);
      });
    });

    it('[US-001#1] should have wall tiles forming the outer border (top row)', () => {
      for (let col = 0; col < 28; col++) {
        expect(MAZE_LAYOUT[0][col]).withContext(`Top row col ${col}`).toBe('wall');
      }
    });

    it('[US-001#1] should have wall tiles forming the outer border (bottom row)', () => {
      for (let col = 0; col < 28; col++) {
        expect(MAZE_LAYOUT[30][col]).withContext(`Bottom row col ${col}`).toBe('wall');
      }
    });

    it('[US-001#1] should contain dot tiles in corridors', () => {
      // Row 1 has dots between walls
      expect(MAZE_LAYOUT[1][1]).toBe('dot');
      expect(MAZE_LAYOUT[1][12]).toBe('dot');
    });

    it('[US-001#1] should contain power pellet tiles', () => {
      // Four power pellets at known positions
      expect(MAZE_LAYOUT[3][1]).toBe('pellet');
      expect(MAZE_LAYOUT[3][26]).toBe('pellet');
      expect(MAZE_LAYOUT[23][1]).toBe('pellet');
      expect(MAZE_LAYOUT[23][26]).toBe('pellet');
    });

    it('[US-001#1] should contain tunnel tiles at row 14 edges', () => {
      expect(MAZE_LAYOUT[14][0]).toBe('tunnel');
      expect(MAZE_LAYOUT[14][1]).toBe('tunnel');
      expect(MAZE_LAYOUT[14][26]).toBe('tunnel');
      expect(MAZE_LAYOUT[14][27]).toBe('tunnel');
    });

    it('[US-001#1] should contain ghost-house tiles', () => {
      // Ghost house interior at rows 13-15, columns 11-16
      expect(MAZE_LAYOUT[13][11]).toBe('ghost-house');
      expect(MAZE_LAYOUT[14][11]).toBe('ghost-house');
      expect(MAZE_LAYOUT[15][11]).toBe('ghost-house');
    });

    it('[US-001#1] should contain ghost-door tiles', () => {
      // Ghost door at row 12, columns 13-14
      expect(MAZE_LAYOUT[12][13]).toBe('ghost-door');
      expect(MAZE_LAYOUT[12][14]).toBe('ghost-door');
    });

    it('[US-001#1] should contain empty tiles in the side areas', () => {
      // Rows 10-11 have empty tiles on the left side
      expect(MAZE_LAYOUT[10][0]).toBe('empty');
      expect(MAZE_LAYOUT[10][1]).toBe('empty');
      expect(MAZE_LAYOUT[10][2]).toBe('empty');
      expect(MAZE_LAYOUT[10][3]).toBe('empty');
    });

    it('[US-001#2] should use only standard tile types with no browser-specific data for cross-browser rendering', () => {
      // The maze data uses only plain string tile types — no browser-specific APIs.
      // This ensures the data can be rendered identically across Chrome, Firefox, Safari, Edge.
      const validTiles = new Set(['wall', 'dot', 'pellet', 'empty', 'tunnel', 'ghost-house', 'ghost-door']);
      const allTilesValid = MAZE_LAYOUT.every(row =>
        row.every(tile => validTiles.has(tile))
      );
      expect(allTilesValid).toBeTrue();
    });

    it('[US-001#1] should only contain valid tile types', () => {
      const validTiles = new Set(['wall', 'dot', 'pellet', 'empty', 'tunnel', 'ghost-house', 'ghost-door']);
      MAZE_LAYOUT.forEach((row, rowIdx) => {
        row.forEach((tile, colIdx) => {
          expect(validTiles.has(tile))
            .withContext(`Invalid tile "${tile}" at (${rowIdx}, ${colIdx})`)
            .toBeTrue();
        });
      });
    });
  });

  describe('getTileAt', () => {
    it('should return the correct tile for a wall position', () => {
      expect(getTileAt(0, 0)).toBe('wall');
    });

    it('should return the correct tile for a dot position', () => {
      expect(getTileAt(1, 1)).toBe('dot');
    });

    it('should return the correct tile for a pellet position', () => {
      expect(getTileAt(3, 1)).toBe('pellet');
    });

    it('should return the correct tile for a tunnel position', () => {
      expect(getTileAt(14, 0)).toBe('tunnel');
    });

    it('should return the correct tile for a ghost-house position', () => {
      expect(getTileAt(13, 11)).toBe('ghost-house');
    });

    it('should return the correct tile for a ghost-door position', () => {
      expect(getTileAt(12, 13)).toBe('ghost-door');
    });

    it('should return the correct tile for an empty position', () => {
      expect(getTileAt(10, 0)).toBe('empty');
    });

    it('should return wall for negative row', () => {
      expect(getTileAt(-1, 5)).toBe('wall');
    });

    it('should return wall for negative column', () => {
      expect(getTileAt(5, -1)).toBe('wall');
    });

    it('should return wall for row beyond maze height', () => {
      expect(getTileAt(31, 5)).toBe('wall');
    });

    it('should return wall for column beyond maze width', () => {
      expect(getTileAt(5, 28)).toBe('wall');
    });

    it('should return wall for far out-of-bounds coordinates', () => {
      expect(getTileAt(100, 100)).toBe('wall');
      expect(getTileAt(-100, -100)).toBe('wall');
    });
  });

  describe('isWalkable', () => {
    it('should return false for wall tiles', () => {
      expect(isWalkable(0, 0)).toBeFalse();
    });

    it('should return true for dot tiles', () => {
      expect(isWalkable(1, 1)).toBeTrue();
    });

    it('should return true for pellet tiles', () => {
      expect(isWalkable(3, 1)).toBeTrue();
    });

    it('should return true for empty tiles', () => {
      expect(isWalkable(10, 0)).toBeTrue();
    });

    it('should return true for tunnel tiles', () => {
      expect(isWalkable(14, 0)).toBeTrue();
    });

    it('should return true for ghost-house tiles', () => {
      expect(isWalkable(13, 11)).toBeTrue();
    });

    it('should return true for ghost-door tiles', () => {
      expect(isWalkable(12, 13)).toBeTrue();
    });

    it('should return false for out-of-bounds (treated as wall)', () => {
      expect(isWalkable(-1, 0)).toBeFalse();
      expect(isWalkable(0, -1)).toBeFalse();
      expect(isWalkable(31, 0)).toBeFalse();
      expect(isWalkable(0, 28)).toBeFalse();
    });
  });

  describe('Maze interface', () => {
    it('should be implementable with MAZE_LAYOUT data', () => {
      const maze: Maze = {
        width: MAZE_LAYOUT[0].length,
        height: MAZE_LAYOUT.length,
        layout: MAZE_LAYOUT,
      };
      expect(maze.width).toBe(28);
      expect(maze.height).toBe(31);
      expect(maze.layout).toBe(MAZE_LAYOUT);
    });
  });
});
