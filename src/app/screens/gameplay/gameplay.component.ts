// [STUB]
import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Gameplay component (MOD-GAMEPLAY).
 * Scaffold stub: hosts the canvas element and manages the game loop.
 */
@Component({
  selector: 'app-gameplay',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="gameplay"><canvas #gameCanvas></canvas></div>`,
  styles: [
    `
      .gameplay {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
      }
      canvas {
        border: 1px solid #ccc;
      }
    `,
  ],
})
export class GameplayComponent {}
