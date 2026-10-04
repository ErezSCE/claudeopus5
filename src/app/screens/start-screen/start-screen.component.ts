// [STUB]
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ScoreStorageService } from '../../core/storage/score-storage.service';
import { HighScoreEntry } from '../../shared/types';

/**
 * Start screen component (MOD-START-SCREEN).
 * Scaffold stub: displays the start screen and transitions to countdown on input.
 * Integrates with ScoreStorageService to load and display high scores.
 */
@Component({
  selector: 'app-start-screen',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div class="start-screen">Start Screen Stub</div>`,
  styles: [
    `
      .start-screen {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
      }
    `,
  ],
})
export class StartScreenComponent implements OnInit {
  highScores: HighScoreEntry[] = [];
  allTimeHigh: number = 0;

  constructor(private scoreStorage: ScoreStorageService) {}

  ngOnInit(): void {
    // Load high scores and all-time high on component initialization
    this.highScores = this.scoreStorage.loadHighScores();
    this.allTimeHigh = this.scoreStorage.loadAllTimeHigh();
  }
}
