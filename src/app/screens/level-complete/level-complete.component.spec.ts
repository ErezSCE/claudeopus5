import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameStateService } from '../../game/state/game-state.service';
import { hasFocusVisibleRule, usesNaturalTabOrder } from '../../testing/a11y-helpers';
import { LevelCompleteComponent } from './level-complete.component';

describe('LevelCompleteComponent', () => {
  let fixture: ComponentFixture<LevelCompleteComponent>;
  let gameState: jasmine.SpyObj<GameStateService>;
  let root: HTMLElement;

  beforeEach(async () => {
    gameState = jasmine.createSpyObj<GameStateService>('GameStateService', ['nextLevel']);
    await TestBed.configureTestingModule({
      imports: [LevelCompleteComponent],
      providers: [{ provide: GameStateService, useValue: gameState }],
    }).compileComponents();
    fixture = TestBed.createComponent(LevelCompleteComponent);
    root = fixture.nativeElement;
    document.body.appendChild(root);
    fixture.detectChanges();
  });

  afterEach(() => root.remove());

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('[US-028#1] next-level button is keyboard focusable and activates exactly once', () => {
    expect(usesNaturalTabOrder(root)).toBeTrue();
    const button = root.querySelector<HTMLButtonElement>('.level-complete__button')!;
    button.focus();
    expect(document.activeElement).toBe(button);
    button.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
    button.click();
    expect(gameState.nextLevel).toHaveBeenCalledTimes(1);
  });

  it('[US-028#2] button has a visible :focus-visible indicator', () => {
    expect(hasFocusVisibleRule('level-complete__button')).toBeTrue();
  });
});
