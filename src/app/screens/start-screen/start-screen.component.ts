import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameStateService } from '../../game/state/game-state.service';
import { SettingsStorageService } from '../../core/storage/settings-storage.service';
import { ScoreStorageService } from '../../core/storage/score-storage.service';
import { HighScoreEntry } from '../../shared/types';

/**
 * Start screen component (MOD-START-SCREEN).
 * Displays the main menu with options to start the game.
 * Supports keyboard navigation with visible focus indicators.
 * Shows the top-10 high scores and all-time high score loaded from localStorage.
 */
@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [CommonModule],
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
            (click)="onStartGame()">
            Start Game
          </button>
          <button 
            class="start-screen__button start-screen__button--settings"
            (click)="onSettings()">
            Settings
          </button>
          <button 
            class="start-screen__button start-screen__button--mute"
            (click)="onToggleMute()">
            {{ isMuted ? 'Unmute' : 'Mute' }}
          </button>
          <button 
            class="start-screen__button start-screen__button--colorblind"
            (click)="onToggleColorblind()">
            {{ isColorblind ? 'Normal Colors' : 'Colorblind Mode' }}
          </button>
        </div>

        <div class="start-screen__high-scores" *ngIf="highScores.length > 0 || allTimeHigh > 0">
          <h2 class="start-screen__high-scores-title">High Scores</h2>
          <div class="start-screen__all-time-high">
            <span class="start-screen__all-time-label">All-Time High:</span>
            <span class="start-screen__all-time-score">{{ allTimeHigh }}</span>
          </div>
          <div class="start-screen__top-10" *ngIf="highScores.length > 0">
            <div class="start-screen__score-row" *ngFor="let entry of highScores; let i = index">
              <span class="start-screen__score-rank">{{ i + 1 }}.</span>
              <span class="start-screen__score-initials">{{ entry.initials }}</span>
              <span class="start-screen__score-value">{{ entry.score }}</span>
            </div>
          </div>
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

      .start-screen__high-scores {
        margin: 2rem 0;
        padding: 1.5rem;
        background: rgba(0, 0, 0, 0.3);
        border-radius: 0.5rem;
        max-height: 300px;
        overflow-y: auto;
      }

      .start-screen__high-scores-title {
        font-size: 1.3rem;
        margin: 0 0 1rem 0;
        font-weight: bold;
        color: #ffff00;
      }

      .start-screen__all-time-high {
        display: flex;
        justify-content: center;
        gap: 1rem;
        margin-bottom: 1rem;
        font-size: 1.1rem;
        font-weight: bold;
      }

      .start-screen__all-time-label {
        color: #ffff00;
      }

      .start-screen__all-time-score {
        color: #00ff00;
      }

      .start-screen__top-10 {
        text-align: left;
        display: inline-block;
      }

      .start-screen__score-row {
        display: flex;
        gap: 1rem;
        margin: 0.5rem 0;
        font-size: 0.95rem;
        font-family: 'Courier New', monospace;
      }

      .start-screen__score-rank {
        width: 2rem;
        text-align: right;
        color: #ffff00;
      }

      .start-screen__score-initials {
        width: 3rem;
        text-align: center;
        color: #fff;
      }

      .start-screen__score-value {
        flex: 1;
        text-align: right;
        color: #00ff00;
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

        .start-screen__high-scores {
          max-height: 200px;
        }
      }
    `,
  ],
})
export class StartScreenComponent implements OnInit {
  isMuted = false;
  isColorblind = false;
  highScores: HighScoreEntry[] = [];
  allTimeHigh = 0;

  constructor(
    private gameState: GameStateService,
    private settingsStorage: SettingsStorageService,
    private scoreStorage: ScoreStorageService
  ) {}

  ngOnInit(): void {
    this.isMuted = this.settingsStorage.getMutePreference();
    this.isColorblind = this.settingsStorage.getColorblindMode();
    this.loadHighScores();
  }

  private loadHighScores(): void {
    this.highScores = this.scoreStorage.loadHighScores();
    this.allTimeHigh = this.scoreStorage.loadAllTimeHigh();
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
