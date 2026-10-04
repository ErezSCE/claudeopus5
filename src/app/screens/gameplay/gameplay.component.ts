import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameEngineService } from '../../game/engine/game-engine.service';
import { InputService } from '../../game/input/input.service';
import { RendererService } from '../../game/render/renderer.service';
import { HudComponent } from './hud/hud.component';
import { TouchControlsComponent } from './touch-controls/touch-controls.component';

/**
 * Gameplay component (MOD-GAMEPLAY).
 *
 * Hosts the canvas element, manages the game loop, and integrates input handling.
 * - Binds the canvas to the RendererService
 * - Registers the canvas for touch/swipe input with InputService
 * - Binds the direction stream from InputService to the GameEngineService
 * - Renders the HUD and touch controls
 */
@Component({
  selector: 'app-gameplay',
  standalone: true,
  imports: [CommonModule, HudComponent, TouchControlsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="gameplay">
      <canvas #gameCanvas class="game-canvas"></canvas>
      <app-hud></app-hud>
      <app-touch-controls></app-touch-controls>
    </div>
  `,
  styles: [
    `
      .gameplay {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
      }

      .game-canvas {
        border: 1px solid #ccc;
        background-color: #000;
        image-rendering: pixelated;
        image-rendering: crisp-edges;
      }
    `,
  ],
})
export class GameplayComponent implements OnInit, OnDestroy {
  @ViewChild('gameCanvas', { static: false }) gameCanvasRef!: ElementRef<HTMLCanvasElement>;

  constructor(
    private readonly gameEngine: GameEngineService,
    private readonly inputService: InputService,
    private readonly renderer: RendererService
  ) {}

  ngOnInit(): void {
    // Canvas will be available after view initialization
    // We'll set it up in ngAfterViewInit
  }

  ngAfterViewInit(): void {
    if (this.gameCanvasRef) {
      const canvas = this.gameCanvasRef.nativeElement;

      // Initialize the renderer with the canvas
      this.renderer.setCanvas(canvas);

      // Register the canvas for touch/swipe input
      this.inputService.registerTouchElement(canvas);

      // Bind the direction stream to the game engine
      this.gameEngine.bindDirectionStream(this.inputService.direction$);

      // Start the game engine
      this.gameEngine.start();
    }
  }

  ngOnDestroy(): void {
    this.gameEngine.stop();
    this.inputService.unregisterTouchElement();
  }
}
