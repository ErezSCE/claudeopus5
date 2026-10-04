import { ChangeDetectionStrategy, Component, Input, OnInit, inject } from '@angular/core';

import { ScoreStorageService } from '../../core/storage/score-storage.service';
import { GameStateService } from '../../game/state/game-state.service';

/**
 * Game-over screen (MOD-GAME-OVER). A qualifying score is handed to
 * GameStateService and routed straight to high-score initials entry.
 */
@Component({
  selector: 'app-game-over',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="game-over" aria-labelledby="game-over-title">
      <h2 id="game-over-title" class="game-over__title">Game Over</h2>
      <p class="game-over__score">Score: {{ score }}</p>
      <button type="button" class="game-over__button game-over__button--restart" (click)="onRestart()">
        Play Again
      </button>
      <button type="button" class="game-over__button game-over__button--menu" (click)="onMainMenu()">
        Main Menu
      </button>
    </section>
  `,
  styles: [
    `
      .game-over { display: flex; flex-direction: column; align-items: center; gap: 1rem; color: #fff; }
      .game-over__title { margin: 0; color: #ff0000; }
      .game-over__button { min-width: 10rem; padding: 0.75rem 1.5rem; font: inherit; color: #000; background: #ffd800; border: 0; border-radius: 4px; cursor: pointer; }
      .game-over__button:focus { outline: none; }
      .game-over__button:focus-visible { outline: 3px solid #00e5ff; outline-offset: 3px; }
    `,
  ],
})
export class GameOverComponent implements OnInit {
  private readonly gameState = inject(GameStateService);
  private readonly scoreStorage = inject(ScoreStorageService);

  @Input() score = 0;

  ngOnInit(): void {
    if (this.scoreStorage.isHighScore(this.score)) {
      this.gameState.setScore(this.score);
      this.gameState.setScreen('high-score-entry');
    }
  }

  onRestart(): void {
    this.gameState.restartGame();
  }

  onMainMenu(): void {
    this.gameState.goToStart();
  }
}
