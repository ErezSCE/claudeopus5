// [STUB]
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GameScreen } from '../../shared/types';

/**
 * Central game state service (MOD-GAME-STATE).
 * Scaffold stub: manages game state machine and exposes observables for UI.
 */
@Injectable({ providedIn: 'root' })
export class GameStateService {
  private screenSubject = new BehaviorSubject<GameScreen>('start');
  private scoreSubject = new BehaviorSubject<number>(0);
  private livesSubject = new BehaviorSubject<number>(3);
  private levelSubject = new BehaviorSubject<number>(1);

  screen$: Observable<GameScreen> = this.screenSubject.asObservable();
  score$: Observable<number> = this.scoreSubject.asObservable();
  lives$: Observable<number> = this.livesSubject.asObservable();
  level$: Observable<number> = this.levelSubject.asObservable();

  constructor() {}

  setScreen(screen: GameScreen): void {
    this.screenSubject.next(screen);
  }

  setScore(score: number): void {
    this.scoreSubject.next(score);
  }

  setLives(lives: number): void {
    this.livesSubject.next(lives);
  }

  setLevel(level: number): void {
    this.levelSubject.next(level);
  }
}
