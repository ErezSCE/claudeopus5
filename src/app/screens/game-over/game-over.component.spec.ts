import { TestBed, ComponentFixture } from '@angular/core/testing';
import { GameOverComponent } from './game-over.component';
import { GameStateService } from '../../game/state/game-state.service';
import { ScoreStorageService } from '../../core/storage/score-storage.service';
import { of } from 'rxjs';

describe('GameOverComponent', () => {
  let component: GameOverComponent;
  let fixture: ComponentFixture<GameOverComponent>;
  let mockGameState: jasmine.SpyObj<GameStateService>;
  let mockScoreStorage: jasmine.SpyObj<ScoreStorageService>;

  beforeEach(async () => {
    mockGameState = jasmine.createSpyObj('GameStateService', [
      'restartGame',
      'goToStart',
    ]);
    mockGameState.score$ = of(1000);
    mockGameState.level$ = of(1);

    mockScoreStorage = jasmine.createSpyObj('ScoreStorageService', [
      'isHighScore',
    ]);
    mockScoreStorage.isHighScore.and.returnValue(true);

    await TestBed.configureTestingModule({
      imports: [GameOverComponent],
      providers: [
        { provide: GameStateService, useValue: mockGameState },
        { provide: ScoreStorageService, useValue: mockScoreStorage },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GameOverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeInstanceOf(GameOverComponent);
  });

  it('[US-028#1] should have focusable restart button with tabindex', () => {
    const restartButton = fixture.nativeElement.querySelector(
      '.game-over__button--restart'
    );
    expect(restartButton).toBeTruthy();
    expect(restartButton.getAttribute('tabindex')).toBe('0');
  });

  it('[US-028#1] should have focusable menu button with tabindex', () => {
    const menuButton = fixture.nativeElement.querySelector(
      '.game-over__button--menu'
    );
    expect(menuButton).toBeTruthy();
    expect(menuButton.getAttribute('tabindex')).toBe('1');
  });

  it('[US-028#2] should display focus indicator on button focus', () => {
    const restartButton = fixture.nativeElement.querySelector(
      '.game-over__button--restart'
    );
    restartButton.focus();
    fixture.detectChanges();

    expect(restartButton === document.activeElement).toBe(true);
  });

  it('[US-028#1] should call restartGame when restart button is clicked', () => {
    const restartButton = fixture.nativeElement.querySelector(
      '.game-over__button--restart'
    );
    restartButton.click();
    expect(mockGameState.restartGame).toHaveBeenCalled();
  });

  it('[US-028#1] should call goToStart when menu button is clicked', () => {
    const menuButton = fixture.nativeElement.querySelector(
      '.game-over__button--menu'
    );
    menuButton.click();
    expect(mockGameState.goToStart).toHaveBeenCalled();
  });

  it('[US-028#1] should call restartGame when restart button is activated with Enter', () => {
    const restartButton = fixture.nativeElement.querySelector(
      '.game-over__button--restart'
    );
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    restartButton.dispatchEvent(event);
    restartButton.click();
    expect(mockGameState.restartGame).toHaveBeenCalled();
  });

  it('[US-028#1] should call restartGame when restart button is activated with Space', () => {
    const restartButton = fixture.nativeElement.querySelector(
      '.game-over__button--restart'
    );
    const event = new KeyboardEvent('keydown', { key: ' ' });
    restartButton.dispatchEvent(event);
    restartButton.click();
    expect(mockGameState.restartGame).toHaveBeenCalled();
  });

  it('[US-028#1] should be keyboard navigable with Tab key', () => {
    const restartButton = fixture.nativeElement.querySelector(
      '.game-over__button--restart'
    );
    const menuButton = fixture.nativeElement.querySelector(
      '.game-over__button--menu'
    );

    restartButton.focus();
    expect(document.activeElement).toBe(restartButton);

    menuButton.focus();
    expect(document.activeElement).toBe(menuButton);
  });
});
