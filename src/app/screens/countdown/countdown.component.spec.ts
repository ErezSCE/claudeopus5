import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CountdownComponent } from './countdown.component';
import { GameStateService } from '../../game/state/game-state.service';
import { of } from 'rxjs';

describe('CountdownComponent', () => {
  let component: CountdownComponent;
  let fixture: ComponentFixture<CountdownComponent>;
  let mockGameState: jasmine.SpyObj<GameStateService>;

  beforeEach(async () => {
    mockGameState = jasmine.createSpyObj('GameStateService', []);
    mockGameState.level$ = of(1);

    await TestBed.configureTestingModule({
      imports: [CountdownComponent],
      providers: [{ provide: GameStateService, useValue: mockGameState }],
    }).compileComponents();

    fixture = TestBed.createComponent(CountdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeInstanceOf(CountdownComponent);
  });

  it('[US-028#1] should display countdown message', () => {
    const message = fixture.nativeElement.querySelector('.countdown__message');
    expect(message).toBeTruthy();
    expect(message.textContent).toContain('Get Ready');
  });
});
