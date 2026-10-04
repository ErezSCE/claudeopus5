import { TestBed } from '@angular/core/testing';
import { PauseOverlayComponent } from './pause-overlay.component';

describe('PauseOverlayComponent', () => {
  it('should create', () => {
    TestBed.configureTestingModule({ imports: [PauseOverlayComponent] });
    const fixture = TestBed.createComponent(PauseOverlayComponent);
    expect(fixture.componentInstance).toBeInstanceOf(PauseOverlayComponent);
  });
});
