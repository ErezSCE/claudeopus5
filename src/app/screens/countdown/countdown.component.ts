import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

/**
 * Countdown screen (MOD-COUNTDOWN): announces the pre-round countdown.
 * Non-interactive; announced to assistive tech via a polite live region.
 */
@Component({
  selector: 'app-countdown',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="countdown" role="status" aria-live="polite">
      <p class="countdown__label">Get Ready!</p>
      <p class="countdown__value">{{ count }}</p>
    </section>
  `,
  styles: [
    `
      .countdown { display: flex; flex-direction: column; align-items: center; color: #ffd800; }
      .countdown__value { font-size: 3rem; margin: 0; }
    `,
  ],
})
export class CountdownComponent {
  @Input() count = 3;
}
