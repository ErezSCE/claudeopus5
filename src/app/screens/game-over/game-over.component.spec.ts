import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreStorageService } from '../../core/storage/score-storage.service';
import { GameStateService } from '../../game/state/game-state.service';
import { hasFocusVisibleRule, usesNaturalTabOrder } from '../../testing/a11y-helpers';
import { GameOverComponent } from './game-over.component';

describe('GameOverComponent', () => {
  let fixture: ComponentFixture<GameOverComponent>;
  let gameState: jasmine.SpyObj<GameStateService>;
  let root: HTMLElement;

  function create(score: number): void {
    fixture = TestBed.createComponent(GameOverComponent);
    fixture.componentInstance.score = score;
    root = fixture.nativeElement;
    document.body.appendChild(root);
    fixture.detectChanges();
  }

  beforeEach(async () => {
    localStorage.clear();
    gameState = jasmine.createSpyObj<GameStateService>('GameStateService', [
      'setScreen',
      'setScore',
      'restartGame',
      'goToStart',
    ]);
    await TestBed.configureTestingModule({
      imports: [GameOverComponent],
      providers: [{ provide: GameStateService, useValue: gameState }],
    }).compileComponents();
  });

  afterEach(() => {
    root?.remove();
    localStorage.clear();
  });

  it('should create', () => {
    create(0);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('[US-027#1] a qualifying score is routed to high-score entry with the score', () => {
    create(1500);
    expect(gameState.setScore).toHaveBeenCalledWith(1500);
    expect(gameState.setScreen).toHaveBeenCalledWith('high-score-entry');
  });

  it('[US-027#1] a non-qualifying score stays on game over', () => {
    const storage = TestBed.inject(ScoreStorageService);
    for (let i = 0; i < 10; i++) {
      storage.saveHighScore({ initials: String.fromCharCode(65 + i).repeat(3), score: 5000 - i * 100 });
    }
    create(100);
    expect(gameState.setScreen).not.toHaveBeenCalled();
  });

  it('[US-027#1] a zero score never goes to initials entry', () => {
    create(0);
    expect(gameState.setScreen).not.toHaveBeenCalled();
  });

  it('[US-028#1] buttons follow natural tab order and each activates exactly once', () => {
    create(0);
    expect(usesNaturalTabOrder(root)).toBeTrue();
    const restart = root.querySelector<HTMLButtonElement>('.game-over__button--restart')!;
    const menu = root.querySelector<HTMLButtonElement>('.game-over__button--menu')!;
    restart.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    restart.click();
    menu.click();
    expect(gameState.restartGame).toHaveBeenCalledTimes(1);
    expect(gameState.goToStart).toHaveBeenCalledTimes(1);
  });

  it('[US-028#2] buttons have a visible :focus-visible indicator', () => {
    create(0);
    expect(hasFocusVisibleRule('game-over__button')).toBeTrue();
  });
});
