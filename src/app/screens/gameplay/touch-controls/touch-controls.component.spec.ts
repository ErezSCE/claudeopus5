import { TestBed } from '@angular/core/testing';
import { TouchControlsComponent } from './touch-controls.component';

describe('TouchControlsComponent', () => {
  it('should create', () => {
    TestBed.configureTestingModule({ imports: [TouchControlsComponent] });
    const fixture = TestBed.createComponent(TouchControlsComponent);
    expect(fixture.componentInstance).toBeInstanceOf(TouchControlsComponent);
  });
});
