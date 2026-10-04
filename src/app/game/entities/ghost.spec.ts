import { Ghost } from './ghost';

describe('Ghost', () => {
  it('should create with name and default position', () => {
    const ghost = new Ghost('blinky');
    expect(ghost.name).toBe('blinky');
    expect(ghost.x).toBe(0);
    expect(ghost.y).toBe(0);
  });

  it('should create with specified position', () => {
    const ghost = new Ghost('pinky', 5, 10);
    expect(ghost.x).toBe(5);
    expect(ghost.y).toBe(10);
  });
});
