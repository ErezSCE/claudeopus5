// [STUB]
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { GameStateService } from '../../game/state/game-state.service';
import { ScoreStorageService } from '../../core/storage/score-storage.service';

/**
 * Game over screen component (MOD-GAME-OVER).
 * Scaffold stub: displays game over with final score and restart prompt.
 * Integrates with ScoreStorageService to save qualifying scores.
 */
@Component({
  selector: 'app-game-over',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="game-over">Game Over Stub</div>`,
  styles: [
    `
      .game-over {
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
export class GameOverComponent implements OnInit {
  constructor(
    private gameState: GameStateService,
    private scoreStorage: ScoreStorageService
  ) {}

  ngOnInit(): void {
    // Check if the current score qualifies for the high score list
    this.gameState.score$.subscribe((score) => {
      const allTimeHigh = this.scoreStorage.loadAllTimeHigh();
      const highScores = this.scoreStorage.loadHighScores();

      // A score qualifies if it's higher than the all-time high
      // or if there are fewer than 10 scores saved
      if (score > allTimeHigh || highScores.length < 10) {
        // Emit event to show high score entry screen
        // This will be handled by the parent component or routing logic
      }
    });
  }
}
