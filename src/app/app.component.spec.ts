import { TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';

describe('AppComponent (shell scaffold)', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [AppComponent] }).compileComponents();
  });

  it('[US-035#1] app shell boots on the start screen', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const shell: HTMLElement | null = fixture.nativeElement.querySelector('main.app-shell');
    expect(fixture.componentInstance.screen).toBe('start');
    expect(shell?.getAttribute('data-screen')).toBe('start');
  });

  it('[US-035#2] app shell instantiates standalone with no extra module providers', () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance).toBeInstanceOf(AppComponent);
  });
});
