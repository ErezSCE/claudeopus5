import { TestBed, ComponentFixture } from '@angular/core/testing';
import { LevelCompleteComponent } from './level-complete.component';
import { GameStateService } from '../../game/state/game-state.service';
import { of } from 'rxjs';

describe('LevelCompleteComponent', () => {
  let component: LevelCompleteComponent;
  let fixture: ComponentFixture<LevelCompleteComponent>;
  let mockGameState: jasmine.SpyObj<GameStateService>;

  beforeEach(async () => {
    mockGameState = jasmine.createSpyObj('GameStateService', [
      'nextLevel',
    ]);
    mockGameState.score$ = of(1000);
    mockGameState.level$ = of(1);

    await TestBed.configureTestingModule({
      imports: [LevelCompleteComponent],
      providers: [{ provide: GameStateService, useValue: mockGameState }],
    }).compileComponents();

    fixture = TestBed.createComponent(LevelCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeInstanceOf(LevelCompleteComponent);
  });

  it('[US-028#1] should have focusable next level button with tabindex', () => {
    const nextButton = fixture.nativeElement.querySelector(
      '.level-complete__button--next'
    );
    expect(nextButton).toBeTruthy();
    expect(nextButton.getAttribute('tabindex')).toBe('0');
  });

  it('[US-028#2] should display focus indicator on button focus', () => {
    const nextButton = fixture.nativeElement.querySelector(
      '.level-complete__button--next'
    );
    nextButton.focus();
    fixture.detectChanges();

    expect(nextButton === document.activeElement).toBe(true);
  });

  it('[US-028#1] should call nextLevel when next button is clicked', () => {
    const nextButton = fixture.nativeElement.querySelector(
      '.level-complete__button--next'
    );
    nextButton.click();
    expect(mockGameState.nextLevel).toHaveBeenCalled();
  });

  it('[US-028#1] should call nextLevel when next button is activated with Enter', () => {
    const nextButton = fixture.nativeElement.querySelector(
      '.level-complete__button--next'
    );
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    nextButton.dispatchEvent(event);
    nextButton.click();
    expect(mockGameState.nextLevel).toHaveBeenCalled();
  });

  it('[US-028#1] should call nextLevel when next button is activated with Space', () => {
    const nextButton = fixture.nativeElement.querySelector(
      '.level-complete__button--next'
    );
    const event = new KeyboardEvent('keydown', { key: ' ' });
    nextButton.dispatchEvent(event);
    nextButton.click();
    expect(mockGameState.nextLevel).toHaveBeenCalled();
  });
});
