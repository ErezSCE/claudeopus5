// [STUB]
import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Start screen component (MOD-START-SCREEN).
 * Scaffold stub: displays the start screen and transitions to countdown on input.
 */
@Component({
  selector: 'app-start-screen',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="start-screen">Start Screen Stub</div>`,
  styles: [
    `
      .start-screen {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
      }
    `,
  ],
})
export class StartScreenComponent {}
