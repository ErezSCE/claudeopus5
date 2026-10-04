import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { GameStateService } from '../../game/state/game-state.service';

/** Level-complete screen (MOD-LEVEL-COMPLETE): advance to the next level. */
@Component({
  selector: 'app-level-complete',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="level-complete" aria-labelledby="level-complete-title">
      <h2 id="level-complete-title" class="level-complete__title">Level Complete!</h2>
      <button type="button" class="level-complete__button" (click)="onNextLevel()">Next Level</button>
    </section>
  `,
  styles: [
    `
      .level-complete { display: flex; flex-direction: column; align-items: center; gap: 1rem; color: #fff; }
      .level-complete__button { min-width: 10rem; padding: 0.75rem 1.5rem; font: inherit; color: #000; background: #ffd800; border: 0; border-radius: 4px; cursor: pointer; }
      .level-complete__button:focus { outline: none; }
      .level-complete__button:focus-visible { outline: 3px solid #00e5ff; outline-offset: 3px; }
    `,
  ],
})
export class LevelCompleteComponent {
  private readonly gameState = inject(GameStateService);

  onNextLevel(): void {
    this.gameState.nextLevel();
  }
}
