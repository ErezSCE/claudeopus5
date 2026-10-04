import { chooseTarget, blinkyTarget, pinkyTarget, inkyTarget, clydeTarget } from './ghost-ai';
import { PacMan } from '../entities/pacman';
import { Ghost } from '../entities/ghost';

describe('Ghost AI', () => {
  let pacman: PacMan;
  let blinky: Ghost;

  beforeEach(() => {
    pacman = new PacMan(5, 5);
    blinky = new Ghost('blinky', 0, 0);
  });

  it('should have chooseTarget function', () => {
    expect(typeof chooseTarget).toBe('function');
  });

  it('should have blinkyTarget function', () => {
    expect(typeof blinkyTarget).toBe('function');
  });

  it('should have pinkyTarget function', () => {
    expect(typeof pinkyTarget).toBe('function');
  });

  it('should have inkyTarget function', () => {
    expect(typeof inkyTarget).toBe('function');
  });

  it('should have clydeTarget function', () => {
    expect(typeof clydeTarget).toBe('function');
  });
});
