// [STUB]
import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Pause overlay component (MOD-PAUSE-OVERLAY).
 * Scaffold stub: displays pause menu with resume/quit options.
 */
@Component({
  selector: 'app-pause-overlay',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="pause-overlay">Pause Overlay Stub</div>`,
  styles: [
    `
      .pause-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
      }
    `,
  ],
})
export class PauseOverlayComponent {}
