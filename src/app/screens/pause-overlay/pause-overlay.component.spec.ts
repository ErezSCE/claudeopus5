import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameStateService } from '../../game/state/game-state.service';
import { hasFocusVisibleRule, usesNaturalTabOrder } from '../../testing/a11y-helpers';
import { PauseOverlayComponent } from './pause-overlay.component';

describe('PauseOverlayComponent', () => {
  let fixture: ComponentFixture<PauseOverlayComponent>;
  let gameState: jasmine.SpyObj<GameStateService>;
  let root: HTMLElement;

  beforeEach(async () => {
    gameState = jasmine.createSpyObj<GameStateService>('GameStateService', ['resumeGame', 'restartGame']);
    await TestBed.configureTestingModule({
      imports: [PauseOverlayComponent],
      providers: [{ provide: GameStateService, useValue: gameState }],
    }).compileComponents();
    fixture = TestBed.createComponent(PauseOverlayComponent);
    root = fixture.nativeElement;
    document.body.appendChild(root);
    fixture.detectChanges();
  });

  afterEach(() => root.remove());

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('[US-028#1] resume comes before restart in natural tab order', () => {
    expect(usesNaturalTabOrder(root)).toBeTrue();
    const buttons = root.querySelectorAll('button');
    expect(buttons[0].classList).toContain('pause-overlay__button--resume');
    expect(buttons[1].classList).toContain('pause-overlay__button--restart');
  });

  it('[US-028#1] keyboard activation of resume calls resumeGame exactly once', () => {
    const button = root.querySelector<HTMLButtonElement>('.pause-overlay__button--resume')!;
    button.focus();
    button.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    button.click();
    expect(document.activeElement).toBe(button);
    expect(gameState.resumeGame).toHaveBeenCalledTimes(1);
  });

  it('[US-028#1] activating restart calls restartGame exactly once', () => {
    root.querySelector<HTMLButtonElement>('.pause-overlay__button--restart')!.click();
    expect(gameState.restartGame).toHaveBeenCalledTimes(1);
  });

  it('[US-028#2] buttons have a visible :focus-visible indicator', () => {
    expect(hasFocusVisibleRule('pause-overlay__button')).toBeTrue();
  });
});
