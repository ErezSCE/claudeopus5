// [STUB]
import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Game over screen component (MOD-GAME-OVER).
 * Scaffold stub: displays game over with final score and restart prompt.
 */
@Component({
  selector: 'app-game-over',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="game-over">Game Over Stub</div>`,
  styles: [
    `
      .game-over {
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
export class GameOverComponent {}
