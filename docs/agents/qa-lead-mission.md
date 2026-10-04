# QA Lead — Test Plan

**Agent**: qa-lead  
**Generated**: 2026-10-04T15:51:18.431Z

---

## Test Plan

{
  "scope": "MAINTAIN mode note: no codebase analysis was provided, so this plan assumes creating/expanding Angular Jasmine+Karma suites under the default Angular test structure (`src/**/*.spec.ts`) and E2E under a Playwright folder (e.g., `e2e/`). Mandatory traceability rule for QA Unit/QA E2E: every test name must start with `[<storyId>#<acIndex>]`. All acceptance criteria are mapped below; no uncovered criteria.",
  "unit": [
    {
      "target": "CanvasRendererService maze layer rendering",
      "description": "[US-001#0] verifies walls/corridors/dots/pellets/tunnel/ghost-house tiles are drawn from MAZE_LAYOUT with expected tile counts and coordinates",
      "framework": "Jasmine + Karma",
      "storyId": "US-001",
      "acIndex": 0
    },
    {
      "target": "GameEngineService fixed timestep accumulator",
      "description": "[US-002#0] verifies update() executes fixed-step ticks independent of variable RAF delta using simulated frame times and update-count assertions",
      "framework": "Jasmine + Karma",
      "storyId": "US-002",
      "acIndex": 0
    },
    {
      "target": "InputManagerService keyboard mapping",
      "description": "[US-003#0] verifies Arrow/WASD keydown emits normalized direction within next engine tick",
      "framework": "Jasmine + Karma",
      "storyId": "US-003",
      "acIndex": 0
    },
    {
      "target": "GameEngineService movement resolver",
      "description": "[US-003#1] verifies Pac-Man direction applies only when target tile is non-wall",
      "framework": "Jasmine + Karma",
      "storyId": "US-003",
      "acIndex": 1
    },
    {
      "target": "PacmanSpriteAnimator",
      "description": "[US-004#0] verifies mouth animation cycles while velocity!=0 and freezes when stationary",
      "framework": "Jasmine + Karma",
      "storyId": "US-004",
      "acIndex": 0
    },
    {
      "target": "PacmanSpriteAnimator orientation",
      "description": "[US-004#1] verifies sprite rotation/frame selection matches up/down/left/right direction",
      "framework": "Jasmine + Karma",
      "storyId": "US-004",
      "acIndex": 1
    },
    {
      "target": "GameEngineService movement continuity",
      "description": "[US-005#0] verifies Pac-Man continues last valid direction until blocked",
      "framework": "Jasmine + Karma",
      "storyId": "US-005",
      "acIndex": 0
    },
    {
      "target": "CollisionService wall boundary clamp",
      "description": "[US-005#1] verifies stop at wall boundary with no penetration/jitter over successive ticks",
      "framework": "Jasmine + Karma",
      "storyId": "US-005",
      "acIndex": 1
    },
    {
      "target": "GhostAiService blinkyTarget",
      "description": "[US-006#0] verifies blinky target equals Pac-Man current tile",
      "framework": "Jasmine + Karma",
      "storyId": "US-006",
      "acIndex": 0
    },
    {
      "target": "GhostAiService pinky/inky/clyde targeting",
      "description": "[US-006#1] verifies pinky ahead-tile, inky vector flank, clyde chase-vs-corner threshold behavior",
      "framework": "Jasmine + Karma",
      "storyId": "US-006",
      "acIndex": 1
    },
    {
      "target": "GhostModeSchedulerService",
      "description": "[US-007#0] verifies chase/scatter transitions follow level timer sequence",
      "framework": "Jasmine + Karma",
      "storyId": "US-007",
      "acIndex": 0
    },
    {
      "target": "GhostAiService scatter targeting",
      "description": "[US-007#1] verifies assigned corner targets are used during scatter mode",
      "framework": "Jasmine + Karma",
      "storyId": "US-007",
      "acIndex": 1
    },
    {
      "target": "GhostHouseReleaseService",
      "description": "[US-008#0] verifies only first ghost released at level start",
      "framework": "Jasmine + Karma",
      "storyId": "US-008",
      "acIndex": 0
    },
    {
      "target": "GhostHouseReleaseService delayed release",
      "description": "[US-008#1] verifies sequential release events occur after configured delays (fakeAsync/tick)",
      "framework": "Jasmine + Karma",
      "storyId": "US-008",
      "acIndex": 1
    },
    {
      "target": "CollisionService power pellet effect",
      "description": "[US-009#0] verifies pellet consumption sets all ghosts scared state in same tick/frame",
      "framework": "Jasmine + Karma",
      "storyId": "US-009",
      "acIndex": 0
    },
    {
      "target": "GhostStateService scared transition",
      "description": "[US-009#1] verifies immediate direction reversal and reduced speed on scared entry",
      "framework": "Jasmine + Karma",
      "storyId": "US-009",
      "acIndex": 1
    },
    {
      "target": "GhostRenderStateService flashing window",
      "description": "[US-010#0] verifies flash toggling only during final 2s of scared duration",
      "framework": "Jasmine + Karma",
      "storyId": "US-010",
      "acIndex": 0
    },
    {
      "target": "GhostStateService scared expiry",
      "description": "[US-010#1] verifies flashing stops and normal AI resumes exactly at scared timeout",
      "framework": "Jasmine + Karma",
      "storyId": "US-010",
      "acIndex": 1
    },
    {
      "target": "CollisionService ghost-eaten transition",
      "description": "[US-011#0] verifies scared-ghost collision sets eyes state and disables lethal collision",
      "framework": "Jasmine + Karma",
      "storyId": "US-011",
      "acIndex": 0
    },
    {
      "target": "GhostRespawnService",
      "description": "[US-011#1] verifies eyes return to house, regenerate, and re-release",
      "framework": "Jasmine + Karma",
      "storyId": "US-011",
      "acIndex": 1
    },
    {
      "target": "ScoreService ghost chain scoring",
      "description": "[US-012#0] verifies 200/400/800/1600 sequence within one pellet window",
      "framework": "Jasmine + Karma",
      "storyId": "US-012",
      "acIndex": 0
    },
    {
      "target": "ScoreService chain reset",
      "description": "[US-012#1] verifies new pellet resets next ghost value to 200",
      "framework": "Jasmine + Karma",
      "storyId": "US-012",
      "acIndex": 1
    },
    {
      "target": "ScoreService dot/pellet scoring",
      "description": "[US-013#0] verifies +10 dot and +50 pellet score events",
      "framework": "Jasmine + Karma",
      "storyId": "US-013",
      "acIndex": 0
    },
    {
      "target": "ScoreService fruit scoring",
      "description": "[US-013#1] verifies level-specific fruit points added",
      "framework": "Jasmine + Karma",
      "storyId": "US-013",
      "acIndex": 1
    },
    {
      "target": "LifeService death handling",
      "description": "[US-014#0] verifies non-scared ghost collision decrements life and triggers death animation state",
      "framework": "Jasmine + Karma",
      "storyId": "US-014",
      "acIndex": 0
    },
    {
      "target": "RoundResetService",
      "description": "[US-014#1] verifies post-death reset positions entities while preserving eaten-dot map",
      "framework": "Jasmine + Karma",
      "storyId": "US-014",
      "acIndex": 1
    },
    {
      "target": "LifeService extra life threshold",
      "description": "[US-015#0] verifies first crossing of 10,000 grants +1 life and emits extra-life audio event",
      "framework": "Jasmine + Karma",
      "storyId": "US-015",
      "acIndex": 0
    },
    {
      "target": "LifeService threshold gating",
      "description": "[US-015#1] verifies extra life awarded once per threshold crossing",
      "framework": "Jasmine + Karma",
      "storyId": "US-015",
      "acIndex": 1
    },
    {
      "target": "FruitSpawnService",
      "description": "[US-016#0] verifies fruit spawns near ghost house at ~70 and ~170 dots eaten",
      "framework": "Jasmine + Karma",
      "storyId": "US-016",
      "acIndex": 0
    },
    {
      "target": "FruitSpawnService timeout/type",
      "description": "[US-016#1] verifies level fruit type/points and auto-despawn timeout",
      "framework": "Jasmine + Karma",
      "storyId": "US-016",
      "acIndex": 1
    },
    {
      "target": "LevelProgressionService",
      "description": "[US-017#0] verifies all dots cleared triggers level-complete state then next-level start",
      "framework": "Jasmine + Karma",
      "storyId": "US-017",
      "acIndex": 0
    },
    {
      "target": "LevelConfigService progression",
      "description": "[US-017#1] verifies higher level applies faster ghosts, shorter scared, chase-heavy timers",
      "framework": "Jasmine + Karma",
      "storyId": "US-017",
      "acIndex": 1
    },
    {
      "target": "LevelConfigService cap",
      "description": "[US-018#0] verifies getLevelConfig(level>20) returns capped hardest config",
      "framework": "Jasmine + Karma",
      "storyId": "US-018",
      "acIndex": 0
    },
    {
      "target": "LevelProgressionService post-cap stability",
      "description": "[US-018#1] verifies no undefined values/errors in speed/timer calculations beyond level 20",
      "framework": "Jasmine + Karma",
      "storyId": "US-018",
      "acIndex": 1
    },
    {
      "target": "GameStateService start transition",
      "description": "[US-019#1] verifies start action from keyboard/mouse/touch transitions start->countdown",
      "framework": "Jasmine + Karma",
      "storyId": "US-019",
      "acIndex": 1
    },
    {
      "target": "CountdownService",
      "description": "[US-020#0] verifies 3-2-1-GO sequence timing and transition to playing",
      "framework": "Jasmine + Karma",
      "storyId": "US-020",
      "acIndex": 0
    },
    {
      "target": "GameEngineService countdown gate",
      "description": "[US-020#1] verifies no entity movement before countdown completion",
      "framework": "Jasmine + Karma",
      "storyId": "US-020",
      "acIndex": 1
    },
    {
      "target": "PauseService",
      "description": "[US-021#0] verifies pause freezes movement/timers/animations and sets paused overlay flag",
      "framework": "Jasmine + Karma",
      "storyId": "US-021",
      "acIndex": 0
    },
    {
      "target": "PauseService resume restore",
      "description": "[US-021#1] verifies resume restores exact frozen state without progress loss",
      "framework": "Jasmine + Karma",
      "storyId": "US-021",
      "acIndex": 1
    },
    {
      "target": "GameStateService level-complete transition",
      "description": "[US-022#0] verifies brief level-complete state before next countdown",
      "framework": "Jasmine + Karma",
      "storyId": "US-022",
      "acIndex": 0
    },
    {
      "target": "AudioService event routing",
      "description": "[US-024#0] verifies each event key maps to distinct sound trigger",
      "framework": "Jasmine + Karma",
      "storyId": "US-024",
      "acIndex": 0
    },
    {
      "target": "AudioService siren control",
      "description": "[US-025#0] verifies siren loops in playing state and stops in paused/non-playing",
      "framework": "Jasmine + Karma",
      "storyId": "US-025",
      "acIndex": 0
    },
    {
      "target": "AudioService siren pitch model",
      "description": "[US-025#1] verifies playbackRate/detune increases as remaining dots decrease",
      "framework": "Jasmine + Karma",
      "storyId": "US-025",
      "acIndex": 1
    },
    {
      "target": "SettingsStorageService mute persistence",
      "description": "[US-026#1] verifies mute preference read/write persists across reload simulation",
      "framework": "Jasmine + Karma",
      "storyId": "US-026",
      "acIndex": 1
    },
    {
      "target": "ScoreStorageService top10 logic",
      "description": "[US-027#0] verifies qualifying score insertion, sort, trim to top-10, persist payload",
      "framework": "Jasmine + Karma",
      "storyId": "US-027",
      "acIndex": 0
    },
    {
      "target": "SettingsStorageService colorblind persistence",
      "description": "[US-029#1] verifies colorblind preference persists via localStorage",
      "framework": "Jasmine + Karma",
      "storyId": "US-029",
      "acIndex": 1
    },
    {
      "target": "InputManagerService swipe parser",
      "description": "[US-030#0] verifies cardinal swipe direction normalization from touch deltas",
      "framework": "Jasmine + Karma",
      "storyId": "US-030",
      "acIndex": 0
    },
    {
      "target": "InputManagerService touch reliability",
      "description": "[US-030#1] verifies single-finger swipe accepted and multi-finger not required",
      "framework": "Jasmine + Karma",
      "storyId": "US-030",
      "acIndex": 1
    },
    {
      "target": "ResponsiveLayoutService",
      "description": "[US-032#1] verifies canvas/HUD scale calculations preserve aspect ratio across breakpoints",
      "framework": "Jasmine + Karma",
      "storyId": "US-032",
      "acIndex": 1
    },
    {
      "target": "Service worker config validation",
      "description": "[US-033#1] verifies ngsw-config includes app shell/scripts/audio assets in precache groups",
      "framework": "Jasmine + Karma",
      "storyId": "US-033",
      "acIndex": 1
    }
  ],
  "integration": [
    {
      "target": "CanvasRenderer + MAZE_LAYOUT",
      "description": "[US-001#1] browser integration snapshot checks for visual artifact-free maze render in Chromium/Firefox/WebKit runs",
      "framework": "Jasmine + Karma",
      "storyId": "US-001",
      "acIndex": 1
    },
    {
      "target": "Engine loop + renderer perf harness",
      "description": "[US-002#1] measures frame cadence under normal load and asserts steady 60fps threshold on desktop CI profile",
      "framework": "Jasmine + Karma",
      "storyId": "US-002",
      "acIndex": 1
    },
    {
      "target": "StartScreenComponent + ScoreStorageService",
      "description": "[US-019#0] verifies title and all-time high score load/display from localStorage-backed service",
      "framework": "Jasmine + Karma",
      "storyId": "US-019",
      "acIndex": 0
    },
    {
      "target": "LevelCompleteComponent + GameStateService",
      "description": "[US-022#1] verifies completed level number is displayed during transition state",
      "framework": "Jasmine + Karma",
      "storyId": "US-022",
      "acIndex": 1
    },
    {
      "target": "GameOver flow + HighScore qualification",
      "description": "[US-023#0] verifies lives=0 transitions to game-over and final score display",
      "framework": "Jasmine + Karma",
      "storyId": "US-023",
      "acIndex": 0
    },
    {
      "target": "GameOver + initials entry gate",
      "description": "[US-023#1] verifies qualifying score shows initials entry before returning to start",
      "framework": "Jasmine + Karma",
      "storyId": "US-023",
      "acIndex": 1
    },
    {
      "target": "Collision events + AudioService timing",
      "description": "[US-024#1] verifies sound trigger timestamp is within acceptable latency budget from event emission",
      "framework": "Jasmine + Karma",
      "storyId": "US-024",
      "acIndex": 1
    },
    {
      "target": "Settings UI + AudioService + SettingsStorageService",
      "description": "[US-026#0] verifies mute toggle immediately silences SFX+siren and updates persisted setting",
      "framework": "Jasmine + Karma",
      "storyId": "US-026",
      "acIndex": 0
    },
    {
      "target": "High score persistence reload",
      "description": "[US-027#1] verifies top-10 and all-time high survive app re-init from localStorage",
      "framework": "Jasmine + Karma",
      "storyId": "US-027",
      "acIndex": 1
    },
    {
      "target": "Keyboard navigation across menu components",
      "description": "[US-028#0] verifies Tab/Shift+Tab order and Enter/Space activation for start/pause/resume/restart/initials controls",
      "framework": "Jasmine + Karma",
      "storyId": "US-028",
      "acIndex": 0
    },
    {
      "target": "Focus style integration",
      "description": "[US-028#1] verifies visible focus indicator CSS is applied on keyboard focus for all interactive controls",
      "framework": "Jasmine + Karma",
      "storyId": "US-028",
      "acIndex": 1
    },
    {
      "target": "Settings toggle + renderer palette",
      "description": "[US-029#0] verifies enabling colorblind mode immediately updates ghost colors in renderer",
      "framework": "Jasmine + Karma",
      "storyId": "US-029",
      "acIndex": 0
    },
    {
      "target": "Mobile controls component + viewport rules",
      "description": "[US-031#0] verifies on-screen directional buttons appear on touch/mobile and emit direction updates",
      "framework": "Jasmine + Karma",
      "storyId": "US-031",
      "acIndex": 0
    },
    {
      "target": "Mobile controls layout + canvas container",
      "description": "[US-031#1] verifies controls do not overlap/obstruct maze viewport",
      "framework": "Jasmine + Karma",
      "storyId": "US-031",
      "acIndex": 1
    },
    {
      "target": "Responsive shell layout",
      "description": "[US-032#0] verifies no clipping/overflow from 375px to 2560px in key breakpoints",
      "framework": "Jasmine + Karma",
      "storyId": "US-032",
      "acIndex": 0
    },
    {
      "target": "PWA offline integration",
      "description": "[US-033#0] verifies app reloads and gameplay starts with network disabled after first load",
      "framework": "Jasmine + Karma",
      "storyId": "US-033",
      "acIndex": 0
    },
    {
      "target": "Build budget integration",
      "description": "[US-034#0] verifies dist total size under 2MB via build artifact check script",
      "framework": "Jasmine + Karma",
      "storyId": "US-034",
      "acIndex": 0
    },
    {
      "target": "Angular build budget config",
      "description": "[US-034#1] verifies production build passes configured bundle budgets without warnings/errors",
      "framework": "Jasmine + Karma",
      "storyId": "US-034",
      "acIndex": 1
    },
    {
      "target": "App shell wiring smoke",
      "description": "[US-035#1] verifies core services are instantiated and active during gameplay session",
      "framework": "Jasmine + Karma",
      "storyId": "US-035",
      "acIndex": 1
    }
  ],
  "e2e": [
    {
      "scenario": "Full app boot and start flow",
      "description": "[US-035#0] root route shows start screen; start->countdown->gameplay path works without code changes",
      "criticalPath": true,
      "storyId": "US-035",
      "acIndex": 0
    },
    {
      "scenario": "Pause/resume during live gameplay",
      "description": "[US-021#0] pause freezes entities/timers/animations and shows overlay; [US-021#1] resume restores exact state",
      "criticalPath": true,
      "storyId": "US-021",
      "acIndex": -1
    },
    {
      "scenario": "Desktop keyboard control journey",
      "description": "[US-003#0] Arrow/WASD input changes direction promptly; [US-003#1] wall blocking respected during movement",
      "criticalPath": true,
      "storyId": "US-003",
      "acIndex": -1
    },
    {
      "scenario": "Start/countdown gating",
      "description": "[US-020#0] 3-2-1-GO sequence visible; [US-020#1] no movement before GO",
      "criticalPath": true,
      "storyId": "US-020",
      "acIndex": -1
    },
    {
      "scenario": "Scoring HUD updates",
      "description": "[US-013#0] dot/pellet points update immediately; [US-013#1] fruit points reflected in HUD",
      "criticalPath": true,
      "storyId": "US-013",
      "acIndex": -1
    },
    {
      "scenario": "Death and round reset",
      "description": "[US-014#0] non-scared collision triggers death/life decrement; [US-014#1] reset positions while eaten dots remain",
      "criticalPath": true,
      "storyId": "US-014",
      "acIndex": -1
    },
    {
      "scenario": "Game-over and high-score entry",
      "description": "[US-023#0] final score shown at zero lives; [US-023#1] qualifying run prompts initials entry",
      "criticalPath": true,
      "storyId": "US-023",
      "acIndex": -1
    },
    {
      "scenario": "High-score persistence across reload",
      "description": "[US-027#1] saved top-10 and all-time high remain after browser reload",
      "criticalPath": true,
      "storyId": "US-027",
      "acIndex": 1
    },
    {
      "scenario": "Audio mute and siren behavior",
      "description": "[US-026#0] mute silences immediately; [US-025#0] siren plays only during gameplay states",
      "criticalPath": false,
      "storyId": "US-026",
      "acIndex": -1
    },
    {
      "scenario": "Colorblind mode toggle persistence",
      "description": "[US-029#0] ghost palette changes immediately; [US-029#1] persists after reload",
      "criticalPath": false,
      "storyId": "US-029",
      "acIndex": -1
    },
    {
      "scenario": "Mobile swipe controls",
      "description": "[US-030#0] four-direction swipe updates direction stream; [US-030#1] single-finger reliability",
      "criticalPath": true,
      "storyId": "US-030",
      "acIndex": -1
    },
    {
      "scenario": "Mobile on-screen controls",
      "description": "[US-031#0] directional buttons control movement; [US-031#1] controls do not obstruct maze",
      "criticalPath": true,
      "storyId": "US-031",
      "acIndex": -1
    },
    {
      "scenario": "Responsive layout sweep",
      "description": "[US-032#0] no clipping/overflow 375..2560; [US-032#1] proportional canvas/HUD scaling",
      "criticalPath": false,
      "storyId": "US-032",
      "acIndex": -1
    },
    {
      "scenario": "Offline gameplay after first load",
      "description": "[US-033#0] with network disabled app reloads and remains playable",
      "criticalPath": true,
      "storyId": "US-033",
      "acIndex": 0
    },
    {
      "scenario": "Level progression and difficulty cap",
      "description": "[US-017#0] clear level triggers transition and next level; [US-018#0] post-20 levels use capped config without errors",
      "criticalPath": false,
      "storyId": "US-017",
      "acIndex": -1
    }
  ],
  "coverageTargets": {
    "unit": 0.85,
    "integration": 0.65,
    "e2e": 1
  }
}
