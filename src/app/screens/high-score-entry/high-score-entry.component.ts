// [STUB]
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GameStateService } from '../../game/state/game-state.service';
import { ScoreStorageService } from '../../core/storage/score-storage.service';
import { HighScoreEntry } from '../../shared/types';

/**
 * High score entry screen component (MOD-HIGH-SCORE-ENTRY).
 * Scaffold stub: prompts player for 3-letter initials to save high score.
 * Integrates with ScoreStorageService to persist the new high score.
 */
@Component({
  selector: 'app-high-score-entry',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="high-score-entry">High Score Entry Stub</div>`,
  styles: [
    `
      .high-score-entry {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        background: #000;
        color: #fff;
      }
    `,
  ],
})
export class HighScoreEntryComponent {
  constructor(
    private gameState: GameStateService,
    private scoreStorage: ScoreStorageService
  ) {}

  /**
   * Save the high score entry with the provided initials.
   * Called when the player confirms their 3-letter initials.
   */
  saveHighScore(initials: string): void {
    this.gameState.score$.subscribe((score) => {
      const entry: HighScoreEntry = {
        initials,
        score,
        createdAt: new Date().toISOString(),
      };
      this.scoreStorage.saveHighScore(entry);
    }).unsubscribe();
  }
}
