import { TestBed } from '@angular/core/testing';
import { InputService } from './input.service';
import { Direction } from '../../shared/types';

describe('InputService', () => {
  let service: InputService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InputService],
    });
    service = TestBed.inject(InputService);
  });

  afterEach(() => {
    service.ngOnDestroy();
  });

  describe('[US-030#1] swipe gesture detection', () => {
    it('[US-030#1] should detect right swipe', (done) => {
      const mockElement = document.createElement('div');
      service.registerTouchElement(mockElement);

      service.direction$.subscribe((direction) => {
        if (direction === 'right') {
          expect(direction).toBe('right');
          done();
        }
      });

      // Simulate swipe right: start at (0, 0), end at (50, 0)
      const touchStartEvent = new TouchEvent('touchstart', {
        touches: [
          new Touch({
            identifier: 0,
            target: mockElement,
            clientX: 0,
            clientY: 0,
            screenX: 0,
            screenY: 0,
            pageX: 0,
            pageY: 0,
          }),
        ],
      });

      const touchEndEvent = new TouchEvent('touchend', {
        changedTouches: [
          new Touch({
            identifier: 0,
            target: mockElement,
            clientX: 50,
            clientY: 0,
            screenX: 50,
            screenY: 0,
            pageX: 50,
            pageY: 0,
          }),
        ],
      });

      mockElement.dispatchEvent(touchStartEvent);
      mockElement.dispatchEvent(touchEndEvent);
    });

    it('[US-030#1] should detect left swipe', (done) => {
      const mockElement = document.createElement('div');
      service.registerTouchElement(mockElement);

      service.direction$.subscribe((direction) => {
        if (direction === 'left') {
          expect(direction).toBe('left');
          done();
        }
      });

      // Simulate swipe left: start at (50, 0), end at (0, 0)
      const touchStartEvent = new TouchEvent('touchstart', {
        touches: [
          new Touch({
            identifier: 0,
            target: mockElement,
            clientX: 50,
            clientY: 0,
            screenX: 50,
            screenY: 0,
            pageX: 50,
            pageY: 0,
          }),
        ],
      });

      const touchEndEvent = new TouchEvent('touchend', {
        changedTouches: [
          new Touch({
            identifier: 0,
            target: mockElement,
            clientX: 0,
            clientY: 0,
            screenX: 0,
            screenY: 0,
            pageX: 0,
            pageY: 0,
          }),
        ],
      });

      mockElement.dispatchEvent(touchStartEvent);
      mockElement.dispatchEvent(touchEndEvent);
    });

    it('[US-030#1] should detect down swipe', (done) => {
      const mockElement = document.createElement('div');
      service.registerTouchElement(mockElement);

      service.direction$.subscribe((direction) => {
        if (direction === 'down') {
          expect(direction).toBe('down');
          done();
        }
      });

      // Simulate swipe down: start at (0, 0), end at (0, 50)
      const touchStartEvent = new TouchEvent('touchstart', {
        touches: [
          new Touch({
            identifier: 0,
            target: mockElement,
            clientX: 0,
            clientY: 0,
            screenX: 0,
            screenY: 0,
            pageX: 0,
            pageY: 0,
          }),
        ],
      });

      const touchEndEvent = new TouchEvent('touchend', {
        changedTouches: [
          new Touch({
            identifier: 0,
            target: mockElement,
            clientX: 0,
            clientY: 50,
            screenX: 0,
            screenY: 50,
            pageX: 0,
            pageY: 50,
          }),
        ],
      });

      mockElement.dispatchEvent(touchStartEvent);
      mockElement.dispatchEvent(touchEndEvent);
    });

    it('[US-030#1] should detect up swipe', (done) => {
      const mockElement = document.createElement('div');
      service.registerTouchElement(mockElement);

      service.direction$.subscribe((direction) => {
        if (direction === 'up') {
          expect(direction).toBe('up');
          done();
        }
      });

      // Simulate swipe up: start at (0, 50), end at (0, 0)
      const touchStartEvent = new TouchEvent('touchstart', {
        touches: [
          new Touch({
            identifier: 0,
            target: mockElement,
            clientX: 0,
            clientY: 50,
            screenX: 0,
            screenY: 50,
            pageX: 0,
            pageY: 50,
          }),
        ],
      });

      const touchEndEvent = new TouchEvent('touchend', {
        changedTouches: [
          new Touch({
            identifier: 0,
            target: mockElement,
            clientX: 0,
            clientY: 0,
            screenX: 0,
            screenY: 0,
            pageX: 0,
            pageY: 0,
          }),
        ],
      });

      mockElement.dispatchEvent(touchStartEvent);
      mockElement.dispatchEvent(touchEndEvent);
    });

    it('[US-030#1] should ignore swipes below minimum distance', (done) => {
      const mockElement = document.createElement('div');
      service.registerTouchElement(mockElement);

      let directionEmitted = false;
      const subscription = service.direction$.subscribe((direction) => {
        if (direction !== 'none') {
          directionEmitted = true;
        }
      });

      // Simulate a very short swipe (less than 30px)
      const touchStartEvent = new TouchEvent('touchstart', {
        touches: [
          new Touch({
            identifier: 0,
            target: mockElement,
            clientX: 0,
            clientY: 0,
            screenX: 0,
            screenY: 0,
            pageX: 0,
            pageY: 0,
          }),
        ],
      });

      const touchEndEvent = new TouchEvent('touchend', {
        changedTouches: [
          new Touch({
            identifier: 0,
            target: mockElement,
            clientX: 10,
            clientY: 0,
            screenX: 10,
            screenY: 0,
            pageX: 10,
            pageY: 0,
          }),
        ],
      });

      mockElement.dispatchEvent(touchStartEvent);
      mockElement.dispatchEvent(touchEndEvent);

      // Wait a bit to ensure no direction was emitted
      setTimeout(() => {
        expect(directionEmitted).toBe(false);
        subscription.unsubscribe();
        done();
      }, 100);
    });
  });

  describe('keyboard input', () => {
    it('should detect arrow up key', (done) => {
      service.direction$.subscribe((direction) => {
        if (direction === 'up') {
          expect(direction).toBe('up');
          done();
        }
      });

      const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
      document.dispatchEvent(event);
    });

    it('should detect arrow down key', (done) => {
      service.direction$.subscribe((direction) => {
        if (direction === 'down') {
          expect(direction).toBe('down');
          done();
        }
      });

      const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
      document.dispatchEvent(event);
    });

    it('should detect arrow left key', (done) => {
      service.direction$.subscribe((direction) => {
        if (direction === 'left') {
          expect(direction).toBe('left');
          done();
        }
      });

      const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
      document.dispatchEvent(event);
    });

    it('should detect arrow right key', (done) => {
      service.direction$.subscribe((direction) => {
        if (direction === 'right') {
          expect(direction).toBe('right');
          done();
        }
      });

      const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
      document.dispatchEvent(event);
    });

    it('should detect W key as up', (done) => {
      service.direction$.subscribe((direction) => {
        if (direction === 'up') {
          expect(direction).toBe('up');
          done();
        }
      });

      const event = new KeyboardEvent('keydown', { key: 'w' });
      document.dispatchEvent(event);
    });

    it('should detect S key as down', (done) => {
      service.direction$.subscribe((direction) => {
        if (direction === 'down') {
          expect(direction).toBe('down');
          done();
        }
      });

      const event = new KeyboardEvent('keydown', { key: 's' });
      document.dispatchEvent(event);
    });

    it('should detect A key as left', (done) => {
      service.direction$.subscribe((direction) => {
        if (direction === 'left') {
          expect(direction).toBe('left');
          done();
        }
      });

      const event = new KeyboardEvent('keydown', { key: 'a' });
      document.dispatchEvent(event);
    });

    it('should detect D key as right', (done) => {
      service.direction$.subscribe((direction) => {
        if (direction === 'right') {
          expect(direction).toBe('right');
          done();
        }
      });

      const event = new KeyboardEvent('keydown', { key: 'd' });
      document.dispatchEvent(event);
    });
  });

  describe('setDirection', () => {
    it('should emit direction when setDirection is called', (done) => {
      service.direction$.subscribe((direction) => {
        if (direction === 'up') {
          expect(direction).toBe('up');
          done();
        }
      });

      service.setDirection('up');
    });

    it('should emit multiple directions in sequence', (done) => {
      const directions: Direction[] = [];
      const subscription = service.direction$.subscribe((direction) => {
        directions.push(direction);
        if (directions.length === 4) {
          // Skip the initial 'none' value
          expect(directions.slice(1)).toEqual(['up', 'down', 'left']);
          subscription.unsubscribe();
          done();
        }
      });

      service.setDirection('up');
      service.setDirection('down');
      service.setDirection('left');
    });
  });

  describe('touch element registration', () => {
    it('should register and unregister touch element', () => {
      const mockElement = document.createElement('div');
      service.registerTouchElement(mockElement);
      expect(service['touchElement']).toBe(mockElement);

      service.unregisterTouchElement();
      expect(service['touchElement']).toBeNull();
    });
  });

  describe('event listener cleanup', () => {
    it('[ASSIGN-022#1] should properly remove event listeners on destroy', () => {
      const mockElement = document.createElement('div');
      const removeEventListenerSpy = spyOn(mockElement, 'removeEventListener');
      const documentRemoveEventListenerSpy = spyOn(
        document,
        'removeEventListener'
      );

      service.registerTouchElement(mockElement);
      service.ngOnDestroy();

      // Verify touch listeners are removed
      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        'touchstart',
        jasmine.any(Function),
        jasmine.any(Object)
      );
      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        'touchend',
        jasmine.any(Function)
      );
      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        'touchmove',
        jasmine.any(Function)
      );

      // Verify document listeners are removed
      expect(documentRemoveEventListenerSpy).toHaveBeenCalledWith(
        'keydown',
        jasmine.any(Function)
      );
      expect(documentRemoveEventListenerSpy).toHaveBeenCalledWith(
        'keyup',
        jasmine.any(Function)
      );
    });

    it('[ASSIGN-022#1] should not stack multiple event listeners on repeated registration', (done) => {
      const mockElement = document.createElement('div');
      let swipeCount = 0;

      service.registerTouchElement(mockElement);
      service.registerTouchElement(mockElement); // Register twice

      service.direction$.subscribe((direction) => {
        if (direction === 'right') {
          swipeCount++;
        }
      });

      // Simulate a single swipe
      const touchStartEvent = new TouchEvent('touchstart', {
        touches: [
          new Touch({
            identifier: 0,
            target: mockElement,
            clientX: 0,
            clientY: 0,
            screenX: 0,
            screenY: 0,
            pageX: 0,
            pageY: 0,
          }),
        ],
      });

      const touchEndEvent = new TouchEvent('touchend', {
        changedTouches: [
          new Touch({
            identifier: 0,
            target: mockElement,
            clientX: 50,
            clientY: 0,
            screenX: 50,
            screenY: 0,
            pageX: 50,
            pageY: 0,
          }),
        ],
      });

      mockElement.dispatchEvent(touchStartEvent);
      mockElement.dispatchEvent(touchEndEvent);

      // Give time for async operations
      setTimeout(() => {
        // Should be called only once, not twice
        expect(swipeCount).toBe(1);
        done();
      }, 100);
    });
  });
});
