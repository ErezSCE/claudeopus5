/**
 * Shared domain types (MOD-SHARED-TYPES). FROZEN after scaffold.
 * Every module imports cross-cutting types from here — never redeclare them locally.
 */

/** Movement direction. 'none' means stationary / no queued input. */
export type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

/** A single maze tile kind. */
export type Tile =
  | 'wall'
  | 'empty'
  | 'dot'
  | 'pellet'
  | 'tunnel'
  | 'ghost-house'
  | 'ghost-door';

/** The four ghosts, each with a distinct targeting algorithm. */
export type GhostName = 'blinky' | 'pinky' | 'inky' | 'clyde';

/**
 * Per-ghost lifecycle state.
 * - in-house: waiting inside the ghost house
 * - leaving: exiting the ghost house through the door
 * - active: chasing / scattering per the global Mode
 * - scared: frightened after a power pellet (can be eaten)
 * - eaten: eyes only, returning to the ghost house
 */
export type GhostState = 'in-house' | 'leaving' | 'active' | 'scared' | 'eaten';

/** Global ghost behaviour mode driven by the scatter/chase timer. */
export type Mode = 'scatter' | 'chase' | 'frightened';

/** Screen currently displayed by the app shell. */
export type GameScreen =
  | 'start'
  | 'countdown'
  | 'playing'
  | 'paused'
  | 'level-complete'
  | 'game-over'
  | 'high-score-entry';

/** One row of the persisted top-10 high-score table. */
export type HighScoreEntry = {
  /** Exactly three uppercase letters. */
  initials: string;
  score: number;
  /** ISO-8601 timestamp of when the score was recorded. */
  createdAt: string;
};

/** Bonus fruit kind and its point value. */
export type Fruit = {
  name: 'cherry' | 'strawberry' | 'orange' | 'apple' | 'melon' | 'galaxian' | 'bell' | 'key';
  points: number;
};

/** Outcome of Pac-Man touching a ghost. */
export type GhostCollisionResult = 'none' | 'pacman-dies' | 'ghost-eaten';
