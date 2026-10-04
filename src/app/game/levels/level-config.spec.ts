import { getLevelConfig, LevelConfig } from './level-config';

describe('LevelConfig', () => {
  // ── Basic structure ──

  it('getLevelConfig returns a valid LevelConfig for level 1', () => {
    const config = getLevelConfig(1);
    expect(config.level).toBe(1);
    expect(config.ghostSpeed).toBeGreaterThan(0);
    expect(config.pacmanSpeed).toBeGreaterThan(0);
    expect(config.scaredDuration).toBeGreaterThanOrEqual(0);
    expect(config.scatterDuration).toBeGreaterThan(0);
    expect(config.chaseDuration).toBeGreaterThan(0);
    expect(config.fruit).toBeDefined();
    expect(config.fruit.name).toBeTruthy();
    expect(config.fruit.points).toBeGreaterThan(0);
  });

  it('getLevelConfig returns configs for all levels 1–20', () => {
    for (let level = 1; level <= 20; level++) {
      const config = getLevelConfig(level);
      expect(config.level).toBe(level);
      expect(config.ghostSpeed).toBeGreaterThan(0);
      expect(config.pacmanSpeed).toBeGreaterThan(0);
    }
  });

  // ── US-017: Difficulty scaling ──

  it('[US-017#1] each level from 1–20 has a valid level number matching the request', () => {
    for (let level = 1; level <= 20; level++) {
      expect(getLevelConfig(level).level).toBe(level);
    }
  });

  it('[US-017#2] ghost speed increases or stays the same from level 1 to level 20', () => {
    let prevSpeed = 0;
    for (let level = 1; level <= 20; level++) {
      const config = getLevelConfig(level);
      expect(config.ghostSpeed).toBeGreaterThanOrEqual(prevSpeed);
      prevSpeed = config.ghostSpeed;
    }
  });

  it('[US-017#2] scared duration generally decreases from level 1 to level 20', () => {
    const level1 = getLevelConfig(1);
    const level20 = getLevelConfig(20);
    expect(level1.scaredDuration).toBeGreaterThan(level20.scaredDuration);
  });

  it('[US-017#2] scatter duration decreases or stays the same from level 1 to level 20', () => {
    const level1 = getLevelConfig(1);
    const level20 = getLevelConfig(20);
    expect(level1.scatterDuration).toBeGreaterThanOrEqual(level20.scatterDuration);
  });

  it('[US-017#2] fruit points generally increase across levels', () => {
    const level1 = getLevelConfig(1);
    const level20 = getLevelConfig(20);
    expect(level20.fruit.points).toBeGreaterThan(level1.fruit.points);
  });

  // ── US-018: Difficulty cap at level 20+ ──

  it('[US-018#1] getLevelConfig returns the same difficulty settings for levels 20, 21, 25, 50, 100', () => {
    const cap = getLevelConfig(20);
    for (const level of [21, 25, 50, 100]) {
      const config = getLevelConfig(level);
      expect(config.ghostSpeed).toBe(cap.ghostSpeed);
      expect(config.pacmanSpeed).toBe(cap.pacmanSpeed);
      expect(config.scaredDuration).toBe(cap.scaredDuration);
      expect(config.scatterDuration).toBe(cap.scatterDuration);
      expect(config.chaseDuration).toBe(cap.chaseDuration);
      expect(config.fruit.name).toBe(cap.fruit.name);
      expect(config.fruit.points).toBe(cap.fruit.points);
      expect(config.ghostTunnelSpeed).toBe(cap.ghostTunnelSpeed);
      expect(config.ghostScaredSpeed).toBe(cap.ghostScaredSpeed);
      expect(config.elroyDotsLeft1).toBe(cap.elroyDotsLeft1);
      expect(config.elroySpeed1).toBe(cap.elroySpeed1);
      expect(config.elroyDotsLeft2).toBe(cap.elroyDotsLeft2);
      expect(config.elroySpeed2).toBe(cap.elroySpeed2);
    }
  });

  it('[US-018#1] levels beyond 20 carry the requested level number', () => {
    expect(getLevelConfig(21).level).toBe(21);
    expect(getLevelConfig(50).level).toBe(50);
    expect(getLevelConfig(100).level).toBe(100);
    expect(getLevelConfig(999).level).toBe(999);
  });

  it('[US-018#2] levels beyond 20 do not produce NaN or undefined in any numeric field', () => {
    for (const level of [21, 50, 100, 1000]) {
      const config = getLevelConfig(level);
      expect(isNaN(config.ghostSpeed)).toBe(false);
      expect(isNaN(config.pacmanSpeed)).toBe(false);
      expect(isNaN(config.scaredDuration)).toBe(false);
      expect(isNaN(config.scatterDuration)).toBe(false);
      expect(isNaN(config.chaseDuration)).toBe(false);
      expect(isNaN(config.ghostTunnelSpeed)).toBe(false);
      expect(isNaN(config.ghostScaredSpeed)).toBe(false);
      expect(isNaN(config.elroyDotsLeft1)).toBe(false);
      expect(isNaN(config.elroySpeed1)).toBe(false);
      expect(isNaN(config.elroyDotsLeft2)).toBe(false);
      expect(isNaN(config.elroySpeed2)).toBe(false);
      expect(config.fruit).toBeDefined();
      expect(config.fruit.name).toBeTruthy();
      expect(config.fruit.points).toBeGreaterThan(0);
    }
  });

  // ── Edge cases ──

  it('handles level 0 gracefully (returns level-1 difficulty)', () => {
    const config = getLevelConfig(0);
    expect(config.ghostSpeed).toBeDefined();
    expect(isNaN(config.ghostSpeed)).toBe(false);
  });

  it('handles negative level gracefully', () => {
    const config = getLevelConfig(-5);
    expect(config.ghostSpeed).toBeDefined();
    expect(isNaN(config.ghostSpeed)).toBe(false);
  });
});
