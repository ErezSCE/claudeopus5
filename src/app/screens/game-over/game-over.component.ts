import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { GameStateService } from '../../game/state/game-state.service';

/**
 * Game over screen component (MOD-GAME-OVER).
 * Displays game over message with final score and options to restart or return to menu.
 * Supports keyboard navigation with visible focus indicators.
 */
@Component({
  selector: 'app-game-over',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="game-over">
      <div class="game-over__container">
        <h1 class="game-over__title">GAME OVER</h1>
        
        <div class="game-over__score">
          <span class="score-label">Final Score:</span>
          <span class="score-value">{{ score }}</span>
        </div>

        <div class="game-over__buttons">
          <button 
            class="game-over__button game-over__button--primary"
            tabindex="0"
            (click)="onRestart()"
            (keydown.enter)="onRestart()"
            (keydown.space)="onRestart()">
            Play Again
          </button>
          
          <button 
            class="game-over__button game-over__button--secondary"
            tabindex="1"
            (click)="onMainMenu()"
            (keydown.enter)="onMainMenu()"
            (keydown.space)="onMainMenu()">
            Main Menu
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .game-over {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #2e1a2e 0%, #1a162e 100%);
        color: #fff;
        font-family: 'Arial', sans-serif;
      }

      .game-over__container {
        text-align: center;
        padding: 2rem;
        max-width: 500px;
      }

      .game-over__title {
        font-size: 3rem;
        margin: 0 0 2rem 0;
        color: #ff0000;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        letter-spacing: 2px;
      }

      .game-over__score {
        background: rgba(0, 0, 0, 0.3);
        padding: 1.5rem;
        border-radius: 8px;
        margin: 2rem 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 1.3rem;
      }

      .score-label {
        color: #ffff00;
        font-weight: bold;
      }

      .score-value {
        color: #fff;
        font-weight: bold;
      }

      .game-over__buttons {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-top: 2rem;
      }

      .game-over__button {
        padding: 1rem 2rem;
        font-size: 1.1rem;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.2s ease;
        font-weight: bold;
        text-transform: uppercase;
        letter-spacing: 1px;
      }

      .game-over__button--primary {
        background: #00ff00;
        color: #000;
      }

      .game-over__button--primary:hover {
        background: #00ff00;
        transform: scale(1.05);
        box-shadow: 0 4px 12px rgba(0, 255, 0, 0.4);
      }

      .game-over__button--secondary {
        background: #ff00ff;
        color: #fff;
      }

      .game-over__button--secondary:hover {
        background: #ff00ff;
        transform: scale(1.05);
        box-shadow: 0 4px 12px rgba(255, 0, 255, 0.4);
      }

      .game-over__button:focus-visible {
        outline: 3px solid #ffff00;
        outline-offset: 2px;
      }

      @media (max-width: 600px) {
        .game-over__title {
          font-size: 2rem;
        }

        .game-over__button {
          padding: 0.8rem 1.5rem;
          font-size: 1rem;
        }
      }
    `,
  ],
})
export class GameOverComponent {
  @Input() score: number = 0;

  constructor(private gameState: GameStateService) {}

  onRestart(): void {
    this.gameState.setScreen('countdown');
  }

  onMainMenu(): void {
    this.gameState.setScreen('start');
  }
}
