import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  QueryList,
  ViewChildren,
  inject,
} from '@angular/core';

import { ScoreStorageService } from '../../core/storage/score-storage.service';
import { GameStateService } from '../../game/state/game-state.service';

const LETTER = /^[A-Z]$/;

/**
 * High-score initials entry (MOD-HIGH-SCORE-ENTRY). Collects exactly three
 * letters and saves the score once; Submit stays disabled until complete.
 */
@Component({
  selector: 'app-high-score-entry',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="high-score-entry" aria-labelledby="hse-title">
      <h2 id="hse-title" class="high-score-entry__title">New High Score!</h2>
      <p class="high-score-entry__score">{{ score }}</p>
      <div class="high-score-entry__inputs" role="group" aria-label="Enter your initials">
        @for (slot of slots; track slot) {
          <input
            #initialInput
            type="text"
            maxlength="1"
            autocomplete="off"
            class="high-score-entry__input"
            [attr.aria-label]="'Initial ' + (slot + 1)"
            [value]="initials[slot]"
            (input)="onInitialInput(slot, $event)"
            (keydown.backspace)="onBackspace(slot, $event)"
          />
        }
      </div>
      <button
        type="button"
        class="high-score-entry__button high-score-entry__button--submit"
        [disabled]="!canSubmit"
        (click)="onSubmit()"
      >
        Submit
      </button>
    </section>
  `,
  styles: [
    `
      .high-score-entry { display: flex; flex-direction: column; align-items: center; gap: 1rem; color: #fff; }
      .high-score-entry__inputs { display: flex; gap: 0.5rem; }
      .high-score-entry__input { width: 2.5rem; font: inherit; font-size: 1.5rem; text-align: center; text-transform: uppercase; }
      .high-score-entry__input:focus-visible { outline: 3px solid #00e5ff; outline-offset: 2px; }
      .high-score-entry__button { min-width: 10rem; padding: 0.75rem 1.5rem; font: inherit; color: #000; background: #ffd800; border: 0; border-radius: 4px; cursor: pointer; }
      .high-score-entry__button:disabled { opacity: 0.5; cursor: not-allowed; }
      .high-score-entry__button:focus { outline: none; }
      .high-score-entry__button:focus-visible { outline: 3px solid #00e5ff; outline-offset: 3px; }
    `,
  ],
})
export class HighScoreEntryComponent {
  private readonly gameState = inject(GameStateService);
  private readonly scoreStorage = inject(ScoreStorageService);

  @Input() score = 0;
  @ViewChildren('initialInput') private readonly inputs!: QueryList<ElementRef<HTMLInputElement>>;

  readonly slots = [0, 1, 2];
  initials: string[] = ['', '', ''];
  private isSubmitting = false;

  get canSubmit(): boolean {
    return !this.isSubmitting && this.initials.every((c) => LETTER.test(c));
  }

  onInitialInput(index: number, event: Event): void {
    const input = event.target as HTMLInputElement;
    const letter = input.value.slice(-1).toUpperCase();
    const accepted = LETTER.test(letter) ? letter : '';
    input.value = accepted;
    this.setInitial(index, accepted);
    if (accepted) {
      this.focusSlot(index + 1);
    }
  }

  onBackspace(index: number, event: Event): void {
    if (this.initials[index]) {
      event.preventDefault();
      this.setInitial(index, '');
      this.inputAt(index)!.value = '';
    } else if (index > 0) {
      event.preventDefault();
      this.setInitial(index - 1, '');
      this.inputAt(index - 1)!.value = '';
      this.focusSlot(index - 1);
    }
  }

  onSubmit(): void {
    if (!this.canSubmit) {
      return;
    }
    this.isSubmitting = true;
    this.scoreStorage.saveHighScore({ initials: this.initials.join(''), score: this.score });
    this.gameState.goToStart();
  }

  private setInitial(index: number, value: string): void {
    this.initials = this.initials.map((c, i) => (i === index ? value : c));
  }

  private inputAt(index: number): HTMLInputElement | undefined {
    return this.inputs?.get(index)?.nativeElement;
  }

  private focusSlot(index: number): void {
    this.inputAt(index)?.focus();
  }
}
