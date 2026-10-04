// [STUB]
import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * High score entry screen component (MOD-HIGH-SCORE-ENTRY).
 * Scaffold stub: prompts player for 3-letter initials to save high score.
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
export class HighScoreEntryComponent {}
