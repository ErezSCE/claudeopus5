import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GameStateService } from '../../game/state/game-state.service';

/**
 * Pause overlay component (MOD-PAUSE-OVERLAY).
 * Displays pause menu with options to resume or restart.
 * Supports keyboard navigation with visible focus indicators.
 */
@Component({
  selector: 'app-pause-overlay',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="pause-overlay">
      <div class="pause-overlay__container">
        <h1 class="pause-overlay__title">PAUSED</h1>
        
        <div class="pause-overlay__buttons">
          <button 
            class="pause-overlay__button pause-overlay__button--primary"
            tabindex="0"
            (click)="onResume()"
            (keydown.enter)="onResume()"
            (keydown.space)="onResume()">
            Resume Game
          </button>
          
          <button 
            class="pause-overlay__button pause-overlay__button--secondary"
            tabindex="1"
            (click)="onRestart()"
            (keydown.enter)="onRestart()"
            (keydown.space)="onRestart()">
            Restart Game
          </button>
          
          <button 
            class="pause-overlay__button pause-overlay__button--secondary"
            tabindex="2"
            (click)="onMainMenu()"
            (keydown.enter)="onMainMenu()"
            (keydown.space)="onMainMenu()">
            Main Menu
          </button>
        </div>

        <div class="pause-overlay__hint">
          <p class="pause-overlay__hint-text">Press P to resume</p>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .pause-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
      }

      .pause-overlay__container {
        text-align: center;
        padding: 2rem;
        max-width: 500px;
        background: linear-gradient(135deg, #2e1a2e 0%, #1a162e 100%);
        border-radius: 8px;
        border: 3px solid #ff00ff;
        color: #fff;
        font-family: 'Arial', sans-serif;
      }

      .pause-overlay__title {
        font-size: 3rem;
        margin: 0 0 2rem 0;
        color: #ff00ff;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        letter-spacing: 2px;
      }

      .pause-overlay__buttons {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin: 2rem 0;
      }

      .pause-overlay__button {
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

      .pause-overlay__button--primary {
        background: #00ff00;
        color: #000;
      }

      .pause-overlay__button--primary:hover {
        background: #00ff00;
        transform: scale(1.05);
        box-shadow: 0 4px 12px rgba(0, 255, 0, 0.4);
      }

      .pause-overlay__button--secondary {
        background: #ff00ff;
        color: #fff;
      }

      .pause-overlay__button--secondary:hover {
        background: #ff00ff;
        transform: scale(1.05);
        box-shadow: 0 4px 12px rgba(255, 0, 255, 0.4);
      }

      .pause-overlay__button:focus-visible {
        outline: 3px solid #ffff00;
        outline-offset: 2px;
      }

      .pause-overlay__hint {
        margin-top: 2rem;
        color: #ffff00;
        font-size: 0.9rem;
      }

      .pause-overlay__hint-text {
        margin: 0;
      }

      @media (max-width: 600px) {
        .pause-overlay__title {
          font-size: 2rem;
        }

        .pause-overlay__button {
          padding: 0.8rem 1.5rem;
          font-size: 1rem;
        }
      }
    `,
  ],
})
export class PauseOverlayComponent {
  constructor(private gameState: GameStateService) {}

  onResume(): void {
    this.gameState.setScreen('playing');
  }

  onRestart(): void {
    this.gameState.setScreen('countdown');
  }

  onMainMenu(): void {
    this.gameState.setScreen('start');
  }
}
