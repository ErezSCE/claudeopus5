// [STUB]
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

/**
 * Game engine service (MOD-GAME-ENGINE).
 * Scaffold stub: manages fixed-timestep game loop and emits state changes.
 */
@Injectable({ providedIn: 'root' })
export class GameEngineService {
  private tickSubject = new Subject<number>();
  tick$: Observable<number> = this.tickSubject.asObservable();

  constructor() {}

  start(): void {
    throw new Error('not implemented');
  }

  stop(): void {
    throw new Error('not implemented');
  }

  pause(): void {
    throw new Error('not implemented');
  }

  resume(): void {
    throw new Error('not implemented');
  }
}
