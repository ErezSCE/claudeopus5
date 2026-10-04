import { TestBed } from '@angular/core/testing';
import { HudComponent } from './hud.component';

describe('HudComponent', () => {
  it('should create', () => {
    TestBed.configureTestingModule({ imports: [HudComponent] });
    const fixture = TestBed.createComponent(HudComponent);
    expect(fixture.componentInstance).toBeInstanceOf(HudComponent);
  });
});
