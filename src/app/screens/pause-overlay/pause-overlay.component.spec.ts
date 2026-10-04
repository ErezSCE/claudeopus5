import { TestBed, ComponentFixture } from '@angular/core/testing';
import { PauseOverlayComponent } from './pause-overlay.component';
import { GameStateService } from '../../game/state/game-state.service';

describe('PauseOverlayComponent', () => {
  let component: PauseOverlayComponent;
  let fixture: ComponentFixture<PauseOverlayComponent>;
  let mockGameState: jasmine.SpyObj<GameStateService>;

  beforeEach(async () => {
    mockGameState = jasmine.createSpyObj('GameStateService', [
      'resumeGame',
      'restartGame',
    ]);

    await TestBed.configureTestingModule({
      imports: [PauseOverlayComponent],
      providers: [{ provide: GameStateService, useValue: mockGameState }],
    }).compileComponents();

    fixture = TestBed.createComponent(PauseOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeInstanceOf(PauseOverlayComponent);
  });

  it('[US-028#1] should have focusable resume button with tabindex', () => {
    const resumeButton = fixture.nativeElement.querySelector(
      '.pause-overlay__button--resume'
    );
    expect(resumeButton).toBeTruthy();
    expect(resumeButton.getAttribute('tabindex')).toBe('0');
  });

  it('[US-028#1] should have focusable restart button with tabindex', () => {
    const restartButton = fixture.nativeElement.querySelector(
      '.pause-overlay__button--restart'
    );
    expect(restartButton).toBeTruthy();
    expect(restartButton.getAttribute('tabindex')).toBe('1');
  });

  it('[US-028#2] should display focus indicator on button focus', () => {
    const resumeButton = fixture.nativeElement.querySelector(
      '.pause-overlay__button--resume'
    );
    resumeButton.focus();
    fixture.detectChanges();

    expect(resumeButton === document.activeElement).toBe(true);
  });

  it('[US-028#1] should call resumeGame when resume button is clicked', () => {
    const resumeButton = fixture.nativeElement.querySelector(
      '.pause-overlay__button--resume'
    );
    resumeButton.click();
    expect(mockGameState.resumeGame).toHaveBeenCalled();
  });

  it('[US-028#1] should call resumeGame when resume button is activated with Enter', () => {
    const resumeButton = fixture.nativeElement.querySelector(
      '.pause-overlay__button--resume'
    );
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    resumeButton.dispatchEvent(event);
    resumeButton.click();
    expect(mockGameState.resumeGame).toHaveBeenCalled();
  });

  it('[US-028#1] should call resumeGame when resume button is activated with Space', () => {
    const resumeButton = fixture.nativeElement.querySelector(
      '.pause-overlay__button--resume'
    );
    const event = new KeyboardEvent('keydown', { key: ' ' });
    resumeButton.dispatchEvent(event);
    resumeButton.click();
    expect(mockGameState.resumeGame).toHaveBeenCalled();
  });

  it('[US-028#1] should call restartGame when restart button is clicked', () => {
    const restartButton = fixture.nativeElement.querySelector(
      '.pause-overlay__button--restart'
    );
    restartButton.click();
    expect(mockGameState.restartGame).toHaveBeenCalled();
  });

  it('[US-028#1] should be keyboard navigable with Tab key', () => {
    const resumeButton = fixture.nativeElement.querySelector(
      '.pause-overlay__button--resume'
    );
    const restartButton = fixture.nativeElement.querySelector(
      '.pause-overlay__button--restart'
    );

    resumeButton.focus();
    expect(document.activeElement).toBe(resumeButton);

    restartButton.focus();
    expect(document.activeElement).toBe(restartButton);
  });
});
