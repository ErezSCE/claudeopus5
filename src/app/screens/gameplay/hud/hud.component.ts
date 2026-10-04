// [STUB]
import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * HUD component (MOD-HUD).
 * Scaffold stub: displays score, lives, and level information.
 */
@Component({
  selector: 'app-hud',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="hud">HUD Stub</div>`,
  styles: [
    `
      .hud {
        display: flex;
        justify-content: space-between;
        padding: 1rem;
        background: #000;
        color: #fff;
      }
    `,
  ],
})
export class HudComponent {}
