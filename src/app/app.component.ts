import { ChangeDetectionStrategy, Component } from '@angular/core';

import { GameScreen } from './shared/types';

/**
 * Root app shell (MOD-APP-COMPONENT).
 * Scaffold stub: hosts the game container. The owning assignment wires in
 * GameStateService and switches between screen components based on `screen`.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <main class="app-shell" [attr.data-screen]="screen">
      <h1 class="app-shell__title">Pac-Man</h1>
    </main>
  `,
  styles: [
    `
      .app-shell {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100dvh;
      }

      .app-shell__title {
        margin: 0;
        color: var(--color-accent);
      }
    `,
  ],
})
export class AppComponent {
  readonly screen: GameScreen = 'start';
}
