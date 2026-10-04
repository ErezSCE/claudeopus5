import { TestBed } from '@angular/core/testing';
import { HighScoreEntryComponent } from './high-score-entry.component';

describe('HighScoreEntryComponent', () => {
  it('should create', () => {
    TestBed.configureTestingModule({ imports: [HighScoreEntryComponent] });
    const fixture = TestBed.createComponent(HighScoreEntryComponent);
    expect(fixture.componentInstance).toBeInstanceOf(HighScoreEntryComponent);
  });
});
