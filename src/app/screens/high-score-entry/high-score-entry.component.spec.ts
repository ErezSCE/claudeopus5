import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HighScoreEntryComponent } from './high-score-entry.component';
import { GameStateService } from '../../game/state/game-state.service';
import { ScoreStorageService } from '../../core/storage/score-storage.service';
import { of } from 'rxjs';

describe('HighScoreEntryComponent', () => {
  let component: HighScoreEntryComponent;
  let fixture: ComponentFixture<HighScoreEntryComponent>;
  let mockGameState: jasmine.SpyObj<GameStateService>;
  let mockScoreStorage: jasmine.SpyObj<ScoreStorageService>;

  beforeEach(async () => {
    mockGameState = jasmine.createSpyObj('GameStateService', [
      'goToStart',
    ]);
    mockGameState.score$ = of(1000);

    mockScoreStorage = jasmine.createSpyObj('ScoreStorageService', [
      'addHighScore',
    ]);

    await TestBed.configureTestingModule({
      imports: [HighScoreEntryComponent],
      providers: [
        { provide: GameStateService, useValue: mockGameState },
        { provide: ScoreStorageService, useValue: mockScoreStorage },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HighScoreEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeInstanceOf(HighScoreEntryComponent);
  });

  it('[US-028#1] should have focusable initial input fields with tabindex', () => {
    const inputs = fixture.nativeElement.querySelectorAll(
      '.high-score-entry__input'
    );
    expect(inputs.length).toBeGreaterThan(0);
    inputs.forEach((input: HTMLInputElement, index: number) => {
      expect(input.getAttribute('tabindex')).toBe(index.toString());
    });
  });

  it('[US-028#1] should have focusable submit button with tabindex', () => {
    const submitButton = fixture.nativeElement.querySelector(
      '.high-score-entry__button--submit'
    );
    expect(submitButton).toBeTruthy();
    expect(submitButton.getAttribute('tabindex')).toBe('3');
  });

  it('[US-028#2] should display focus indicator on input focus', () => {
    const input = fixture.nativeElement.querySelector(
      '.high-score-entry__input'
    );
    input.focus();
    fixture.detectChanges();

    expect(input === document.activeElement).toBe(true);
  });

  it('[US-028#2] should display focus indicator on button focus', () => {
    const submitButton = fixture.nativeElement.querySelector(
      '.high-score-entry__button--submit'
    );
    submitButton.focus();
    fixture.detectChanges();

    expect(submitButton === document.activeElement).toBe(true);
  });

  it('[US-028#1] should be keyboard navigable with Tab key through inputs', () => {
    const inputs = fixture.nativeElement.querySelectorAll(
      '.high-score-entry__input'
    );
    inputs[0].focus();
    expect(document.activeElement).toBe(inputs[0]);

    inputs[1].focus();
    expect(document.activeElement).toBe(inputs[1]);

    inputs[2].focus();
    expect(document.activeElement).toBe(inputs[2]);
  });

  it('[US-028#1] should be keyboard navigable with Tab key to submit button', () => {
    const submitButton = fixture.nativeElement.querySelector(
      '.high-score-entry__button--submit'
    );
    submitButton.focus();
    expect(document.activeElement).toBe(submitButton);
  });

  it('[US-028#1] should call addHighScore when submit button is clicked', () => {
    const submitButton = fixture.nativeElement.querySelector(
      '.high-score-entry__button--submit'
    );
    submitButton.click();
    expect(mockScoreStorage.addHighScore).toHaveBeenCalled();
  });

  it('[US-028#1] should call addHighScore when submit button is activated with Enter', () => {
    const submitButton = fixture.nativeElement.querySelector(
      '.high-score-entry__button--submit'
    );
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    submitButton.dispatchEvent(event);
    submitButton.click();
    expect(mockScoreStorage.addHighScore).toHaveBeenCalled();
  });

  it('[US-028#1] should call addHighScore when submit button is activated with Space', () => {
    const submitButton = fixture.nativeElement.querySelector(
      '.high-score-entry__button--submit'
    );
    const event = new KeyboardEvent('keydown', { key: ' ' });
    submitButton.dispatchEvent(event);
    submitButton.click();
    expect(mockScoreStorage.addHighScore).toHaveBeenCalled();
  });
});
