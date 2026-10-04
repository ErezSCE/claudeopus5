# Product Manager Mission Report

**Agent**: product-manager  
**Generated**: 2026-10-04T14:49:52.739Z

---

## User Stories (35)

### US-001: As a player, I want to see the maze (walls, corridors, dots, power pellets, tunnel, ghost house) rendered on screen
- So that: I can see where I'm navigating
- AC: The maze walls, corridors, dots, power pellets, tunnel openings, and ghost house are all visibly rendered on the canvas matching the MAZE_LAYOUT data.; The maze renders correctly across supported browsers (Chrome, Firefox, Safari, Edge) without visual artifacts.
### US-002: As a player, I want the game loop to run at a fixed 60fps timestep
- So that: gameplay feels smooth and consistent regardless of device
- AC: The game loop updates entity positions at a fixed timestep independent of variable frame rate, verified via logged update counts over a timed interval.; The game maintains steady 60fps rendering on desktop without dropped frames under normal load.
### US-003: As a player, I want to move Pac-Man using arrow keys or WASD
- So that: I can control him on desktop
- AC: Pressing arrow keys or WASD changes Pac-Man's direction stream within one animation frame.; Pac-Man moves in the chosen direction only when not blocked by a wall tile.
### US-004: As a player, I want Pac-Man's mouth to animate and face his direction of travel
- So that: movement feels like the classic chomping Pac-Man
- AC: Pac-Man's mouth animation cycles open/closed while moving and freezes when stationary.; Pac-Man's sprite orientation visually matches his current direction of travel (up/down/left/right).
### US-005: As a player, I want Pac-Man to stop at walls and continue in his last chosen direction otherwise
- So that: movement feels correct and predictable
- AC: Pac-Man continues moving in his last direction until blocked by a wall tile.; Pac-Man stops exactly at the wall boundary without passing through or jittering.
### US-006: As a player, I want each ghost to have a distinct chase behavior
- So that: the game is strategically varied and feels like the original arcade game
- AC: blinkyTarget returns Pac-Man's current tile as the direct-chase target.; pinkyTarget returns a tile ahead of Pac-Man's facing direction, inkyTarget computes a flanking tile using Blinky+Pac-Man vectors, and clydeTarget switches between chase and scatter-corner target based on a distance threshold.
### US-007: As a player, I want ghosts to alternate between chasing and scattering on a timer
- So that: there are moments of respite from being chased
- AC: Ghosts switch from chase to scatter mode (and back) according to the current level's configured timer sequence.; During scatter mode, ghosts target their assigned maze corner instead of Pac-Man's position.
### US-008: As a player, I want ghosts to leave the ghost house one at a time with short delays
- So that: the opening sequence matches the original game's pacing
- AC: At level start, only one ghost is released from the ghost house initially while the others remain inside.; Remaining ghosts release sequentially after their configured delays, verified by timestamped release events.
### US-009: As a player, I want ghosts to become scared when I eat a power pellet
- So that: I have a window of opportunity to eat them for points
- AC: Eating a power pellet changes all four ghosts to the scared visual state and behavior within the same frame.; Scared ghosts immediately reverse their current direction and move at a reduced speed.
### US-010: As a player, I want scared ghosts to flash during the last two seconds of the scared state
- So that: I get a warning that the power pellet effect is ending
- AC: During the final 2 seconds of scared duration, ghosts visually flash between scared and normal-adjacent colors.; Flashing stops and ghosts revert to normal AI behavior exactly when the scared duration elapses.
### US-011: As a player, I want eaten scared ghosts to become eyes and return to the ghost house
- So that: they respawn correctly and I understand the eaten-ghost mechanic
- AC: When Pac-Man touches a scared ghost, the ghost becomes the 'eyes' state and can no longer harm Pac-Man.; The eyes-state ghost pathfinds back to the ghost house, then regenerates to normal state and re-releases.
### US-012: As a player, I want escalating points for eating multiple ghosts in a row during one power pellet
- So that: I'm rewarded for chaining ghost kills
- AC: The first ghost eaten during a single power-pellet window awards 200 points, the second 400, the third 800, and the fourth 1600.; The escalation counter resets to 200 once a new power pellet is eaten.
### US-013: As a player, I want to see my score update as I eat dots, pellets, ghosts, and fruit
- So that: I can track my progress during play
- AC: Eating a dot adds 10 points and a power pellet adds 50 points, displayed immediately in the HUD.; Collecting bonus fruit adds the level-specific point value to the displayed score.
### US-014: As a player, I want to lose a life with a brief death animation when caught by a non-scared ghost
- So that: there is risk and the level resets fairly
- AC: Contact with a non-scared ghost triggers a death animation and decrements the lives counter by 1.; After the death animation, the level resets with Pac-Man and ghosts in starting positions while previously eaten dots remain eaten.
### US-015: As a player, I want to earn an extra life at 10,000 points
- So that: I'm rewarded for skilled, high-scoring play
- AC: When the player's score first crosses 10,000 points, lives increments by 1 and an extra-life sound plays.; The extra life is awarded only once per 10,000-point threshold crossing.
### US-016: As a player, I want bonus fruit to appear near the ghost house after ~70 and ~170 dots eaten
- So that: I can collect it for bonus points
- AC: A bonus fruit appears near the ghost house after approximately 70 dots eaten in the level, and a second after approximately 170 dots eaten.; The fruit displays the level-specific type and point value, and automatically disappears after its timeout if not collected.
### US-017: As a player, I want to advance to a new, harder level after clearing all dots
- So that: the game stays challenging as I improve
- AC: When all dots and power pellets in the maze are eaten, the level-complete screen appears and the next level begins with the same maze layout.; The new level applies increased ghost speed, shorter scared duration, and more chase-heavy timers per its level config.
### US-018: As a player, I want difficulty to cap at the hardest settings after level 20+
- So that: long play sessions remain fair and bug-free
- AC: getLevelConfig returns the same hardest difficulty settings for all levels beyond the configured cap (20+).; Progressing past level 20 does not cause errors or undefined behavior in ghost speed/timer calculations.
### US-019: As a player, I want a start screen showing the title and high score
- So that: I can see my best score and begin playing
- AC: The start screen displays the game title and the current all-time high score loaded from storage.; Activating the start control (via mouse, keyboard Enter/Space, or touch) transitions the state machine to the countdown screen.
### US-020: As a player, I want a 3-2-1-GO countdown before gameplay starts
- So that: I'm prepared before the action begins
- AC: The countdown screen displays 3, 2, 1, GO in sequence with appropriate timing before transitioning to gameplay.; Gameplay does not begin (no entity movement) until the countdown completes.
### US-021: As a player, I want to pause and resume the game
- So that: I can take breaks without losing progress
- AC: Triggering pause freezes all entity movement, timers, and animations, and displays a 'Paused' overlay.; Triggering resume/unpause restores gameplay exactly from the frozen state with no lost progress.
### US-022: As a player, I want a brief level-complete transition screen
- So that: I know I cleared the level before the next one begins
- AC: Upon level completion, a brief level-complete transition screen is shown before the next level's countdown begins.; The transition screen displays the completed level number.
### US-023: As a player, I want a game-over screen with my final score and high-score initials entry
- So that: I can see my results and record my achievement
- AC: When lives reach zero, the game-over screen displays the final score.; If the final score qualifies for the top-10 list, the high-score initials entry screen appears before returning to the start screen.
### US-024: As a player, I want sound effects for key game events
- So that: the game feels responsive and alive
- AC: Each defined game event (dot-eat, pellet, ghost-eat, death, fruit, extra-life, startup jingle) triggers its corresponding distinct sound effect via AudioService.; Sound effects play without noticeable delay relative to the triggering game event.
### US-025: As a player, I want a looping background siren that changes pitch as dots are eaten
- So that: tension increases as I near the end of a level
- AC: A looping siren plays continuously during normal gameplay and stops during paused/non-playing states.; The siren's pitch/playback rate increases as the number of remaining dots decreases.
### US-026: As a player, I want a mute toggle
- So that: I can play without sound when I prefer
- AC: Activating mute silences all sound effects and the background siren immediately.; The mute preference persists across page reloads via SettingsStorageService.
### US-027: As a player, I want my top-10 high scores saved between sessions
- So that: I can track my best games over time
- AC: After a qualifying game-over, the new score and initials are added to the top-10 list and persisted to localStorage.; Reloading the browser after closing it still shows the previously saved top-10 list and all-time high score.
### US-028: As a keyboard user, I want to navigate all menus and screens using only the keyboard with visible focus indicators
- So that: I can play the whole game without a mouse
- AC: All interactive menu controls (start, pause, resume, restart, initials entry) are reachable and operable via Tab/Shift+Tab and Enter/Space without a mouse.; Each focusable control displays a visible focus indicator (e.g. outline) when focused via keyboard.
### US-029: As a colorblind player, I want a toggle for colorblind-friendly ghost colors
- So that: I can easily distinguish ghosts from each other
- AC: Enabling colorblind mode in settings immediately changes ghost rendering colors to the alternate palette.; The colorblind preference persists across sessions via SettingsStorageService.
### US-030: As a mobile player, I want to swipe to control Pac-Man
- So that: I can play without a physical keyboard
- AC: A swipe gesture in any of the four cardinal directions on the gameplay canvas updates Pac-Man's direction stream accordingly.; Swipe input is recognized reliably on touch devices without requiring a multi-finger gesture.
### US-031: As a mobile player, I want on-screen directional buttons
- So that: I have an alternative touch control to swiping
- AC: On-screen directional buttons are visible on touch/mobile viewports and each button press updates Pac-Man's direction.; The on-screen controls do not obstruct the visible maze/gameplay area.
### US-032: As a player, I want the layout to scale responsively from 375px to 2560px
- So that: the game looks and plays well on any device
- AC: The game layout renders without clipping or overflow at viewport widths from 375px to 2560px.; Canvas and HUD elements scale proportionally while maintaining aspect ratio across tested breakpoints.
### US-033: As a player, I want the game to work offline after first load
- So that: I can keep playing without an internet connection
- AC: After the first successful load, disabling network connectivity and reloading the app still loads and allows full gameplay.; All required assets (app shell, scripts, audio) are confirmed precached by the service worker.
### US-034: As a stakeholder, I want the total bundle size kept under 2MB
- So that: the game loads quickly for players
- AC: The production build output (dist/) total size is under 2MB.; The Angular CLI production build completes without exceeding configured bundle-size budget warnings/errors.
### US-035: As a player, I want all game components (maze, engine, AI, collision, input, audio, renderer, storage, and all screens) wired together in the main Angular app shell
- So that: the whole game is playable end-to-end from start screen through gameplay to game-over
- AC: Starting the app at the root route shows the start screen, and completing a full playthrough (start -> countdown -> gameplay -> pause/resume -> level-complete or game-over -> high-score entry if applicable) works end-to-end without additional code changes.; All core services (GameEngineService, InputService, AudioService, RendererService, CollisionService, ScoreStorageService, SettingsStorageService) are instantiated and actively functioning during a live gameplay session, verified via manual playthrough.

