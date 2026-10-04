// [STUB]
import { GhostName, GhostState } from '../../shared/types';

/**
 * Ghost entity class (MOD-GHOST).
 * Scaffold stub: represents a ghost's state, position, and behavior mode.
 */
export class Ghost {
  name: GhostName;
  x: number = 0;
  y: number = 0;
  state: GhostState = 'in-house';

  constructor(name: GhostName, x: number = 0, y: number = 0) {
    this.name = name;
    this.x = x;
    this.y = y;
  }

  move(): void {
    throw new Error('not implemented');
  }

  setState(state: GhostState): void {
    this.state = state;
  }
}
