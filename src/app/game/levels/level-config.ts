import { Fruit } from '../../shared/types';

/**
 * Per-level difficulty configuration consumed by the game engine,
 * ghost AI, and renderer.
 */
export interface LevelConfig {
  /** Level number (1-based). */
  readonly level: number;
  /** Ghost movement speed as a fraction of base speed (1.0 = 100%). */
  readonly ghostSpeed: number;
  /** Pac-Man movement speed as a fraction of base speed. */
  readonly pacmanSpeed: number;
  /** Duration in milliseconds that ghosts remain scared after a power pellet. */
  readonly scaredDuration: number;
  /** Duration in milliseconds for each scatter phase. */
  readonly scatterDuration: number;
  /** Duration in milliseconds for each chase phase. */
  readonly chaseDuration: number;
  /** Bonus fruit for this level. */
  readonly fruit: Fruit;
  /** Number of dots eaten before the first fruit appears. */
  readonly fruitDotsThreshold1: number;
  /** Number of dots eaten before the second fruit appears. */
  readonly fruitDotsThreshold2: number;
  /** Ghost speed multiplier while in the tunnel. */
  readonly ghostTunnelSpeed: number;
  /** Ghost speed multiplier while scared/frightened. */
  readonly ghostScaredSpeed: number;
  /** Number of Elroy speed-up thresholds (dots remaining). */
  readonly elroyDotsLeft1: number;
  /** Elroy 1 speed multiplier. */
  readonly elroySpeed1: number;
  /** Second Elroy threshold (dots remaining). */
  readonly elroyDotsLeft2: number;
  /** Elroy 2 speed multiplier. */
  readonly elroySpeed2: number;
}

/** Fruit definitions by name. */
const FRUITS: Record<Fruit['name'], Fruit> = {
  cherry: { name: 'cherry', points: 100 },
  strawberry: { name: 'strawberry', points: 300 },
  orange: { name: 'orange', points: 500 },
  apple: { name: 'apple', points: 700 },
  melon: { name: 'melon', points: 1000 },
  galaxian: { name: 'galaxian', points: 2000 },
  bell: { name: 'bell', points: 3000 },
  key: { name: 'key', points: 5000 },
};

/**
 * Static table of per-level configurations for levels 1–20.
 * Difficulty increases progressively: ghost speed rises, scared duration
 * shrinks, scatter phases shorten, and chase phases lengthen.
 * Level 21+ reuses level 20's config (the difficulty cap).
 */
