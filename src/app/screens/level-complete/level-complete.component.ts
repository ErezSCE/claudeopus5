// [STUB]
import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Level complete screen component (MOD-LEVEL-COMPLETE).
 * Scaffold stub: displays level completion with score and next level prompt.
 */
@Component({
  selector: 'app-level-complete',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="level-complete">Level Complete Stub</div>`,
  styles: [
    `
      .level-complete {
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
export class LevelCompleteComponent {}
