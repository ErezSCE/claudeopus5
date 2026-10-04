import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Countdown component (MOD-COUNTDOWN).
 * Displays countdown before gameplay starts.
 */
@Component({
  selector: 'app-countdown',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="countdown">
      <h1 class="countdown__text">Get Ready!</h1>
    </div>
  `,
  styles: [
    `
      .countdown {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #2e1a2e 0%, #1a162e 100%);
        color: #fff;
        font-family: 'Arial', sans-serif;
      }

      .countdown__text {
        font-size: 3rem;
        margin: 0;
        color: #ffff00;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        letter-spacing: 2px;
        animation: pulse 1s ease-in-out infinite;
      }

      @keyframes pulse {
        0%, 100% {
          opacity: 1;
        }
        50% {
          opacity: 0.5;
        }
      }

      @media (max-width: 600px) {
        .countdown__text {
          font-size: 2rem;
        }
      }
    `,
  ],
})
export class CountdownComponent {}
