import { Injectable, NgZone, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject, merge } from 'rxjs';
import { Direction } from '../../shared/types';

/**
 * Input Service (MOD-INPUT).
 *
 * Normalizes keyboard (arrow keys/WASD), touch swipe, and on-screen button input
 * into a single Direction stream consumed by the game engine.
 *
 * - Keyboard: arrow keys and WASD
 * - Swipe: touchstart/touchmove/touchend on a target element
 * - On-screen buttons: emitted directly via setDirection()
 */
@Injectable({ providedIn: 'root' })
export class InputService implements OnDestroy {
  private readonly directionSubject = new BehaviorSubject<Direction>('none');
  readonly direction$: Observable<Direction> = this.directionSubject.asObservable();

  private touchStartX = 0;
  private touchStartY = 0;
  private touchElement: HTMLElement | null = null;

  constructor(private readonly zone: NgZone) {
    this.setupKeyboardInput();
  }

  /**
   * Set direction from on-screen buttons or other sources.
   */
  setDirection(direction: Direction): void {
    this.directionSubject.next(direction);
  }

  /**
   * Register a touch element for swipe gesture detection.
   * Call this from components that want to enable swipe input (e.g., GameplayComponent).
   */
  registerTouchElement(element: HTMLElement): void {
    this.touchElement = element;
    this.zone.runOutsideAngular(() => {
      element.addEventListener('touchstart', this.onTouchStart.bind(this), false);
      element.addEventListener('touchmove', this.onTouchMove.bind(this), false);
      element.addEventListener('touchend', this.onTouchEnd.bind(this), false);
    });
  }

  /**
   * Unregister a touch element.
   */
  unregisterTouchElement(): void {
    if (this.touchElement) {
      this.zone.runOutsideAngular(() => {
        this.touchElement!.removeEventListener('touchstart', this.onTouchStart.bind(this));
        this.touchElement!.removeEventListener('touchmove', this.onTouchMove.bind(this));
        this.touchElement!.removeEventListener('touchend', this.onTouchEnd.bind(this));
      });
      this.touchElement = null;
    }
  }

  ngOnDestroy(): void {
    this.unregisterTouchElement();
    this.directionSubject.complete();
  }

  /**
   * Setup keyboard input listeners.
   */
  private setupKeyboardInput(): void {
    this.zone.runOutsideAngular(() => {
      document.addEventListener('keydown', this.onKeyDown.bind(this), false);
      document.addEventListener('keyup', this.onKeyUp.bind(this), false);
    });
  }

  /**
   * Handle keyboard down events.
   */
  private onKeyDown(event: KeyboardEvent): void {
    const direction = this.keyToDirection(event.key);
    if (direction && direction !== 'none') {
      event.preventDefault();
      this.setDirection(direction);
    }
  }

  /**
   * Handle keyboard up events.
   * Note: We don't reset to 'none' on key up; the next key press will override.
   */
  private onKeyUp(event: KeyboardEvent): void {
    // Could implement key-up handling if needed for continuous movement
  }

  /**
   * Map keyboard key to Direction.
   */
  private keyToDirection(key: string): Direction | null {
    const lowerKey = key.toLowerCase();
    switch (lowerKey) {
      case 'arrowup':
      case 'w':
        return 'up';
      case 'arrowdown':
      case 's':
        return 'down';
      case 'arrowleft':
      case 'a':
        return 'left';
      case 'arrowright':
      case 'd':
        return 'right';
      default:
        return null;
    }
  }

  /**
   * Handle touch start event.
   */
  private onTouchStart(event: TouchEvent): void {
    if (event.touches.length > 0) {
      const touch = event.touches[0];
      this.touchStartX = touch.clientX;
      this.touchStartY = touch.clientY;
    }
  }

  /**
   * Handle touch move event (optional, for future enhancements).
   */
  private onTouchMove(event: TouchEvent): void {
    // Could implement continuous swipe tracking if needed
  }

  /**
   * Handle touch end event.
   */
  private onTouchEnd(event: TouchEvent): void {
    if (event.changedTouches.length > 0) {
      const touch = event.changedTouches[0];
      const endX = touch.clientX;
      const endY = touch.clientY;

      const direction = this.detectSwipeDirection(
        this.touchStartX,
        this.touchStartY,
        endX,
        endY
      );

      if (direction && direction !== 'none') {
        this.setDirection(direction);
      }
    }
  }

  /**
   * Detect swipe direction from start and end coordinates.
   * Requires a minimum swipe distance to avoid accidental triggers.
   */
  private detectSwipeDirection(
    startX: number,
    startY: number,
    endX: number,
    endY: number
  ): Direction | null {
    const MIN_SWIPE_DISTANCE = 30; // pixels

    const deltaX = endX - startX;
    const deltaY = endY - startY;

    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);

    // Require minimum swipe distance
    if (absDeltaX < MIN_SWIPE_DISTANCE && absDeltaY < MIN_SWIPE_DISTANCE) {
      return null;
    }

    // Determine primary direction based on which delta is larger
    if (absDeltaX > absDeltaY) {
      // Horizontal swipe
      return deltaX > 0 ? 'right' : 'left';
    } else {
      // Vertical swipe
      return deltaY > 0 ? 'down' : 'up';
    }
  }
}
