import { TestBed } from '@angular/core/testing';
import { GameplayComponent } from './gameplay.component';

describe('GameplayComponent', () => {
  it('should create', () => {
    TestBed.configureTestingModule({ imports: [GameplayComponent] });
    const fixture = TestBed.createComponent(GameplayComponent);
    expect(fixture.componentInstance).toBeInstanceOf(GameplayComponent);
  });
});
