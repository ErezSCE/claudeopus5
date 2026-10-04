import { TestBed } from '@angular/core/testing';
import { GameOverComponent } from './game-over.component';

describe('GameOverComponent', () => {
  it('should create', () => {
    TestBed.configureTestingModule({ imports: [GameOverComponent] });
    const fixture = TestBed.createComponent(GameOverComponent);
    expect(fixture.componentInstance).toBeInstanceOf(GameOverComponent);
  });
});
