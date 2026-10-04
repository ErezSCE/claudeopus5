import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { GameStateService } from '../../game/state/game-state.service';

/**
 * Level complete screen component (MOD-LEVEL-COMPLETE).
 * Displays level completion message with score and option to continue.
 * Supports keyboard navigation with visible focus indicators.
 */
@Component({
  selector: 'app-level-complete',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="level-complete">
      <div class="level-complete__container">
        <h1 class="level-complete__title">LEVEL COMPLETE!</h1>
        
        <div class="level-complete__score">
          <span class="score-label">Score:</span>
          <span class="score-value">{{ score }}</span>
        </div>

        <div class="level-complete__level">
          <span class="level-label">Next Level:</span>
          <span class="level-value">{{ level + 1 }}</span>
        </div>

        <div class="level-complete__buttons">
          <button 
            class="level-complete__button level-complete__button--primary"
            tabindex="0"
            (click)="onContinue()"
            (keydown.enter)="onContinue()"
            (keydown.space)="onContinue()">
            Continue
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .level-complete {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #2e1a2e 0%, #1a162e 100%);
        color: #fff;
        font-family: 'Arial', sans-serif;
      }

      .level-complete__container {
        text-align: center;
        padding: 2rem;
        max-width: 500px;
      }

      .level-complete__title {
        font-size: 3rem;
        margin: 0 0 2rem 0;
        color: #00ff00;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        letter-spacing: 2px;
        animation: bounce 1s ease-in-out;
      }

      @keyframes bounce {
        0%, 100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-10px);
        }
      }

      .level-complete__score,
      .level-complete__level {
        background: rgba(0, 0, 0, 0.3);
        padding: 1rem;
        border-radius: 8px;
        margin: 1rem 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 1.2rem;
      }

      .score-label,
      .level-label {
        color: #ffff00;
        font-weight: bold;
      }

      .score-value,
      .level-value {
        color: #fff;
        font-weight: bold;
      }

      .level-complete__buttons {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-top: 2rem;
      }

      .level-complete__button {
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

      .level-complete__button--primary {
        background: #00ff00;
        color: #000;
      }

      .level-complete__button--primary:hover {
        background: #00ff00;
        transform: scale(1.05);
        box-shadow: 0 4px 12px rgba(0, 255, 0, 0.4);
      }

      .level-complete__button:focus-visible {
        outline: 3px solid #ffff00;
        outline-offset: 2px;
      }

      @media (max-width: 600px) {
        .level-complete__title {
          font-size: 2rem;
        }

        .level-complete__button {
          padding: 0.8rem 1.5rem;
          font-size: 1rem;
        }
      }
    `,
  ],
})
export class LevelCompleteComponent {
  @Input() score: number = 0;
  @Input() level: number = 1;

  constructor(private gameState: GameStateService) {}

  onContinue(): void {
    this.gameState.setScreen('countdown');
  }
}
