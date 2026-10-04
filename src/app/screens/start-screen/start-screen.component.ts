import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { GameStateService } from '../../game/state/game-state.service';
import { SettingsStorageService } from '../../core/storage/settings-storage.service';

/**
 * Start screen component (MOD-START-SCREEN).
 * Displays the main menu with options to start the game.
 * Supports keyboard navigation with visible focus indicators.
 */
@Component({
  selector: 'app-start-screen',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="start-screen">
      <div class="start-screen__container">
        <h1 class="start-screen__title">PAC-MAN</h1>
        
        <div class="start-screen__subtitle">
          <span class="start-screen__subtitle-text">Press Start to Begin</span>
        </div>

        <div class="start-screen__buttons">
          <button 
            class="start-screen__button start-screen__button--start"
            tabindex="0"
            (click)="onStartGame()"
            (keydown.enter)="onStartGame()"
            (keydown.space)="onStartGame()">
            Start Game
          </button>
          <button 
            class="start-screen__button start-screen__button--settings"
            tabindex="1"
            (click)="onSettings()">
            Settings
          </button>
          <button 
            class="start-screen__button start-screen__button--mute"
            tabindex="2"
            (click)="onToggleMute()">
            {{ isMuted ? 'Unmute' : 'Mute' }}
          </button>
          <button 
            class="start-screen__button start-screen__button--colorblind"
            tabindex="3"
            (click)="onToggleColorblind()">
            {{ isColorblind ? 'Normal Colors' : 'Colorblind Mode' }}
          </button>
        </div>

        <div class="start-screen__instructions">
          <p class="start-screen__instruction-text">
            Use Arrow Keys or WASD to move
          </p>
          <p class="start-screen__instruction-text">
            Press P to pause
          </p>
          <p class="start-screen__instruction-text">
            Eat all dots to complete the level
          </p>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .start-screen {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #2e1a2e 0%, #1a162e 100%);
        color: #fff;
        font-family: 'Arial', sans-serif;
      }

      .start-screen__container {
        text-align: center;
        padding: 2rem;
        max-width: 600px;
      }

      .start-screen__title {
        font-size: 4rem;
        margin: 0 0 1.5rem 0;
        color: #ff00ff;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        letter-spacing: 3px;
        animation: pulse 1.5s ease-in-out infinite;
      }

      @keyframes pulse {
        0%, 100% {
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        }
        50% {
          text-shadow: 0 0 20px rgba(255, 0, 255, 0.8);
        }
      }

      .start-screen__subtitle {
        margin: 2rem 0;
      }

      .start-screen__subtitle-text {
        font-size: 1.5rem;
        color: #ffff00;
        font-weight: bold;
        letter-spacing: 1px;
      }

      .start-screen__buttons {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin: 2rem 0;
      }

      .start-screen__button {
        padding: 1rem 2rem;
        font-size: 1.2rem;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.2s ease;
        font-weight: bold;
        text-transform: uppercase;
        letter-spacing: 1px;
      }

      .start-screen__button--primary {
        background: #00ff00;
        color: #000;
      }

      .start-screen__button--primary:hover {
        background: #00ff00;
        transform: scale(1.05);
        box-shadow: 0 4px 12px rgba(0, 255, 0, 0.4);
      }

      .start-screen__button:focus-visible {
        outline: 3px solid #ffff00;
        outline-offset: 2px;
      }

      .start-screen__instructions {
        margin-top: 3rem;
        background: rgba(0, 0, 0, 0.3);
        padding: 1.5rem;
        border-radius: 8px;
      }

      .start-screen__instruction-text {
        margin: 0.5rem 0;
        font-size: 0.95rem;
        color: #00ff00;
        letter-spacing: 0.5px;
      }

      @media (max-width: 600px) {
        .start-screen__title {
          font-size: 2.5rem;
        }

        .start-screen__subtitle-text {
          font-size: 1.1rem;
        }

        .start-screen__button {
          padding: 0.8rem 1.5rem;
          font-size: 1rem;
        }

        .start-screen__instruction-text {
          font-size: 0.85rem;
        }
      }
    `,
  ],
})
export class StartScreenComponent implements OnInit {
  isMuted = false;
  isColorblind = false;

  constructor(
    private gameState: GameStateService,
    private settingsStorage: SettingsStorageService
  ) {}

  ngOnInit(): void {
    this.isMuted = this.settingsStorage.getMutePreference();
    this.isColorblind = this.settingsStorage.getColorblindMode();
  }

  onStartGame(): void {
    this.gameState.startGame();
  }

  onSettings(): void {
    // Settings action
  }

  onToggleMute(): void {
    this.settingsStorage.toggleMute();
    this.isMuted = this.settingsStorage.getMutePreference();
  }

  onToggleColorblind(): void {
    this.settingsStorage.toggleColorblindMode();
    this.isColorblind = this.settingsStorage.getColorblindMode();
  }
}
