import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsStorageService } from '../../core/storage/settings-storage.service';
import { GameStateService } from '../../game/state/game-state.service';
import { hasFocusVisibleRule, usesNaturalTabOrder } from '../../testing/a11y-helpers';
import { StartScreenComponent } from './start-screen.component';

describe('StartScreenComponent', () => {
  let fixture: ComponentFixture<StartScreenComponent>;
  let gameState: jasmine.SpyObj<GameStateService>;
  let root: HTMLElement;

  function create(): void {
    fixture = TestBed.createComponent(StartScreenComponent);
    root = fixture.nativeElement;
    document.body.appendChild(root);
    fixture.detectChanges();
  }

  beforeEach(async () => {
    localStorage.clear();
    gameState = jasmine.createSpyObj<GameStateService>('GameStateService', ['startGame']);
    await TestBed.configureTestingModule({
      imports: [StartScreenComponent],
      providers: [{ provide: GameStateService, useValue: gameState }],
    }).compileComponents();
  });

  afterEach(() => {
    root?.remove();
    localStorage.clear();
  });

  it('should create', () => {
    create();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('[US-027#1] re-reads saved top-10 scores from localStorage on load and renders them', () => {
    localStorage.setItem(
      'pacman_high_scores',
      JSON.stringify([
        { initials: 'AAA', score: 2000, createdAt: '2024-01-01T00:00:00Z' },
        { initials: 'BBB', score: 1000, createdAt: '2024-01-02T00:00:00Z' },
      ]),
    );
    create();
    const rows = root.querySelectorAll('.start-screen__score-row');
    expect(rows.length).toBe(2);
    expect(rows[0].textContent).toContain('AAA');
    expect(rows[0].textContent).toContain('2000');
    expect(rows[1].textContent).toContain('BBB');
  });

  it('[US-027#1] displays the persisted all-time high score on load', () => {
    localStorage.setItem('pacman_all_time_high', '4321');
    create();
    expect(root.querySelector('.start-screen__all-time-value')?.textContent).toContain('4321');
  });

  it('[US-027#1] shows an empty-state message when no scores are saved', () => {
    create();
    expect(root.querySelector('.start-screen__no-scores')).toBeTruthy();
  });

  it('[US-028#1] controls follow natural DOM tab order with no tabindex overrides', () => {
    create();
    expect(usesNaturalTabOrder(root)).toBeTrue();
    const buttons = root.querySelectorAll<HTMLButtonElement>('button');
    buttons[0].focus();
    expect(document.activeElement).toBe(buttons[0]);
  });

  it('[US-028#1] Enter/Space activation (native click) calls startGame exactly once', () => {
    create();
    const button = root.querySelector<HTMLButtonElement>('.start-screen__button--start')!;
    button.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    button.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
    button.click();
    expect(gameState.startGame).toHaveBeenCalledTimes(1);
  });

  it('[US-028#2] buttons have a visible :focus-visible indicator', () => {
    create();
    expect(hasFocusVisibleRule('start-screen__button')).toBeTrue();
  });

  it('[US-029#1] colorblind toggle switches and persists the preference immediately', () => {
    create();
    const settings = TestBed.inject(SettingsStorageService);
    const toggle = root.querySelector<HTMLButtonElement>('.start-screen__button--colorblind')!;
    const before = settings.isColorblindModeEnabled();
    toggle.click();
    fixture.detectChanges();
    expect(settings.isColorblindModeEnabled()).toBe(!before);
    expect(settings.loadSettings().colorblindMode).toBe(!before);
    expect(toggle.getAttribute('aria-pressed')).toBe(String(!before));
  });
});
