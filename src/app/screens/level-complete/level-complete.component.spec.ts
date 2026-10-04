import { TestBed } from '@angular/core/testing';
import { LevelCompleteComponent } from './level-complete.component';

describe('LevelCompleteComponent', () => {
  it('should create', () => {
    TestBed.configureTestingModule({ imports: [LevelCompleteComponent] });
    const fixture = TestBed.createComponent(LevelCompleteComponent);
    expect(fixture.componentInstance).toBeInstanceOf(LevelCompleteComponent);
  });
});
