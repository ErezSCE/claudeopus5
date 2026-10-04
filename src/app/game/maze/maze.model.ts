import { Tile } from '../../shared/types';

/**
 * Maze interface describing the tile grid and its dimensions.
 */
export interface Maze {
  readonly width: number;
  readonly height: number;
  readonly layout: ReadonlyArray<ReadonlyArray<Tile>>;
}

/**
 * Tile legend for the compact layout definition:
 *   W = wall
 *   . = dot
 *   o = power pellet
 *   E = empty (corridor, no dot)
 *   T = tunnel
 *   H = ghost-house
 *   D = ghost-door
 */
const TILE_MAP: Record<string, Tile> = {
  W: 'wall',
  '.': 'dot',
  o: 'pellet',
  E: 'empty',
  T: 'tunnel',
  H: 'ghost-house',
  D: 'ghost-door',
};

/**
 * Compact string representation of the classic 28×31 Pac-Man maze.
 * Each character maps to a Tile via TILE_MAP.
 * Every row MUST be exactly 28 characters wide.
 *
 * The maze is symmetric left-right. Key features:
 * - Tunnel openings at row 14, columns 0-1 and 26-27
 * - Ghost house at rows 13-15, columns 10-17
 * - Ghost door at row 12, columns 13-14
 * - Four power pellets at (3,1), (3,26), (23,1), (23,26)
 */
const COMPACT_LAYOUT: readonly string[] = [
  'WWWWWWWWWWWWWWWWWWWWWWWWWWWW', // Row  0: top border
  'W............WW............W', // Row  1
  'W.WWWW.WWWWW.WW.WWWWW.WWWW.W', // Row  2
  'WoWWWW.WWWWW.WW.WWWWW.WWWWoW', // Row  3: power pellets
  'W.WWWW.WWWWW.WW.WWWWW.WWWW.W', // Row  4
  'W..........................W', // Row  5
  'W.WWWW.WW.WWWWWWWW.WW.WWWW.W', // Row  6
  'W.WWWW.WW.WWWWWWWW.WW.WWWW.W', // Row  7
  'W......WW....WW....WW......W', // Row  8
  'WWWWWW.WWWWWEWWEWWWWW.WWWWWW', // Row  9
  'EEEEWW.WWWWWEWWEWWWWW.WWEEEE', // Row 10
  'EEEEWW.WWEEEEEEEEEEWW.WWEEEE', // Row 11
  'EEEEWW.WWEWWWDDWWWEWW.WWEEEE', // Row 12: ghost door
  'WWWWWW.WWEWHHHHHHWEWW.WWWWWW', // Row 13: ghost house
  'TTEEEE.EEEWHHHHHHWEEE.EEEETT', // Row 14: tunnel + ghost house
  'WWWWWW.WWEWHHHHHHWEWW.WWWWWW', // Row 15: ghost house
  'EEEEWW.WWEWWWWWWWWEWW.WWEEEE', // Row 16
  'EEEEWW.WWEEEEEEEEEEWW.WWEEEE', // Row 17
  'EEEEWW.WWEWWWWWWWWEWW.WWEEEE', // Row 18
  'WWWWWW.WWEWWWWWWWWEWW.WWWWWW', // Row 19
  'W............WW............W', // Row 20
  'W.WWWW.WWWWW.WW.WWWWW.WWWW.W', // Row 21
  'W.WWWW.WWWWW.WW.WWWWW.WWWW.W', // Row 22
  'Wo..WW................WW..oW', // Row 23: power pellets
  'WWWWWW.WW.WWWWWWWW.WW.WWWWWW', // Row 24
  'WWWWWW.WW.WWWWWWWW.WW.WWWWWW', // Row 25
  'W......WW....WW....WW......W', // Row 26
  'W.WWWWWWWWWW.WW.WWWWWWWWWW.W', // Row 27
  'W.WWWWWWWWWW.WW.WWWWWWWWWW.W', // Row 28
  'W..........................W', // Row 29
  'WWWWWWWWWWWWWWWWWWWWWWWWWWWW', // Row 30: bottom border
];

/**
 * Parse the compact string layout into a 2D Tile array.
 * Enforces exactly 28 columns per row.
 */
function parseLayout(compact: readonly string[]): Tile[][] {
  const WIDTH = 28;
  return compact.map((row) => {
    const tiles: Tile[] = [];
    for (let x = 0; x < WIDTH; x++) {
      const ch = x < row.length ? row[x] : 'W';
      tiles.push(TILE_MAP[ch] ?? 'empty');
    }
    return tiles;
  });
}

const parsedLayout: Tile[][] = parseLayout(COMPACT_LAYOUT);

/**
 * The static maze tile grid (28 columns × 31 rows).
 * Exported as the canonical maze layout consumed by the renderer, collision service,
 * and ghost AI pathfinding.
 */
export const MAZE_LAYOUT: ReadonlyArray<ReadonlyArray<Tile>> = parsedLayout;

/**
 * Return the tile at the given (row, col) coordinate.
 * Out-of-bounds coordinates return 'wall' to act as an implicit boundary.
 */
export function getTileAt(row: number, col: number): Tile {
  if (row < 0 || row >= MAZE_LAYOUT.length) {
    return 'wall';
  }
  const rowData = MAZE_LAYOUT[row];
  if (col < 0 || col >= rowData.length) {
    return 'wall';
  }
  return rowData[col];
}

/**
 * Determine whether a tile at (row, col) can be walked on by Pac-Man or ghosts.
 * Walls are not walkable. Ghost-door is only walkable by ghosts (not Pac-Man),
 * but for general pathfinding purposes we treat it as walkable here.
 * Ghost-house interior is walkable (for ghosts inside).
 */
export function isWalkable(row: number, col: number): boolean {
  const tile = getTileAt(row, col);
  return tile !== 'wall';
}
