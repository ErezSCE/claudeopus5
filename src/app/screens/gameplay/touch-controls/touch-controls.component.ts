// [STUB]
import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Touch controls component (MOD-TOUCH-CONTROLS).
 * Scaffold stub: on-screen directional buttons for mobile input.
 */
@Component({
  selector: 'app-touch-controls',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="touch-controls">Touch Controls Stub</div>`,
  styles: [
    `
      .touch-controls {
        display: flex;
        gap: 1rem;
        justify-content: center;
        padding: 1rem;
      }
    `,
  ],
})
export class TouchControlsComponent {}
