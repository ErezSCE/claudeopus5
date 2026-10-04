import { TestBed } from '@angular/core/testing';
import { StartScreenComponent } from './start-screen.component';

describe('StartScreenComponent', () => {
  it('should create', () => {
    TestBed.configureTestingModule({ imports: [StartScreenComponent] });
    const fixture = TestBed.createComponent(StartScreenComponent);
    expect(fixture.componentInstance).toBeInstanceOf(StartScreenComponent);
  });
});