const LEVEL_CONFIGS: readonly LevelConfig[] = [
  // Level 1 — easiest
  {
    level: 1,
    ghostSpeed: 0.75,
    pacmanSpeed: 0.80,
    scaredDuration: 6000,
    scatterDuration: 7000,
    chaseDuration: 20000,
    fruit: FRUITS.cherry,
    fruitDotsThreshold1: 70,
    fruitDotsThreshold2: 170,
    ghostTunnelSpeed: 0.40,
    ghostScaredSpeed: 0.50,
    elroyDotsLeft1: 20,
    elroySpeed1: 0.80,
    elroyDotsLeft2: 10,
    elroySpeed2: 0.85,
  },
  // Level 2
  {
    level: 2,
    ghostSpeed: 0.85,
    pacmanSpeed: 0.90,
    scaredDuration: 5000,
    scatterDuration: 7000,
    chaseDuration: 20000,
    fruit: FRUITS.strawberry,
    fruitDotsThreshold1: 70,
    fruitDotsThreshold2: 170,
    ghostTunnelSpeed: 0.45,
    ghostScaredSpeed: 0.55,
    elroyDotsLeft1: 30,
    elroySpeed1: 0.90,
    elroyDotsLeft2: 15,
    elroySpeed2: 0.95,
  },
  // Level 3
  {
    level: 3,
    ghostSpeed: 0.85,
    pacmanSpeed: 0.90,
    scaredDuration: 4000,
    scatterDuration: 7000,
    chaseDuration: 20000,
    fruit: FRUITS.orange,
    fruitDotsThreshold1: 70,
    fruitDotsThreshold2: 170,
    ghostTunnelSpeed: 0.45,
    ghostScaredSpeed: 0.55,
    elroyDotsLeft1: 40,
    elroySpeed1: 0.90,
    elroyDotsLeft2: 20,
    elroySpeed2: 0.95,
  },
  // Level 4
  {
    level: 4,
    ghostSpeed: 0.85,
    pacmanSpeed: 0.90,
    scaredDuration: 3000,
    scatterDuration: 7000,
    chaseDuration: 20000,
    fruit: FRUITS.orange,
    fruitDotsThreshold1: 70,
    fruitDotsThreshold2: 170,
    ghostTunnelSpeed: 0.45,
    ghostScaredSpeed: 0.55,
    elroyDotsLeft1: 40,
    elroySpeed1: 0.90,
    elroyDotsLeft2: 20,
    elroySpeed2: 0.95,
  },
  // Level 5
  {
    level: 5,
    ghostSpeed: 0.95,
    pacmanSpeed: 1.00,
    scaredDuration: 2000,
    scatterDuration: 5000,
    chaseDuration: 20000,
    fruit: FRUITS.apple,
    fruitDotsThreshold1: 70,
    fruitDotsThreshold2: 170,
    ghostTunnelSpeed: 0.50,
    ghostScaredSpeed: 0.60,
    elroyDotsLeft1: 40,
    elroySpeed1: 1.00,
    elroyDotsLeft2: 20,
    elroySpeed2: 1.05,
  },
  // Level 6
  {
    level: 6,
    ghostSpeed: 0.95,
    pacmanSpeed: 1.00,
    scaredDuration: 5000,
    scatterDuration: 5000,
    chaseDuration: 20000,
    fruit: FRUITS.apple,
    fruitDotsThreshold1: 70,
    fruitDotsThreshold2: 170,
    ghostTunnelSpeed: 0.50,
    ghostScaredSpeed: 0.60,
    elroyDotsLeft1: 50,
    elroySpeed1: 1.00,
    elroyDotsLeft2: 25,
    elroySpeed2: 1.05,
  },
  // Level 7
  {
    level: 7,
    ghostSpeed: 0.95,
    pacmanSpeed: 1.00,
    scaredDuration: 2000,
    scatterDuration: 5000,
    chaseDuration: 20000,
    fruit: FRUITS.melon,
    fruitDotsThreshold1: 70,
    fruitDotsThreshold2: 170,
    ghostTunnelSpeed: 0.50,
    ghostScaredSpeed: 0.60,
    elroyDotsLeft1: 50,
    elroySpeed1: 1.00,
    elroyDotsLeft2: 25,
    elroySpeed2: 1.05,
  },
  // Level 8
  {
    level: 8,
    ghostSpeed: 0.95,
    pacmanSpeed: 1.00,
    scaredDuration: 2000,
    scatterDuration: 5000,
    chaseDuration: 20000,
    fruit: FRUITS.melon,
    fruitDotsThreshold1: 70,
    fruitDotsThreshold2: 170,
    ghostTunnelSpeed: 0.50,
    ghostScaredSpeed: 0.60,
    elroyDotsLeft1: 50,
    elroySpeed1: 1.00,
    elroyDotsLeft2: 25,
    elroySpeed2: 1.05,
  },
  // Level 9
  {
    level: 9,
    ghostSpeed: 0.95,
    pacmanSpeed: 1.00,
    scaredDuration: 1000,
    scatterDuration: 5000,
    chaseDuration: 20000,
    fruit: FRUITS.galaxian,
    fruitDotsThreshold1: 70,
    fruitDotsThreshold2: 170,
    ghostTunnelSpeed: 0.50,
    ghostScaredSpeed: 0.60,
    elroyDotsLeft1: 60,
    elroySpeed1: 1.00,
    elroyDotsLeft2: 30,
    elroySpeed2: 1.05,
  },
  // Level 10
  {
    level: 10,
    ghostSpeed: 0.95,
    pacmanSpeed: 1.00,
    scaredDuration: 5000,
    scatterDuration: 5000,
    chaseDuration: 20000,
    fruit: FRUITS.galaxian,
    fruitDotsThreshold1: 70,
    fruitDotsThreshold2: 170,
    ghostTunnelSpeed: 0.50,
    ghostScaredSpeed: 0.60,
    elroyDotsLeft1: 60,
    elroySpeed1: 1.00,
    elroyDotsLeft2: 30,
    elroySpeed2: 1.05,
  },
  // Level 11
  {
    level: 11,
    ghostSpeed: 0.95,
    pacmanSpeed: 1.00,
    scaredDuration: 2000,
    scatterDuration: 5000,
    chaseDuration: 20000,
    fruit: FRUITS.bell,
    fruitDotsThreshold1: 70,
    fruitDotsThreshold2: 170,
    ghostTunnelSpeed: 0.50,
    ghostScaredSpeed: 0.60,
    elroyDotsLeft1: 60,
    elroySpeed1: 1.00,
    elroyDotsLeft2: 30,
    elroySpeed2: 1.05,
  },
  // Level 12
  {
    level: 12,
    ghostSpeed: 0.95,
    pacmanSpeed: 1.00,
    scaredDuration: 1000,
    scatterDuration: 5000,
    chaseDuration: 20000,
    fruit: FRUITS.bell,
    fruitDotsThreshold1: 70,
    fruitDotsThreshold2: 170,
    ghostTunnelSpeed: 0.50,
    ghostScaredSpeed: 0.60,
    elroyDotsLeft1: 80,
    elroySpeed1: 1.00,
    elroyDotsLeft2: 40,
    elroySpeed2: 1.05,
  },
  // Level 13
  {
    level: 13,
    ghostSpeed: 0.95,
    pacmanSpeed: 1.00,
    scaredDuration: 1000,
    scatterDuration: 3000,
    chaseDuration: 20000,
    fruit: FRUITS.key,
    fruitDotsThreshold1: 70,
    fruitDotsThreshold2: 170,
    ghostTunnelSpeed: 0.50,
    ghostScaredSpeed: 0.60,
    elroyDotsLeft1: 80,
    elroySpeed1: 1.00,
    elroyDotsLeft2: 40,
    elroySpeed2: 1.05,
  },
  // Level 14
  {
    level: 14,
    ghostSpeed: 0.95,
    pacmanSpeed: 1.00,
    scaredDuration: 3000,
    scatterDuration: 3000,
    chaseDuration: 20000,
    fruit: FRUITS.key,
    fruitDotsThreshold1: 70,
    fruitDotsThreshold2: 170,
    ghostTunnelSpeed: 0.50,
    ghostScaredSpeed: 0.60,
    elroyDotsLeft1: 80,
    elroySpeed1: 1.00,
    elroyDotsLeft2: 40,
    elroySpeed2: 1.05,
  },
  // Level 15
  {
    level: 15,
    ghostSpeed: 0.95,
    pacmanSpeed: 1.00,
    scaredDuration: 1000,
    scatterDuration: 3000,
    chaseDuration: 20000,
    fruit: FRUITS.key,
    fruitDotsThreshold1: 70,
    fruitDotsThreshold2: 170,
    ghostTunnelSpeed: 0.50,
    ghostScaredSpeed: 0.60,
    elroyDotsLeft1: 100,
    elroySpeed1: 1.00,
    elroyDotsLeft2: 50,
    elroySpeed2: 1.05,
  },
  // Level 16
  {
    level: 16,
    ghostSpeed: 0.95,
    pacmanSpeed: 1.00,
    scaredDuration: 1000,
    scatterDuration: 3000,
    chaseDuration: 20000,
    fruit: FRUITS.key,
    fruitDotsThreshold1: 70,
    fruitDotsThreshold2: 170,
    ghostTunnelSpeed: 0.50,
    ghostScaredSpeed: 0.60,
    elroyDotsLeft1: 100,
    elroySpeed1: 1.00,
    elroyDotsLeft2: 50,
    elroySpeed2: 1.05,
  },
  // Level 17
  {
    level: 17,
    ghostSpeed: 0.95,
    pacmanSpeed: 1.00,
    scaredDuration: 0,
    scatterDuration: 3000,
    chaseDuration: 20000,
    fruit: FRUITS.key,
    fruitDotsThreshold1: 70,
    fruitDotsThreshold2: 170,
    ghostTunnelSpeed: 0.50,
    ghostScaredSpeed: 0.60,
    elroyDotsLeft1: 100,
    elroySpeed1: 1.00,
    elroyDotsLeft2: 50,
    elroySpeed2: 1.05,
  },
  // Level 18
  {
    level: 18,
    ghostSpeed: 0.95,
    pacmanSpeed: 1.00,
    scaredDuration: 1000,
    scatterDuration: 3000,
    chaseDuration: 20000,
    fruit: FRUITS.key,
    fruitDotsThreshold1: 70,
    fruitDotsThreshold2: 170,
    ghostTunnelSpeed: 0.50,
    ghostScaredSpeed: 0.60,
    elroyDotsLeft1: 100,
    elroySpeed1: 1.00,
    elroyDotsLeft2: 50,
    elroySpeed2: 1.05,
  },
  // Level 19
  {
    level: 19,
    ghostSpeed: 0.95,
    pacmanSpeed: 1.00,
    scaredDuration: 0,
    scatterDuration: 3000,
    chaseDuration: 20000,
    fruit: FRUITS.key,
    fruitDotsThreshold1: 70,
    fruitDotsThreshold2: 170,
    ghostTunnelSpeed: 0.50,
    ghostScaredSpeed: 0.60,
    elroyDotsLeft1: 120,
    elroySpeed1: 1.00,
    elroyDotsLeft2: 60,
    elroySpeed2: 1.05,
  },
  // Level 20 — hardest (cap)
  {
    level: 20,
    ghostSpeed: 0.95,
    pacmanSpeed: 1.00,
    scaredDuration: 0,
    scatterDuration: 3000,
    chaseDuration: 20000,
    fruit: FRUITS.key,
    fruitDotsThreshold1: 70,
    fruitDotsThreshold2: 170,
    ghostTunnelSpeed: 0.50,
    ghostScaredSpeed: 0.60,
    elroyDotsLeft1: 120,
    elroySpeed1: 1.00,
    elroyDotsLeft2: 60,
    elroySpeed2: 1.05,
  },
];

/** The hardest config, used for all levels beyond the cap. */
const MAX_LEVEL_CONFIG: LevelConfig = LEVEL_CONFIGS[LEVEL_CONFIGS.length - 1];

/**
 * Return the difficulty configuration for the given level number (1-based).
 * Levels beyond 20 return the level-20 (hardest) configuration with the
 * requested level number.
 */
export function getLevelConfig(level: number): LevelConfig {
  if (level < 1) {
    return { ...LEVEL_CONFIGS[0], level };
  }
  if (level <= LEVEL_CONFIGS.length) {
    return LEVEL_CONFIGS[level - 1];
  }
  // Cap: return the hardest config with the actual level number
  return { ...MAX_LEVEL_CONFIG, level };
}
