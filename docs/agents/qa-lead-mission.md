# QA Lead — Test Plan

**Agent**: qa-lead  
**Generated**: 2026-10-04T16:31:04.351Z

---

## Test Plan

{
  "scope": "MAINTAIN mode note: no codebase analysis was provided, so this plan assumes creating/expanding Angular Jasmine+Karma suites under default Angular test directories (`src/**/*.spec.ts`) and E2E under `e2e/` (Playwright to be added for user-journey validation). Mandatory traceability rule for QA Unit/QA E2E: every test name must start with `[<storyId>#<acIndex>]`. All acceptance criteria are mapped below; no uncovered criteria.",
  "unit": [
    {
      "target": "CanvasRendererService maze tile draw mapping",
      "description": "[US-001#0] validates MAZE_LAYOUT tiles (walls/corridors/dots/pellets/tunnel/ghost-house) map to expected draw calls and coordinates.",
      "framework": "Jasmine + Karma",
      "storyId": "US-001",
      "acIndex": 0
    },
    {
      "target": "GameEngineService fixed timestep accumulator",
      "description": "[US-002#0] verifies update loop processes fixed-step ticks independent of variable RAF delta using simulated frame times and update-count assertions.",
      "framework": "Jasmine + Karma",
      "storyId": "US-002",
      "acIndex": 0
    },
    {
      "target": "InputManagerService keyboard normalization",
      "description": "[US-003#0] verifies Arrow keys and WASD emit direction within next engine tick/frame.",
      "framework": "Jasmine + Karma",
      "storyId": "US-003",
      "acIndex": 0
    },
    {
      "target": "GameEngineService movement + wall blocking",
      "description": "[US-003#1] verifies Pac-Man movement applies only when target tile is traversable.",
      "framework": "Jasmine + Karma",
      "storyId": "US-003",
      "acIndex": 1
    },
    {
      "target": "PacManAnimationModel",
      "description": "[US-004#0] verifies mouth animation cycles while moving and freezes when velocity is zero.",
      "framework": "Jasmine + Karma",
      "storyId": "US-004",
      "acIndex": 0
    },
    {
      "target": "CanvasRendererService Pac-Man orientation",
      "description": "[US-004#1] verifies sprite rotation/orientation matches direction enum up/down/left/right.",
      "framework": "Jasmine + Karma",
      "storyId": "US-004",
      "acIndex": 1
    },
    {
      "target": "GameEngineService direction persistence",
      "description": "[US-005#0] verifies Pac-Man continues last valid direction until blocked.",
      "framework": "Jasmine + Karma",
      "storyId": "US-005",
      "acIndex": 0
    },
    {
      "target": "MovementResolver wall boundary clamp",
      "description": "[US-005#1] verifies stop at exact wall boundary with no penetration/jitter.",
      "framework": "Jasmine + Karma",
      "storyId": "US-005",
      "acIndex": 1
    },
    {
      "target": "GhostAIModule target functions",
      "description": "[US-006#0] verifies blinkyTarget returns Pac-Man tile.",
      "framework": "Jasmine + Karma",
      "storyId": "US-006",
      "acIndex": 0
    },
    {
      "target": "GhostAIModule pinky/inky/clyde logic",
      "description": "[US-006#1] verifies pinky look-ahead, inky vector flank, clyde chase/scatter threshold switch.",
      "framework": "Jasmine + Karma",
      "storyId": "US-006",
      "acIndex": 1
    },
    {
      "target": "ModeTimerService chase/scatter scheduler",
      "description": "[US-007#0] verifies mode transitions follow level-config timer sequence.",
      "framework": "Jasmine + Karma",
      "storyId": "US-007",
      "acIndex": 0
    },
    {
      "target": "GhostAIModule scatter corner targeting",
      "description": "[US-007#1] verifies scatter mode uses assigned corner targets.",
      "framework": "Jasmine + Karma",
      "storyId": "US-007",
      "acIndex": 1
    },
    {
      "target": "GhostReleaseService",
      "description": "[US-008#0] verifies only first ghost released at level start.",
      "framework": "Jasmine + Karma",
      "storyId": "US-008",
      "acIndex": 0
    },
    {
      "target": "GhostReleaseService delayed queue",
      "description": "[US-008#1] verifies sequential release timestamps match configured delays.",
      "framework": "Jasmine + Karma",
      "storyId": "US-008",
      "acIndex": 1
    },
    {
      "target": "CollisionService power pellet handler",
      "description": "[US-009#0] verifies pellet consumption sets all ghosts scared in same tick/frame.",
      "framework": "Jasmine + Karma",
      "storyId": "US-009",
      "acIndex": 0
    },
    {
      "target": "GhostStateService scared transition",
      "description": "[US-009#1] verifies immediate direction reversal and reduced speed on scared entry.",
      "framework": "Jasmine + Karma",
      "storyId": "US-009",
      "acIndex": 1
    },
    {
      "target": "GhostFlashService",
      "description": "[US-010#0] verifies flashing toggles during final 2 seconds of scared duration.",
      "framework": "Jasmine + Karma",
      "storyId": "US-010",
      "acIndex": 0
    },
    {
      "target": "GhostStateService scared expiry",
      "description": "[US-010#1] verifies flashing stops and normal AI resumes exactly at timeout.",
      "framework": "Jasmine + Karma",
      "storyId": "US-010",
      "acIndex": 1
    },
    {
      "target": "CollisionService ghost contact resolution",
      "description": "[US-011#0] verifies scared ghost collision sets eyes state and disables Pac-Man death.",
      "framework": "Jasmine + Karma",
      "storyId": "US-011",
      "acIndex": 0
    },
    {
      "target": "GhostRespawnService",
      "description": "[US-011#1] verifies eyes return to house, regenerate, and re-release.",
      "framework": "Jasmine + Karma",
      "storyId": "US-011",
      "acIndex": 1
    },
    {
      "target": "ScoreService ghost-chain scoring",
      "description": "[US-012#0] verifies 200/400/800/1600 progression within one pellet window.",
      "framework": "Jasmine + Karma",
      "storyId": "US-012",
      "acIndex": 0
    },
    {
      "target": "ScoreService pellet-window reset",
      "description": "[US-012#1] verifies chain resets to 200 on new pellet.",
      "framework": "Jasmine + Karma",
      "storyId": "US-012",
      "acIndex": 1
    },
    {
      "target": "ScoreService dot/pellet points",
      "description": "[US-013#0] verifies +10 dot and +50 pellet score increments.",
      "framework": "Jasmine + Karma",
      "storyId": "US-013",
      "acIndex": 0
    },
    {
      "target": "FruitService level points lookup",
      "description": "[US-013#1] verifies fruit awards level-specific points.",
      "framework": "Jasmine + Karma",
      "storyId": "US-013",
      "acIndex": 1
    },
    {
      "target": "LifeService death handling",
      "description": "[US-014#0] verifies non-scared collision decrements life and triggers death animation state.",
      "framework": "Jasmine + Karma",
      "storyId": "US-014",
      "acIndex": 0
    },
    {
      "target": "LevelResetService",
      "description": "[US-014#1] verifies post-death reset positions entities while preserving eaten-dot map.",
      "framework": "Jasmine + Karma",
      "storyId": "US-014",
      "acIndex": 1
    },
    {
      "target": "LifeService extra-life threshold",
      "description": "[US-015#0] verifies first crossing of 10,000 grants +1 life and emits extra-life audio event.",
      "framework": "Jasmine + Karma",
      "storyId": "US-015",
      "acIndex": 0
    },
    {
      "target": "LifeService threshold idempotency",
      "description": "[US-015#1] verifies one award per threshold crossing only.",
      "framework": "Jasmine + Karma",
      "storyId": "US-015",
      "acIndex": 1
    },
    {
      "target": "FruitSpawnService dot milestones",
      "description": "[US-016#0] verifies fruit spawn near ghost house at ~70 and ~170 dots eaten.",
      "framework": "Jasmine + Karma",
      "storyId": "US-016",
      "acIndex": 0
    },
    {
      "target": "FruitSpawnService timeout + metadata",
      "description": "[US-016#1] verifies level-specific fruit type/points and auto-despawn timeout.",
      "framework": "Jasmine + Karma",
      "storyId": "US-016",
      "acIndex": 1
    },
    {
      "target": "LevelProgressService clear detection",
      "description": "[US-017#0] verifies all dots/pellets eaten triggers level-complete state then next-level start.",
      "framework": "Jasmine + Karma",
      "storyId": "US-017",
      "acIndex": 0
    },
    {
      "target": "LevelConfigService progression",
      "description": "[US-017#1] verifies increased ghost speed, shorter scared duration, chase-heavy timers by level.",
      "framework": "Jasmine + Karma",
      "storyId": "US-017",
      "acIndex": 1
    },
    {
      "target": "LevelConfigService cap behavior",
      "description": "[US-018#0] verifies getLevelConfig returns capped hardest settings for level 20+.",
      "framework": "Jasmine + Karma",
      "storyId": "US-018",
      "acIndex": 0
    },
    {
      "target": "LevelConfigService high-level safety",
      "description": "[US-018#1] verifies no undefined values/errors for levels >20 in speed/timer calculations.",
      "framework": "Jasmine + Karma",
      "storyId": "US-018",
      "acIndex": 1
    },
    {
      "target": "StartScreenComponent",
      "description": "[US-019#0] verifies title and all-time high score render from storage value.",
      "framework": "Jasmine + Karma",
      "storyId": "US-019",
      "acIndex": 0
    },
    {
      "target": "GameStateService start action",
      "description": "[US-019#1] verifies mouse/Enter/Space/touch start transitions to countdown state.",
      "framework": "Jasmine + Karma",
      "storyId": "US-019",
      "acIndex": 1
    },
    {
      "target": "CountdownService sequence",
      "description": "[US-020#0] verifies 3-2-1-GO timing and transition to playing.",
      "framework": "Jasmine + Karma",
      "storyId": "US-020",
      "acIndex": 0
    },
    {
      "target": "GameEngineService pre-play lock",
      "description": "[US-020#1] verifies no entity movement before countdown completion.",
      "framework": "Jasmine + Karma",
      "storyId": "US-020",
      "acIndex": 1
    },
    {
      "target": "PauseService freeze snapshot",
      "description": "[US-021#0] verifies pause freezes movement/timers/animations and sets paused overlay flag.",
      "framework": "Jasmine + Karma",
      "storyId": "US-021",
      "acIndex": 0
    },
    {
      "target": "PauseService resume restore",
      "description": "[US-021#1] verifies resume restores exact frozen state without drift.",
      "framework": "Jasmine + Karma",
      "storyId": "US-021",
      "acIndex": 1
    },
    {
      "target": "GameStateService level-complete transition",
      "description": "[US-022#0] verifies brief transition state before next countdown.",
      "framework": "Jasmine + Karma",
      "storyId": "US-022",
      "acIndex": 0
    },
    {
      "target": "LevelCompleteComponent",
      "description": "[US-022#1] verifies completed level number displayed.",
      "framework": "Jasmine + Karma",
      "storyId": "US-022",
      "acIndex": 1
    },
    {
      "target": "GameOverComponent",
      "description": "[US-023#0] verifies final score shown when lives reach zero.",
      "framework": "Jasmine + Karma",
      "storyId": "US-023",
      "acIndex": 0
    },
    {
      "target": "HighScoreQualificationService",
      "description": "[US-023#1] verifies qualifying score routes to initials entry before start screen.",
      "framework": "Jasmine + Karma",
      "storyId": "US-023",
      "acIndex": 1
    },
    {
      "target": "AudioManagerService SFX routing",
      "description": "[US-024#0] verifies each game event maps to distinct sound key.",
      "framework": "Jasmine + Karma",
      "storyId": "US-024",
      "acIndex": 0
    },
    {
      "target": "AudioManagerService mute gate",
      "description": "[US-026#0] verifies mute immediately suppresses all SFX and siren playback calls.",
      "framework": "Jasmine + Karma",
      "storyId": "US-026",
      "acIndex": 0
    },
    {
      "target": "AudioManagerService siren control",
      "description": "[US-025#0] verifies siren loops only in playing state and stops in paused/non-playing.",
      "framework": "Jasmine + Karma",
      "storyId": "US-025",
      "acIndex": 0
    },
    {
      "target": "AudioManagerService siren pitch curve",
      "description": "[US-025#1] verifies playbackRate/detune increases as remaining dots decrease.",
      "framework": "Jasmine + Karma",
      "storyId": "US-025",
      "acIndex": 1
    },
    {
      "target": "SettingsStorageService mute persistence",
      "description": "[US-026#1] verifies mute preference round-trips localStorage across reload.",
      "framework": "Jasmine + Karma",
      "storyId": "US-026",
      "acIndex": 1
    },
    {
      "target": "ScoreStorageService top10 insert/sort",
      "description": "[US-027#0] verifies qualifying score+initials inserted, ranked, trimmed to top 10, persisted.",
      "framework": "Jasmine + Karma",
      "storyId": "US-027",
      "acIndex": 0
    },
    {
      "target": "ScoreStorageService reload behavior",
      "description": "[US-027#1] verifies persisted top-10 and all-time high score load correctly.",
      "framework": "Jasmine + Karma",
      "storyId": "US-027",
      "acIndex": 1
    },
    {
      "target": "Accessibility styles/components",
      "description": "[US-028#1] verifies focus-visible indicator class/outline present on interactive controls.",
      "framework": "Jasmine + Karma",
      "storyId": "US-028",
      "acIndex": 1
    },
    {
      "target": "SettingsStorageService colorblind persistence",
      "description": "[US-029#1] verifies colorblind preference persists via localStorage.",
      "framework": "Jasmine + Karma",
      "storyId": "US-029",
      "acIndex": 1
    },
    {
      "target": "InputManagerService swipe parser",
      "description": "[US-030#0] verifies cardinal swipe directions map to direction stream.",
      "framework": "Jasmine + Karma",
      "storyId": "US-030",
      "acIndex": 0
    },
    {
      "target": "InputManagerService touch thresholds",
      "description": "[US-030#1] verifies single-finger swipe recognition reliability thresholds.",
      "framework": "Jasmine + Karma",
      "storyId": "US-030",
      "acIndex": 1
    },
    {
      "target": "OnScreenControlsComponent",
      "description": "[US-031#0] verifies directional button taps emit corresponding directions.",
      "framework": "Jasmine + Karma",
      "storyId": "US-031",
      "acIndex": 0
    },
    {
      "target": "ResponsiveLayoutService",
      "description": "[US-032#1] verifies canvas/HUD scale calculations preserve aspect ratio.",
      "framework": "Jasmine + Karma",
      "storyId": "US-032",
      "acIndex": 1
    },
    {
      "target": "AppShell wiring smoke",
      "description": "[US-035#1] verifies core services are provided/injectable and initialized in gameplay session bootstrap.",
      "framework": "Jasmine + Karma",
      "storyId": "US-035",
      "acIndex": 1
    }
  ],
  "integration": [
    {
      "target": "CanvasRenderer + MazeData + Browser canvas",
      "description": "[US-001#1] cross-browser visual regression baseline for maze render artifacts (Chrome/Firefox/Safari/Edge via Karma launchers).",
      "framework": "Jasmine + Karma",
      "storyId": "US-001",
      "acIndex": 1
    },
    {
      "target": "Engine + Renderer frame pacing",
      "description": "[US-002#1] measures steady render cadence under normal load in headless Chrome with performance marks.",
      "framework": "Jasmine + Karma",
      "storyId": "US-002",
      "acIndex": 1
    },
    {
      "target": "InputManager -> GameEngine pipeline",
      "description": "[US-003#0] verifies keydown event reaches engine direction buffer within one frame.",
      "framework": "Jasmine + Karma",
      "storyId": "US-003",
      "acIndex": 0
    },
    {
      "target": "Ghost mode scheduler + AI target selection",
      "description": "[US-007#0] verifies timed mode flips propagate to all ghosts and alter target source.",
      "framework": "Jasmine + Karma",
      "storyId": "US-007",
      "acIndex": 0
    },
    {
      "target": "Power pellet collision -> ghost state -> renderer",
      "description": "[US-009#0] verifies same-frame scared state reflected in rendered ghost style.",
      "framework": "Jasmine + Karma",
      "storyId": "US-009",
      "acIndex": 0
    },
    {
      "target": "Scared timeout -> flash -> normal AI",
      "description": "[US-010#1] verifies exact timeout boundary behavior across state, AI, and render layers.",
      "framework": "Jasmine + Karma",
      "storyId": "US-010",
      "acIndex": 1
    },
    {
      "target": "Collision + Score + HUD binding",
      "description": "[US-013#0] verifies dot/pellet events update score observable and HUD text immediately.",
      "framework": "Jasmine + Karma",
      "storyId": "US-013",
      "acIndex": 0
    },
    {
      "target": "Death flow integration",
      "description": "[US-014#1] verifies collision triggers death animation, life decrement, and board reset preserving consumed dots.",
      "framework": "Jasmine + Karma",
      "storyId": "US-014",
      "acIndex": 1
    },
    {
      "target": "Score threshold + Audio integration",
      "description": "[US-015#0] verifies extra-life event increments lives and plays extra-life sound once.",
      "framework": "Jasmine + Karma",
      "storyId": "US-015",
      "acIndex": 0
    },
    {
      "target": "Fruit lifecycle integration",
      "description": "[US-016#1] verifies spawn, render, collect/timeout, and score update with level-specific values.",
      "framework": "Jasmine + Karma",
      "storyId": "US-016",
      "acIndex": 1
    },
    {
      "target": "Level clear progression integration",
      "description": "[US-017#1] verifies next level applies config changes across engine timers and ghost speeds.",
      "framework": "Jasmine + Karma",
      "storyId": "US-017",
      "acIndex": 1
    },
    {
      "target": "Start control integration",
      "description": "[US-019#1] verifies click/keyboard/touch controls dispatch to state machine transition.",
      "framework": "Jasmine + Karma",
      "storyId": "US-019",
      "acIndex": 1
    },
    {
      "target": "Countdown gating integration",
      "description": "[US-020#1] verifies engine tick suppressed until countdown completion event.",
      "framework": "Jasmine + Karma",
      "storyId": "US-020",
      "acIndex": 1
    },
    {
      "target": "Pause/resume integration",
      "description": "[US-021#1] verifies frozen snapshot restored exactly for positions, timers, and animations.",
      "framework": "Jasmine + Karma",
      "storyId": "US-021",
      "acIndex": 1
    },
    {
      "target": "Game-over qualification integration",
      "description": "[US-023#1] verifies final score path branches to initials entry only when top-10 qualified.",
      "framework": "Jasmine + Karma",
      "storyId": "US-023",
      "acIndex": 1
    },
    {
      "target": "Audio latency integration",
      "description": "[US-024#1] verifies sound trigger timestamp delta from event is within acceptable low-latency threshold.",
      "framework": "Jasmine + Karma",
      "storyId": "US-024",
      "acIndex": 1
    },
    {
      "target": "Mute persistence integration",
      "description": "[US-026#1] verifies settings load on app init and audio graph starts muted when persisted.",
      "framework": "Jasmine + Karma",
      "storyId": "US-026",
      "acIndex": 1
    },
    {
      "target": "High-score persistence integration",
      "description": "[US-027#1] verifies localStorage survives reload and start screen reads all-time high.",
      "framework": "Jasmine + Karma",
      "storyId": "US-027",
      "acIndex": 1
    },
    {
      "target": "Keyboard navigation integration",
      "description": "[US-028#0] verifies Tab/Shift+Tab order and Enter/Space activation across start/pause/resume/restart/initials controls.",
      "framework": "Jasmine + Karma",
      "storyId": "US-028",
      "acIndex": 0
    },
    {
      "target": "Colorblind toggle integration",
      "description": "[US-029#0] verifies settings toggle immediately updates renderer ghost palette.",
      "framework": "Jasmine + Karma",
      "storyId": "US-029",
      "acIndex": 0
    },
    {
      "target": "Mobile controls layout integration",
      "description": "[US-031#1] verifies on-screen controls do not overlap maze viewport at mobile breakpoints.",
      "framework": "Jasmine + Karma",
      "storyId": "US-031",
      "acIndex": 1
    },
    {
      "target": "Responsive layout integration",
      "description": "[US-032#0] verifies no clipping/overflow across 375px–2560px viewport widths.",
      "framework": "Jasmine + Karma",
      "storyId": "US-032",
      "acIndex": 0
    },
    {
      "target": "Service worker precache manifest",
      "description": "[US-033#1] verifies app shell/scripts/audio assets present in ngsw precache groups.",
      "framework": "Jasmine + Karma",
      "storyId": "US-033",
      "acIndex": 1
    },
    {
      "target": "Build budget check",
      "description": "[US-034#1] verifies Angular production build passes configured bundle budgets without warnings/errors.",
      "framework": "Jasmine + Karma",
      "storyId": "US-034",
      "acIndex": 1
    },
    {
      "target": "App shell orchestration integration",
      "description": "[US-035#0] verifies root route boots start screen and state transitions wire all screens in sequence.",
      "framework": "Jasmine + Karma",
      "storyId": "US-035",
      "acIndex": 0
    }
  ],
  "e2e": [
    {
      "scenario": "Cross-browser maze render sanity",
      "description": "[US-001#1] Open app and verify maze visual snapshot consistency in Chromium/Firefox/WebKit.",
      "criticalPath": false,
      "storyId": "US-001",
      "acIndex": 1
    },
    {
      "scenario": "Full desktop control path",
      "description": "[US-003#0] Start game, use Arrow/WASD, verify immediate direction response and wall blocking behavior.",
      "criticalPath": true,
      "storyId": "US-003",
      "acIndex": 0
    },
    {
      "scenario": "Pac-Man animation/orientation during movement",
      "description": "[US-004#0] Move in all directions and assert mouth animates while moving, freezes when idle, and faces travel direction.",
      "criticalPath": false,
      "storyId": "US-004",
      "acIndex": 0
    },
    {
      "scenario": "Ghost behavior and scared cycle",
      "description": "[US-006#1] During play, observe distinct ghost pursuit patterns; eat pellet and verify scared reversal/speed reduction/flash/expiry.",
      "criticalPath": true,
      "storyId": "US-006",
      "acIndex": 1
    },
    {
      "scenario": "Ghost eat -> eyes -> respawn",
      "description": "[US-011#1] Eat scared ghost, verify eyes return to house and ghost re-enters normal cycle.",
      "criticalPath": false,
      "storyId": "US-011",
      "acIndex": 1
    },
    {
      "scenario": "Scoring HUD progression",
      "description": "[US-013#0] Consume dot, pellet, fruit, and ghosts; verify immediate HUD score updates and chain values.",
      "criticalPath": true,
      "storyId": "US-013",
      "acIndex": 0
    },
    {
      "scenario": "Death and reset flow",
      "description": "[US-014#1] Collide with non-scared ghost, verify death animation, life decrement, and reset with eaten dots preserved.",
      "criticalPath": true,
      "storyId": "US-014",
      "acIndex": 1
    },
    {
      "scenario": "Start -> countdown gating",
      "description": "[US-020#0] Trigger start via keyboard and verify 3-2-1-GO sequence before any movement begins.",
      "criticalPath": true,
      "storyId": "US-020",
      "acIndex": 0
    },
    {
      "scenario": "Pause/resume continuity",
      "description": "[US-021#1] Pause mid-motion, verify freeze + overlay, resume and confirm exact continuation.",
      "criticalPath": true,
      "storyId": "US-021",
      "acIndex": 1
    },
    {
      "scenario": "Level complete transition",
      "description": "[US-022#0] Clear remaining dots in test seed, verify level-complete screen then next countdown.",
      "criticalPath": false,
      "storyId": "US-022",
      "acIndex": 0
    },
    {
      "scenario": "Game-over and initials entry",
      "description": "[US-023#1] Lose all lives, verify final score and conditional top-10 initials entry flow.",
      "criticalPath": true,
      "storyId": "US-023",
      "acIndex": 1
    },
    {
      "scenario": "Audio + mute UX",
      "description": "[US-024#0] Verify event SFX and siren during play; toggle mute and confirm immediate silence.",
      "criticalPath": true,
      "storyId": "US-024",
      "acIndex": 0
    },
    {
      "scenario": "High-score persistence across reload",
      "description": "[US-027#1] Submit qualifying initials, reload page, verify top-10 and all-time high retained.",
      "criticalPath": true,
      "storyId": "US-027",
      "acIndex": 1
    },
    {
      "scenario": "Keyboard-only accessibility journey",
      "description": "[US-028#0] Navigate all interactive controls with Tab/Shift+Tab and activate with Enter/Space; verify visible focus indicator.",
      "criticalPath": true,
      "storyId": "US-028",
      "acIndex": 0
    },
    {
      "scenario": "Colorblind mode persistence",
      "description": "[US-029#1] Toggle colorblind palette, verify immediate ghost color change and persistence after reload.",
      "criticalPath": false,
      "storyId": "US-029",
      "acIndex": 1
    },
    {
      "scenario": "Mobile swipe controls",
      "description": "[US-030#0] On mobile emulation, perform single-finger swipes in four directions and verify movement updates.",
      "criticalPath": true,
      "storyId": "US-030",
      "acIndex": 0
    },
    {
      "scenario": "Mobile on-screen buttons",
      "description": "[US-031#0] Verify directional buttons visible on touch viewport, functional, and non-obstructive.",
      "criticalPath": true,
      "storyId": "US-031",
      "acIndex": 0
    },
    {
      "scenario": "Responsive layout sweep",
      "description": "[US-032#0] Validate no clipping/overflow and proportional canvas/HUD scaling at 375, 768, 1024, 1440, 2560 widths.",
      "criticalPath": true,
      "storyId": "US-032",
      "acIndex": 0
    },
    {
      "scenario": "Offline gameplay after first load",
      "description": "[US-033#0] Load once online, then go offline and reload; verify app boots and playable session works.",
      "criticalPath": true,
      "storyId": "US-033",
      "acIndex": 0
    },
    {
      "scenario": "Bundle-size gate in release pipeline smoke",
      "description": "[US-034#0] Run production build and assert dist total under 2MB.",
      "criticalPath": true,
      "storyId": "US-034",
      "acIndex": 0
    },
    {
      "scenario": "End-to-end app shell playthrough",
      "description": "[US-035#0] Complete journey start -> countdown -> gameplay -> pause/resume -> level-complete or game-over -> initials -> return start.",
      "criticalPath": true,
      "storyId": "US-035",
      "acIndex": 0
    }
  ],
  "coverageTargets": {
    "unit": 0.85,
    "integration": 0.65,
    "e2e": 1
  }
}
