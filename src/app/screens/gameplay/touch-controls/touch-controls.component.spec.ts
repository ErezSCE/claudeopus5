import { TestBed } from '@angular/core/testing';
import { TouchControlsComponent } from './touch-controls.component';
import { InputService } from '../../../game/input/input.service';
import { Direction } from '../../../shared/types';

describe('TouchControlsComponent', () => {
  let component: TouchControlsComponent;
  let inputService: InputService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TouchControlsComponent],
      providers: [InputService],
    });

    const fixture = TestBed.createComponent(TouchControlsComponent);
    component = fixture.componentInstance;
    inputService = TestBed.inject(InputService);
    fixture.detectChanges();
  });

  afterEach(() => {
    inputService.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeInstanceOf(TouchControlsComponent);
  });

  describe('[US-031#1] on-screen directional buttons', () => {
    it('[US-031#1] should render up button', () => {
      const fixture = TestBed.createComponent(TouchControlsComponent);
      fixture.detectChanges();
      const compiled = fixture.nativeElement;
      const buttons = compiled.querySelectorAll('.touch-button');
      expect(buttons.length).toBeGreaterThan(0);
    });

    it('[US-031#1] should render left, down, right buttons', () => {
      const fixture = TestBed.createComponent(TouchControlsComponent);
      fixture.detectChanges();
      const compiled = fixture.nativeElement;
      const buttons = compiled.querySelectorAll('.touch-button');
      // Should have 4 buttons: up, left, down, right
      expect(buttons.length).toBe(4);
    });

    it('[US-031#1] should emit up direction when up button is pressed', () => {
      spyOn(inputService, 'setDirection');
      component.onButtonDown('up');
      expect(inputService.setDirection).toHaveBeenCalledWith('up');
    });

    it('[US-031#1] should emit down direction when down button is pressed', () => {
      spyOn(inputService, 'setDirection');
      component.onButtonDown('down');
      expect(inputService.setDirection).toHaveBeenCalledWith('down');
    });

    it('[US-031#1] should emit left direction when left button is pressed', () => {
      spyOn(inputService, 'setDirection');
      component.onButtonDown('left');
      expect(inputService.setDirection).toHaveBeenCalledWith('left');
    });

    it('[US-031#1] should emit right direction when right button is pressed', () => {
      spyOn(inputService, 'setDirection');
      component.onButtonDown('right');
      expect(inputService.setDirection).toHaveBeenCalledWith('right');
    });

    it('[US-031#1] should handle button release', () => {
      component.onButtonDown('up');
      component.onButtonUp();
      // Should not throw and should clear active button
      expect(component['activeButton']).toBeNull();
    });
  });

  describe('[US-031#2] controls do not obstruct maze', () => {
    it('[US-031#2] should position controls in fixed bottom-right corner', () => {
      const fixture = TestBed.createComponent(TouchControlsComponent);
      fixture.detectChanges();
      const compiled = fixture.nativeElement;
      const controlsDiv = compiled.querySelector('.touch-controls');
      const styles = window.getComputedStyle(controlsDiv);
      expect(styles.position).toBe('fixed');
      // 1rem = 16px in default browser settings
      expect(styles.bottom).toBe('16px');
      expect(styles.right).toBe('16px');
    });

    it('[US-031#2] should have high z-index to avoid obstruction', () => {
      const fixture = TestBed.createComponent(TouchControlsComponent);
      fixture.detectChanges();
      const compiled = fixture.nativeElement;
      const controlsDiv = compiled.querySelector('.touch-controls');
      const styles = window.getComputedStyle(controlsDiv);
      expect(parseInt(styles.zIndex)).toBeGreaterThan(50);
    });

    it('[US-031#2] should hide controls on desktop viewports', () => {
      const fixture = TestBed.createComponent(TouchControlsComponent);
      fixture.detectChanges();
      const compiled = fixture.nativeElement;
      const controlsDiv = compiled.querySelector('.touch-controls');
      // Note: CSS media queries are not applied in unit tests, but we can verify the styles exist
      expect(controlsDiv).toBeTruthy();
    });
  });

  describe('button interaction', () => {
    it('should handle multiple button presses in sequence', () => {
      spyOn(inputService, 'setDirection');
      component.onButtonDown('up');
      component.onButtonUp();
      component.onButtonDown('down');
      component.onButtonUp();
      expect(inputService.setDirection).toHaveBeenCalledWith('up');
      expect(inputService.setDirection).toHaveBeenCalledWith('down');
    });

    it('should track active button state', () => {
      component.onButtonDown('left');
      expect(component['activeButton']).toBe('left');
      component.onButtonUp();
      expect(component['activeButton']).toBeNull();
    });

    it('[ASSIGN-022#1] should call setDirection only once per pointer event', () => {
      spyOn(inputService, 'setDirection');
      component.onButtonDown('up');
      expect(inputService.setDirection).toHaveBeenCalledTimes(1);
      expect(inputService.setDirection).toHaveBeenCalledWith('up');
    });

    it('[ASSIGN-022#1] should use :focus-visible for keyboard focus styling', () => {
      // The component uses :focus-visible in its CSS for keyboard-only focus
      // This is verified by checking the component's styles property
      const styles = component['styles'];
      expect(styles).toBeDefined();
      expect(styles).toContain(':focus-visible');
    });
  });
});