## Tasks (73)

- **TASK-001** [frontend/TypeScript] Implement maze layout data and helper functions
- **TASK-002** [frontend/HTML5 Canvas 2D API] Implement Canvas Renderer for maze tiles
- **TASK-003** [frontend/Angular service + requestAnimationFrame] Implement Game Engine Core fixed-timestep loop
- **TASK-004** [frontend/Angular standalone component] Wire GameplayComponent canvas host to engine and renderer
- **TASK-005** [testing/Jasmine/Karma] Unit tests for maze model helpers
- **TASK-006** [testing/Jasmine/Karma] Unit tests for Game Engine loop timing
- **TASK-007** [frontend/Angular service + RxJS] Implement InputService keyboard normalization
- **TASK-008** [frontend/TypeScript] Implement PacMan entity movement and wall-stop logic
- **TASK-009** [frontend/Angular service + RxJS] Integrate input direction stream into Game Engine
- **TASK-010** [frontend/HTML5 Canvas 2D API] Render Pac-Man chomp animation and directional facing
- **TASK-011** [testing/Jasmine/Karma] Unit tests for PacMan movement and wall collision
- **TASK-012** [testing/Jasmine/Karma] Unit tests for InputService direction normalization
- **TASK-013** [frontend/TypeScript] Implement Ghost entity class
- **TASK-014** [frontend/TypeScript] Implement per-ghost targeting algorithms
- **TASK-015** [frontend/TypeScript] Implement chooseTarget mode dispatcher
- **TASK-016** [frontend/Angular service] Implement scatter/chase timer alternation
- **TASK-017** [frontend/Angular service] Implement ghost-house release sequencing
- **TASK-018** [frontend/HTML5 Canvas 2D API] Render ghosts with color/state visuals
- **TASK-019** [testing/Jasmine/Karma] Unit tests for ghost targeting algorithms
- **TASK-020** [testing/Jasmine/Karma] Unit tests for scatter/chase timer and release sequencing
- **TASK-021** [frontend/TypeScript] Implement dot/power-pellet consumption detection
- **TASK-022** [frontend/TypeScript] Implement scared-mode transition on power pellet eaten
- **TASK-023** [frontend/TypeScript] Implement scared-mode end flashing timing
- **TASK-024** [frontend/TypeScript] Implement eaten-ghost eyes state and return pathing
- **TASK-025** [frontend/TypeScript] Implement escalating ghost-eat scoring
- **TASK-026** [frontend/HTML5 Canvas 2D API] Render scared/flashing/eyes ghost states
- **TASK-027** [testing/Jasmine/Karma] Unit tests for CollisionService outcomes
- **TASK-028** [frontend/Angular service + RxJS BehaviorSubject] Implement GameStateService core observables
- **TASK-029** [frontend/Angular service + RxJS] Wire scoring updates from collision events
- **TASK-030** [frontend/TypeScript] Implement Pac-Man death sequence and level reset
- **TASK-031** [frontend/TypeScript] Implement extra-life award logic
- **TASK-032** [frontend/Angular standalone component] Build HUD component
- **TASK-033** [testing/Jasmine/Karma] Unit tests for GameStateService scoring and lives logic
- **TASK-034** [frontend/TypeScript] Implement bonus fruit spawn logic
- **TASK-035** [frontend/TypeScript] Implement fruit auto-disappear timeout
- **TASK-036** [frontend/HTML5 Canvas 2D API] Render bonus fruit sprite
- **TASK-037** [frontend/TypeScript] Implement fruit pickup collision and scoring
- **TASK-038** [testing/Jasmine/Karma] Unit tests for fruit spawn, timeout, and scoring
- **TASK-039** [frontend/TypeScript] Implement level configuration data for 20+ levels
- **TASK-040** [frontend/TypeScript] Implement level-complete detection
- **TASK-041** [frontend/TypeScript] Implement level-advance transition and difficulty scaling
- **TASK-042** [testing/Jasmine/Karma] Unit tests for level config scaling and difficulty cap
- **TASK-043** [frontend/Angular standalone component] Build StartScreenComponent
- **TASK-044** [frontend/Angular standalone component] Build CountdownComponent
- **TASK-045** [frontend/Angular standalone component] Build PauseOverlayComponent and pause/resume logic
- **TASK-046** [frontend/Angular standalone component] Build LevelCompleteComponent
- **TASK-047** [frontend/Angular standalone component] Build GameOverComponent
- **TASK-048** [frontend/Angular standalone component] Build HighScoreEntryComponent
- **TASK-049** [frontend/Angular service + RxJS] Implement GameStateService screen state machine
- **TASK-050** [testing/Jasmine/Karma] Unit tests for GameStateService screen transitions
- **TASK-051** [frontend/Web Audio API] Implement AudioService Web Audio API wrapper
- **TASK-052** [frontend/Web Audio API] Implement dynamic-pitch background siren loop
- **TASK-053** [frontend/Angular service + RxJS] Wire game events to AudioService triggers
- **TASK-054** [frontend/Web Audio API + localStorage] Implement global mute toggle with persistence
- **TASK-055** [testing/Jasmine/Karma] Unit tests for AudioService mute and trigger logic
- **TASK-056** [frontend/Browser localStorage API] Implement ScoreStorageService localStorage wrapper
- **TASK-057** [frontend/TypeScript] Integrate high-score save/load flow
- **TASK-058** [testing/Jasmine/Karma] Unit tests for ScoreStorageService persistence
- **TASK-059** [frontend/Browser localStorage API] Implement SettingsStorageService localStorage wrapper
- **TASK-060** [frontend/Angular + CSS] Add keyboard focus indicators and tab order across screens
- **TASK-061** [frontend/HTML5 Canvas 2D API] Implement colorblind-friendly ghost palette toggle
- **TASK-062** [testing/Jasmine/Karma] Accessibility smoke tests for keyboard navigation
- **TASK-063** [frontend/TypeScript + Touch Events API] Implement swipe gesture detection
- **TASK-064** [frontend/Angular standalone component] Build TouchControlsComponent
- **TASK-065** [frontend/Angular + CSS + Canvas resize logic] Implement responsive canvas/layout scaling
- **TASK-066** [testing/Jasmine/Karma] Unit tests for swipe gesture mapping
- **TASK-067** [infra/@angular/service-worker] Configure service worker precaching
- **TASK-068** [infra/Angular CLI (esbuild-based builder)] Optimize code and assets to meet bundle-size budget
- **TASK-069** [infra/Asset compression tooling] Audit and compress audio/image assets
- **TASK-070** [testing/Angular CLI / Chrome DevTools offline mode] Manual verification of production build and offline playability
- **TASK-071** [frontend/Angular standalone component] Implement AppComponent root screen switcher
- **TASK-072** [frontend/Angular standalone component] Wire GameplayComponent to all gameplay services and sub-components
- **TASK-073** [testing/Jasmine/Karma + manual checklist] End-to-end manual playthrough verification
