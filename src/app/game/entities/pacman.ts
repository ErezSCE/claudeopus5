// [STUB]
import { Direction } from '../../shared/types';

/**
 * PacMan entity class (MOD-PACMAN).
 * Scaffold stub: represents Pac-Man state and position.
 */
export class PacMan {
  x: number = 0;
  y: number = 0;
  direction: Direction = 'right';
  nextDirection: Direction = 'right';

  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }

  move(): void {
    throw new Error('not implemented');
  }

  setDirection(direction: Direction): void {
    this.nextDirection = direction;
  }
}
