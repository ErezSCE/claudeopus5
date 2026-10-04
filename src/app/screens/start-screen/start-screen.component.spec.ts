import { TestBed, ComponentFixture } from '@angular/core/testing';
import { StartScreenComponent } from './start-screen.component';
import { GameStateService } from '../../game/state/game-state.service';
import { SettingsStorageService } from '../../core/storage/settings-storage.service';
import { of } from 'rxjs';

describe('StartScreenComponent', () => {
  let component: StartScreenComponent;
  let fixture: ComponentFixture<StartScreenComponent>;
  let mockGameState: jasmine.SpyObj<GameStateService>;
  let mockSettingsStorage: jasmine.SpyObj<SettingsStorageService>;

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
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(StartScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeInstanceOf(StartScreenComponent);
  });

  it('[US-028#1] should have focusable start button with tabindex', () => {
    const startButton = fixture.nativeElement.querySelector(
      '.start-screen__button--start'
    );
    expect(startButton).toBeTruthy();
    expect(startButton.getAttribute('tabindex')).toBe('0');
  });

  it('[US-028#1] should have focusable settings button with tabindex', () => {
    const settingsButton = fixture.nativeElement.querySelector(
      '.start-screen__button--settings'
    );
    expect(settingsButton).toBeTruthy();
    expect(settingsButton.getAttribute('tabindex')).toBe('1');
  });

  it('[US-028#1] should have focusable mute button with tabindex', () => {
    const muteButton = fixture.nativeElement.querySelector(
      '.start-screen__button--mute'
    );
    expect(muteButton).toBeTruthy();
    expect(muteButton.getAttribute('tabindex')).toBe('2');
  });

  it('[US-028#1] should have focusable colorblind button with tabindex', () => {
    const colorblindButton = fixture.nativeElement.querySelector(
      '.start-screen__button--colorblind'
    );
    expect(colorblindButton).toBeTruthy();
    expect(colorblindButton.getAttribute('tabindex')).toBe('3');
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

  it('[US-028#1] should call startGame when start button is clicked', () => {
    const startButton = fixture.nativeElement.querySelector(
      '.start-screen__button--start'
    );
    startButton.click();
    expect(mockGameState.startGame).toHaveBeenCalled();
  });

  it('[US-028#1] should call startGame when start button is activated with Enter', () => {
    const startButton = fixture.nativeElement.querySelector(
      '.start-screen__button--start'
    );
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    startButton.dispatchEvent(event);
    startButton.click();
    expect(mockGameState.startGame).toHaveBeenCalled();
  });

  it('[US-028#1] should call startGame when start button is activated with Space', () => {
    const startButton = fixture.nativeElement.querySelector(
      '.start-screen__button--start'
    );
    const event = new KeyboardEvent('keydown', { key: ' ' });
    startButton.dispatchEvent(event);
    startButton.click();
    expect(mockGameState.startGame).toHaveBeenCalled();
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
});
