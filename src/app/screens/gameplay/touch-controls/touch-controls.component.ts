import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputService } from '../../../game/input/input.service';
import { Direction } from '../../../shared/types';

/**
 * Touch controls component (MOD-TOUCH-CONTROLS).
 *
 * Renders on-screen directional buttons (up, down, left, right) visible on touch/mobile viewports.
 * Each button press updates Pac-Man's direction via InputService.
 *
 * The controls are positioned in the bottom-right corner to avoid obstructing the maze.
 * They are hidden on desktop viewports (via CSS media query).
 * Uses (pointerdown) and (pointerup) to handle both touch and mouse input uniformly.
 */
@Component({
  selector: 'app-touch-controls',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="touch-controls">
      <!-- Up button -->
      <button
        class="touch-button touch-button-up"
        aria-label="Move up"
        (pointerdown)="onButtonDown('up')"
        (pointerup)="onButtonUp()"
      >
        ▲
      </button>

      <!-- Left, Down, Right buttons -->
      <div class="touch-controls-row">
        <button
          class="touch-button touch-button-left"
          aria-label="Move left"
          (pointerdown)="onButtonDown('left')"
          (pointerup)="onButtonUp()"
        >
          ◀
        </button>
        <button
          class="touch-button touch-button-down"
          aria-label="Move down"
          (pointerdown)="onButtonDown('down')"
          (pointerup)="onButtonUp()"
        >
          ▼
        </button>
        <button
          class="touch-button touch-button-right"
          aria-label="Move right"
          (pointerdown)="onButtonDown('right')"
          (pointerup)="onButtonUp()"
        >
          ▶
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      .touch-controls {
        position: fixed;
        bottom: 1rem;
        right: 1rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        z-index: 100;
        pointer-events: auto;
      }

      .touch-controls-row {
        display: flex;
        gap: 0.5rem;
        justify-content: center;
      }

      .touch-button {
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        border: 2px solid #333;
        background-color: rgba(255, 255, 255, 0.8);
        color: #333;
        font-size: 1.2rem;
        font-weight: bold;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.1s ease;
        user-select: none;
        -webkit-user-select: none;
        -webkit-touch-callout: none;
      }

      .touch-button:active {
        background-color: rgba(100, 150, 255, 0.9);
        border-color: #0066ff;
        transform: scale(0.95);
      }

      .touch-button:focus-visible {
        outline: 2px solid #0066ff;
        outline-offset: 2px;
      }

      /* Hide on desktop (larger than 768px) */
      @media (min-width: 769px) {
        .touch-controls {
          display: none;
        }
      }

      /* Optimize for small screens */
      @media (max-width: 480px) {
        .touch-controls {
          bottom: 0.5rem;
          right: 0.5rem;
        }

        .touch-button {
          width: 2.5rem;
          height: 2.5rem;
          font-size: 1rem;
        }
      }
    `,
  ],
})
export class TouchControlsComponent implements OnInit {
  private activeButton: Direction | null = null;

  constructor(private readonly inputService: InputService) {}

  ngOnInit(): void {
    // Component is initialized; buttons will emit directions via onButtonDown
  }

  /**
   * Handle button press (pointerdown).
   */
  onButtonDown(direction: Direction): void {
    this.activeButton = direction;
    this.inputService.setDirection(direction);
  }

  /**
   * Handle button release (pointerup).
   */
  onButtonUp(): void {
    this.activeButton = null;
    // Optionally emit 'none' to stop movement, or let the game engine handle it
    // For now, we keep the last direction active until a new direction is pressed
  }
}
