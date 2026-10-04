import { TestBed } from '@angular/core/testing';

import { usesNaturalTabOrder } from '../../testing/a11y-helpers';
import { CountdownComponent } from './countdown.component';

describe('CountdownComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [CountdownComponent] }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(CountdownComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('[US-028#1] displays the countdown in a live region with no tab traps', () => {
    const fixture = TestBed.createComponent(CountdownComponent);
    fixture.componentInstance.count = 2;
    fixture.detectChanges();
    const root: HTMLElement = fixture.nativeElement;
    expect(root.querySelector('[role="status"]')?.textContent).toContain('2');
    expect(usesNaturalTabOrder(root)).toBeTrue();
  });
});
