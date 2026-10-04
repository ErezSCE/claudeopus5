import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { GameStateService } from '../../game/state/game-state.service';

/** Pause overlay (MOD-PAUSE-OVERLAY): resume or restart the current game. */
@Component({
  selector: 'app-pause-overlay',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="pause-overlay" role="dialog" aria-modal="true" aria-labelledby="pause-title">
      <h2 id="pause-title" class="pause-overlay__title">Paused</h2>
      <button type="button" class="pause-overlay__button pause-overlay__button--resume" (click)="onResume()">
        Resume
      </button>
      <button type="button" class="pause-overlay__button pause-overlay__button--restart" (click)="onRestart()">
        Restart
      </button>
    </section>
  `,
  styles: [
    `
      .pause-overlay { display: flex; flex-direction: column; align-items: center; gap: 1rem; color: #fff; }
      .pause-overlay__button { min-width: 10rem; padding: 0.75rem 1.5rem; font: inherit; color: #000; background: #ffd800; border: 0; border-radius: 4px; cursor: pointer; }
      .pause-overlay__button:focus { outline: none; }
      .pause-overlay__button:focus-visible { outline: 3px solid #00e5ff; outline-offset: 3px; }
    `,
  ],
})
export class PauseOverlayComponent {
  private readonly gameState = inject(GameStateService);

  onResume(): void {
    this.gameState.resumeGame();
  }

  onRestart(): void {
    this.gameState.restartGame();
  }
}
