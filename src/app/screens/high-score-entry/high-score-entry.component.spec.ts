import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreStorageService } from '../../core/storage/score-storage.service';
import { GameStateService } from '../../game/state/game-state.service';
import { hasFocusVisibleRule, usesNaturalTabOrder } from '../../testing/a11y-helpers';
import { HighScoreEntryComponent } from './high-score-entry.component';

describe('HighScoreEntryComponent', () => {
  let fixture: ComponentFixture<HighScoreEntryComponent>;
  let gameState: jasmine.SpyObj<GameStateService>;
  let storage: ScoreStorageService;
  let root: HTMLElement;

  function inputs(): HTMLInputElement[] {
    return Array.from(root.querySelectorAll<HTMLInputElement>('.high-score-entry__input'));
  }

  function submitButton(): HTMLButtonElement {
    return root.querySelector<HTMLButtonElement>('.high-score-entry__button--submit')!;
  }

  function type(index: number, value: string): void {
    const input = inputs()[index];
    input.value = value;
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
  }

  function backspace(index: number): void {
    inputs()[index].dispatchEvent(new KeyboardEvent('keydown', { key: 'Backspace', bubbles: true }));
    fixture.detectChanges();
  }

  beforeEach(async () => {
    localStorage.clear();
    gameState = jasmine.createSpyObj<GameStateService>('GameStateService', ['goToStart']);
    await TestBed.configureTestingModule({
      imports: [HighScoreEntryComponent],
      providers: [{ provide: GameStateService, useValue: gameState }],
    }).compileComponents();
    storage = TestBed.inject(ScoreStorageService);
    fixture = TestBed.createComponent(HighScoreEntryComponent);
    fixture.componentInstance.score = 1200;
    root = fixture.nativeElement;
    document.body.appendChild(root);
    fixture.detectChanges();
  });

  afterEach(() => {
    root.remove();
    localStorage.clear();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('[US-027#1] submitting three initials persists exactly one entry', () => {
    type(0, 'a');
    type(1, 'b');
    type(2, 'c');
    const button = submitButton();
    button.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    button.click();
    button.click();
    const saved = storage.loadHighScores();
    expect(saved.length).toBe(1);
    expect(saved[0].initials).toBe('ABC');
    expect(saved[0].score).toBe(1200);
    expect(gameState.goToStart).toHaveBeenCalledTimes(1);
  });

  it('[US-027#1] submit stays disabled until all three letters are entered', () => {
    expect(submitButton().disabled).toBeTrue();
    type(0, 'A');
    type(1, 'B');
    expect(submitButton().disabled).toBeTrue();
    submitButton().click();
    expect(storage.loadHighScores().length).toBe(0);
    type(2, 'C');
    expect(submitButton().disabled).toBeFalse();
  });

  it('[US-027#1] backspace removes the letter so it is not saved', () => {
    type(0, 'A');
    type(1, 'B');
    type(2, 'C');
    backspace(2);
    expect(fixture.componentInstance.initials).toEqual(['A', 'B', '']);
    expect(submitButton().disabled).toBeTrue();
    backspace(2);
    expect(fixture.componentInstance.initials).toEqual(['A', '', '']);
    type(1, 'X');
    type(2, 'Y');
    submitButton().click();
    expect(storage.loadHighScores()[0].initials).toBe('AXY');
  });

  it('[US-027#1] non-letter characters are rejected', () => {
    type(0, '1');
    expect(fixture.componentInstance.initials[0]).toBe('');
    expect(inputs()[0].value).toBe('');
  });

  it('[US-028#1] typing a letter advances focus to the next initial, controls in natural tab order', () => {
    expect(usesNaturalTabOrder(root)).toBeTrue();
    inputs()[0].focus();
    type(0, 'Q');
    expect(document.activeElement).toBe(inputs()[1]);
  });

  it('[US-028#2] inputs and button have visible :focus-visible indicators', () => {
    expect(hasFocusVisibleRule('high-score-entry__input')).toBeTrue();
    expect(hasFocusVisibleRule('high-score-entry__button')).toBeTrue();
  });
});
