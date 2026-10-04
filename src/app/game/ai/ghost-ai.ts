// [STUB]
import { PacMan } from '../entities/pacman';
import { Ghost } from '../entities/ghost';

/**
 * Ghost AI module (MOD-GHOST-AI).
 * Scaffold stub: implements ghost targeting algorithms.
 */

export function chooseTarget(ghost: Ghost, pacman: PacMan): { x: number; y: number } {
  throw new Error('not implemented');
}

export function blinkyTarget(pacman: PacMan): { x: number; y: number } {
  throw new Error('not implemented');
}

export function pinkyTarget(pacman: PacMan): { x: number; y: number } {
  throw new Error('not implemented');
}

export function inkyTarget(pacman: PacMan, blinky: Ghost): { x: number; y: number } {
  throw new Error('not implemented');
}

export function clydeTarget(pacman: PacMan, clyde: Ghost): { x: number; y: number } {
  throw new Error('not implemented');
}
