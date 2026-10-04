// [STUB]
import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Countdown component (MOD-COUNTDOWN).
 * Scaffold stub: displays a countdown before gameplay starts.
 */
@Component({
  selector: 'app-countdown',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="countdown">Countdown Stub</div>`,
  styles: [
    `
      .countdown {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
      }
    `,
  ],
})
export class CountdownComponent {}
