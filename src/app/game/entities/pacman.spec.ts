import { PacMan } from './pacman';

describe('PacMan', () => {
  it('should create with default position', () => {
    const pacman = new PacMan();
    expect(pacman.x).toBe(0);
    expect(pacman.y).toBe(0);
  });

  it('should create with specified position', () => {
    const pacman = new PacMan(5, 10);
    expect(pacman.x).toBe(5);
    expect(pacman.y).toBe(10);
  });
});
