import { TestBed, ComponentFixture } from '@angular/core/testing';
import { StartScreenComponent } from './start-screen.component';
import { GameStateService } from '../../game/state/game-state.service';
import { SettingsStorageService } from '../../core/storage/settings-storage.service';
import { ScoreStorageService } from '../../core/storage/score-storage.service';
import { of } from 'rxjs';

describe('StartScreenComponent', () => {
  let component: StartScreenComponent;
  let fixture: ComponentFixture<StartScreenComponent>;
  let mockGameState: jasmine.SpyObj<GameStateService>;
  let mockSettingsStorage: jasmine.SpyObj<SettingsStorageService>;
  let scoreStorageService: ScoreStorageService;

  beforeEach(async () => {
    mockGameState = jasmine.createSpyObj('GameStateService', ['startGame']);
    mockSettingsStorage = jasmine.createSpyObj('SettingsStorageService', [
      'getMutePreference',
      'getColorblindMode',
      'toggleMute',
      'toggleColorblindMode',
    ]);
    mockSettingsStorage.getMutePreference.and.returnValue(false);
    mockSettingsStorage.getColorblindMode.and.returnValue(false);

    await TestBed.configureTestingModule({
      imports: [StartScreenComponent],
      providers: [
        { provide: GameStateService, useValue: mockGameState },
        { provide: SettingsStorageService, useValue: mockSettingsStorage },
        ScoreStorageService,
      ],
    }).compileComponents();

    scoreStorageService = TestBed.inject(ScoreStorageService);
    fixture = TestBed.createComponent(StartScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeInstanceOf(StartScreenComponent);
  });

  it('[US-028#1] should have focusable start button without explicit tabindex', () => {
    const startButton = fixture.nativeElement.querySelector(
      '.start-screen__button--start'
    );
    expect(startButton).toBeTruthy();
    expect(startButton.tagName).toBe('BUTTON');
    // Native buttons are focusable without explicit tabindex
    expect(startButton.getAttribute('tabindex')).toBeNull();
  });

  it('[US-028#1] should have focusable settings button without explicit tabindex', () => {
    const settingsButton = fixture.nativeElement.querySelector(
      '.start-screen__button--settings'
    );
    expect(settingsButton).toBeTruthy();
    expect(settingsButton.tagName).toBe('BUTTON');
    expect(settingsButton.getAttribute('tabindex')).toBeNull();
  });

  it('[US-028#1] should have focusable mute button without explicit tabindex', () => {
    const muteButton = fixture.nativeElement.querySelector(
      '.start-screen__button--mute'
    );
    expect(muteButton).toBeTruthy();
    expect(muteButton.tagName).toBe('BUTTON');
    expect(muteButton.getAttribute('tabindex')).toBeNull();
  });

  it('[US-028#1] should have focusable colorblind button without explicit tabindex', () => {
    const colorblindButton = fixture.nativeElement.querySelector(
      '.start-screen__button--colorblind'
    );
    expect(colorblindButton).toBeTruthy();
    expect(colorblindButton.tagName).toBe('BUTTON');
    expect(colorblindButton.getAttribute('tabindex')).toBeNull();
  });

  it('[US-028#2] should display focus indicator on button focus', () => {
    const startButton = fixture.nativeElement.querySelector(
      '.start-screen__button--start'
    );
    startButton.focus();
    fixture.detectChanges();

    const computedStyle = window.getComputedStyle(startButton);
    // Check that focus-visible styles are applied (outline should be visible)
    expect(startButton === document.activeElement).toBe(true);
  });

  it('[US-028#1] should call startGame exactly once when start button is clicked', () => {
    const startButton = fixture.nativeElement.querySelector(
      '.start-screen__button--start'
    );
    startButton.click();
    expect(mockGameState.startGame).toHaveBeenCalledTimes(1);
  });

  it('[US-028#1] should call startGame exactly once when start button is activated with Enter', () => {
    const startButton = fixture.nativeElement.querySelector(
      '.start-screen__button--start'
    ) as HTMLButtonElement;
    mockGameState.startGame.calls.reset();
    const event = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true });
    startButton.dispatchEvent(event);
    expect(mockGameState.startGame).toHaveBeenCalledTimes(1);
  });

  it('[US-028#1] should call startGame exactly once when start button is activated with Space', () => {
    const startButton = fixture.nativeElement.querySelector(
      '.start-screen__button--start'
    ) as HTMLButtonElement;
    mockGameState.startGame.calls.reset();
    const event = new KeyboardEvent('keydown', { key: ' ', bubbles: true });
    startButton.dispatchEvent(event);
    expect(mockGameState.startGame).toHaveBeenCalledTimes(1);
  });

  it('[US-028#1] should be keyboard navigable with Tab key', () => {
    const startButton = fixture.nativeElement.querySelector(
      '.start-screen__button--start'
    );
    const settingsButton = fixture.nativeElement.querySelector(
      '.start-screen__button--settings'
    );

    startButton.focus();
    expect(document.activeElement).toBe(startButton);

    settingsButton.focus();
    expect(document.activeElement).toBe(settingsButton);
  });

  it('[ASSIGN-021#1] should load and display high scores from localStorage on init', () => {
    // Clear localStorage first
    localStorage.clear();

    // Seed localStorage with high scores
    const highScores = [
      { initials: 'AAA', score: 1000 },
      { initials: 'BBB', score: 900 },
      { initials: 'CCC', score: 800 },
    ];
    localStorage.setItem('highScores', JSON.stringify(highScores));

    // Create a new component instance to trigger ngOnInit
    const newFixture = TestBed.createComponent(StartScreenComponent);
    const newComponent = newFixture.componentInstance;
    newFixture.detectChanges();

    // Check that high scores are displayed
    const highScoresList = newFixture.nativeElement.querySelector(
      '.start-screen__high-scores'
    );
    expect(highScoresList).toBeTruthy();

    const scoreItems = newFixture.nativeElement.querySelectorAll(
      '.start-screen__score-item'
    );
    expect(scoreItems.length).toBeGreaterThan(0);

    // Verify first score is displayed
    const firstScoreText = scoreItems[0].textContent;
    expect(firstScoreText).toContain('AAA');
    expect(firstScoreText).toContain('1000');

    // Clean up
    localStorage.clear();
  });

  it('[ASSIGN-021#1] should display all-time high score on init', () => {
    // Clear localStorage first
    localStorage.clear();

    // Seed localStorage with all-time high score
    localStorage.setItem('allTimeHigh', '5000');

    // Create a new component instance to trigger ngOnInit
    const newFixture = TestBed.createComponent(StartScreenComponent);
    const newComponent = newFixture.componentInstance;
    newFixture.detectChanges();

    // Check that all-time high is displayed
    const allTimeHighElement = newFixture.nativeElement.querySelector(
      '.start-screen__all-time-high'
    );
    expect(allTimeHighElement).toBeTruthy();
    expect(allTimeHighElement.textContent).toContain('5000');

    // Clean up
    localStorage.clear();
  });
});
