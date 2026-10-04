import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';

import { ScoreStorageService } from '../../core/storage/score-storage.service';
import { SettingsStorageService } from '../../core/storage/settings-storage.service';
import { GameStateService } from '../../game/state/game-state.service';
import { HighScoreEntry } from '../../shared/types';

/**
 * Start screen (MOD-START-SCREEN): start button, colorblind palette toggle,
 * and the persisted top-10 list / all-time high re-read on every load.
 */
@Component({
  selector: 'app-start-screen',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="start-screen" aria-labelledby="start-title">
      <h1 id="start-title" class="start-screen__title">Pac-Man</h1>
      <p class="start-screen__all-time">
        High Score: <span class="start-screen__all-time-value">{{ allTimeHigh }}</span>
      </p>
      <button type="button" class="start-screen__button start-screen__button--start" (click)="onStartGame()">
        Start Game
      </button>
      <button
        type="button"
        class="start-screen__button start-screen__button--colorblind"
        [attr.aria-pressed]="colorblindMode"
        (click)="onToggleColorblind()"
      >
        Colorblind mode: {{ colorblindMode ? 'On' : 'Off' }}
      </button>
      @if (highScores.length > 0) {
        <ol class="start-screen__scores" aria-label="Top 10 high scores">
          @for (entry of highScores; track $index) {
            <li class="start-screen__score-row">
              <span class="start-screen__initials">{{ entry.initials }}</span>
              <span class="start-screen__score">{{ entry.score }}</span>
            </li>
          }
        </ol>
      } @else {
        <p class="start-screen__no-scores">No high scores yet</p>
      }
    </section>
  `,
  styles: [
    `
      .start-screen { display: flex; flex-direction: column; align-items: center; gap: 1rem; padding: 1rem; color: #fff; }
      .start-screen__title { margin: 0; color: var(--color-accent, #ffd800); }
      .start-screen__button { min-width: 12rem; padding: 0.75rem 1.5rem; font: inherit; color: #000; background: #ffd800; border: 0; border-radius: 4px; cursor: pointer; }
      .start-screen__button:focus { outline: none; }
      .start-screen__button:focus-visible { outline: 3px solid #00e5ff; outline-offset: 3px; }
      .start-screen__scores { margin: 0; padding-left: 2rem; font-family: monospace; }
      .start-screen__score-row { display: flex; justify-content: space-between; gap: 2rem; }
    `,
  ],
})
export class StartScreenComponent implements OnInit {
  private readonly gameState = inject(GameStateService);
  private readonly scoreStorage = inject(ScoreStorageService);
  private readonly settingsStorage = inject(SettingsStorageService);

  highScores: HighScoreEntry[] = [];
  allTimeHigh = 0;
  colorblindMode = false;

  ngOnInit(): void {
    this.highScores = this.scoreStorage.loadHighScores();
    this.allTimeHigh = this.scoreStorage.loadAllTimeHigh();
    this.colorblindMode = this.settingsStorage.isColorblindModeEnabled();
  }

  onStartGame(): void {
    this.gameState.startGame();
  }

  onToggleColorblind(): void {
    this.settingsStorage.toggleColorblindMode();
    this.colorblindMode = this.settingsStorage.isColorblindModeEnabled();
  }
}
