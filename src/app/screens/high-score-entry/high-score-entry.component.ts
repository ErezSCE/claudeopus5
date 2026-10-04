import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { GameStateService } from '../../game/state/game-state.service';
import { ScoreStorageService } from '../../core/storage/score-storage.service';

/**
 * High score entry component (MOD-HIGH-SCORE-ENTRY).
 * Allows player to enter initials for high score.
 * Supports keyboard navigation with visible focus indicators.
 */
@Component({
  selector: 'app-high-score-entry',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="high-score-entry">
      <div class="high-score-entry__container">
        <h1 class="high-score-entry__title">NEW HIGH SCORE!</h1>
        
        <div class="high-score-entry__score">
          <span class="score-label">Score:</span>
          <span class="score-value">{{ score }}</span>
        </div>

        <div class="high-score-entry__form">
          <label class="high-score-entry__label">Enter Your Initials:</label>
          
          <div class="high-score-entry__inputs">
            <input 
              class="high-score-entry__input"
              type="text"
              maxlength="1"
              tabindex="0"
              (keydown)="onInitialKeydown($event, 0)"
              #initialInput>
            
            <input 
              class="high-score-entry__input"
              type="text"
              maxlength="1"
              tabindex="1"
              (keydown)="onInitialKeydown($event, 1)"
              #initialInput>
            
            <input 
              class="high-score-entry__input"
              type="text"
              maxlength="1"
              tabindex="2"
              (keydown)="onInitialKeydown($event, 2)"
              #initialInput>
          </div>
        </div>

        <div class="high-score-entry__buttons">
          <button 
            class="high-score-entry__button high-score-entry__button--submit"
            tabindex="3"
            [disabled]="!isFormValid()"
            (click)="onSubmit()">
            Submit
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .high-score-entry {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #2e1a2e 0%, #1a162e 100%);
        color: #fff;
        font-family: 'Arial', sans-serif;
      }

      .high-score-entry__container {
        text-align: center;
        padding: 2rem;
        max-width: 500px;
      }

      .high-score-entry__title {
        font-size: 2.5rem;
        margin: 0 0 2rem 0;
        color: #ffff00;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        letter-spacing: 2px;
      }

      .high-score-entry__score {
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

      .high-score-entry__form {
        margin: 2rem 0;
      }

      .high-score-entry__label {
        display: block;
        margin-bottom: 1rem;
        font-size: 1.1rem;
        color: #00ff00;
        font-weight: bold;
      }

      .high-score-entry__inputs {
        display: flex;
        justify-content: center;
        gap: 1rem;
        margin-bottom: 2rem;
      }

      .high-score-entry__input {
        width: 60px;
        height: 60px;
        font-size: 2rem;
        text-align: center;
        text-transform: uppercase;
        border: 2px solid #ff00ff;
        border-radius: 4px;
        background: rgba(0, 0, 0, 0.5);
        color: #ffff00;
        font-weight: bold;
        transition: all 0.2s ease;
      }

      .high-score-entry__input:hover {
        border-color: #00ff00;
        box-shadow: 0 0 10px rgba(0, 255, 0, 0.3);
      }

      .high-score-entry__input:focus-visible {
        outline: 3px solid #ffff00;
        outline-offset: 2px;
        border-color: #ffff00;
      }

      .high-score-entry__buttons {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .high-score-entry__button {
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

      .high-score-entry__button--submit {
        background: #00ff00;
        color: #000;
      }

      .high-score-entry__button--submit:hover {
        background: #00ff00;
        transform: scale(1.05);
        box-shadow: 0 4px 12px rgba(0, 255, 0, 0.4);
      }

      .high-score-entry__button:focus-visible {
        outline: 3px solid #ffff00;
        outline-offset: 2px;
      }

      @media (max-width: 600px) {
        .high-score-entry__title {
          font-size: 1.8rem;
        }

        .high-score-entry__input {
          width: 50px;
          height: 50px;
          font-size: 1.5rem;
        }

        .high-score-entry__button {
          padding: 0.8rem 1.5rem;
          font-size: 1rem;
        }
      }
    `,
  ],
})
export class HighScoreEntryComponent implements OnInit {
  @Input() score: number = 0;
  @ViewChildren('initialInput') initialInputs!: QueryList<any>;

  initials: string[] = ['', '', ''];
  isSubmitting = false;

  constructor(
    private gameState: GameStateService,
    private scoreStorage: ScoreStorageService
  ) {}

  ngOnInit(): void {
    // Focus first input on init
    setTimeout(() => {
      const inputs = this.initialInputs.toArray();
      if (inputs.length > 0) {
        inputs[0].nativeElement.focus();
      }
    }, 100);
  }

  isFormValid(): boolean {
    return this.initials.every((initial) => initial.length === 1);
  }

  onInitialKeydown(event: KeyboardEvent, index: number): void {
    const input = event.target as HTMLInputElement;
    const char = event.key.toUpperCase();

    // Handle Backspace
    if (event.key === 'Backspace') {
      event.preventDefault();
      this.initials[index] = '';
      input.value = '';
      // Move to previous input if available
      if (index > 0) {
        const inputs = this.initialInputs.toArray();
        inputs[index - 1].nativeElement.focus();
      }
      return;
    }

    // Allow only letters
    if (!/^[A-Z]$/.test(char)) {
      if (event.key !== 'Tab' && event.key !== 'Shift') {
        event.preventDefault();
      }
      return;
    }

    event.preventDefault();
    this.initials[index] = char;
    input.value = char;

    // Move to next input
    if (index < 2) {
      const inputs = this.initialInputs.toArray();
      inputs[index + 1].nativeElement.focus();
    }
  }

  onSubmit(): void {
    if (this.isSubmitting || !this.isFormValid()) {
      return;
    }

    this.isSubmitting = true;
    const initials = this.initials.join('').toUpperCase();
    this.scoreStorage.addHighScore({
      initials,
      score: this.score,
    });
    this.gameState.goToStart();
  }
}
