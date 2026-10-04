import { TestBed } from '@angular/core/testing';
import { CountdownComponent } from './countdown.component';

describe('CountdownComponent', () => {
  it('should create', () => {
    TestBed.configureTestingModule({ imports: [CountdownComponent] });
    const fixture = TestBed.createComponent(CountdownComponent);
    expect(fixture.componentInstance).toBeInstanceOf(CountdownComponent);
  });
});
