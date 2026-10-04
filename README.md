# claudeopus5
## Offline & bundle-size verification (US-033 / US-034)

Config guards live in `src/app/offline-build.spec.ts` (run by `npm test`). Manual check:

1. `npm run build` — must finish with no budget warnings/errors (budgets in `angular.json`).
2. `du -sh dist/` — must be under 2MB (measured: ~237KB total, ~210KB initial JS/CSS).
3. Serve `dist/claudeopus5/browser` with any static server, load once, wait for the service
   worker to activate (DevTools → Application → Service Workers).
4. DevTools → Network → Offline, reload: the app must load from the `ngsw` caches and be playable.

Asset policy: sounds are synthesized with the Web Audio API and sprites are drawn on the canvas,
so no binary audio/image files ship. Any file later added under `src/assets/` is precached by the
`assets` group in `ngsw-config.json`; compress it first (audio: mono OGG/MP3 ≤ 64 kbps,
images: SVG or optimized PNG/WebP).
