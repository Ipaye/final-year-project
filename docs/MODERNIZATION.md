# Speeco 2.0 modernization

This document records what changed in the rewrite on the `redesign/vue3-modernization`
branch, and why — for anyone (including future-me) picking the project back up.

## Why

The original project (2018) was Vue 2 on `vue-cli` 3, with `node-sass` (deprecated),
Nightwatch e2e, and a hand-rolled Electron main process. It also shipped with a handful of
real functional bugs (below). The goal of this pass was: modernize the stack to Vue 3, give
the UI an intentional redesign, fix the broken functionality, add real test coverage, and
keep both the web and desktop builds working.

## Stack changes

| Area              | Before                                  | After                                             |
| ------------------ | ---------------------------------------- | --------------------------------------------------- |
| Framework          | Vue 2.5                                  | Vue 3.5                                              |
| Build tool          | vue-cli 3 / webpack                      | Vite 8                                               |
| Router              | vue-router 3                             | vue-router 4 (hash history)                          |
| State               | Vuex 3                                   | Pinia 4                                              |
| Styles              | node-sass                                | Dart Sass, reorganized into design tokens            |
| Unit tests          | `@vue/cli-plugin-unit-mocha` (1 stub test)| Vitest + Vue Test Utils 2 (29 tests across 8 files)  |
| E2E tests           | Nightwatch (1 stub test, unmaintained)   | Removed — no e2e coverage existed to preserve; unit/component coverage added instead |
| Desktop             | `vue-cli-plugin-electron-builder` (archived project) | Hand-wired Electron 44 + electron-builder, driven by the same Vite build |
| Speech-to-text      | Web Speech API only (Chromium-only)      | Web Speech API **+** on-device Whisper fallback (works in Firefox/Safari too, no API key) |

## UI redesign

The old layout used a fixed-percentage sidebar and absolutely-positioned hero SVGs at
magic pixel offsets (`top: 34rem; left: -5%`), which broke on anything but the original
screen size. The new design:

- A responsive left rail (collapsible, mobile-safe) instead of viewport-percentage widths
- A design-token system (`src/assets/styles/_tokens.scss`) — warm paper background, an
  evolved version of the original brand orange (`--color-ember`) as the single accent, a
  teal "signal" color reserved for live/listening states
- Type: Space Grotesk (display) + Inter (body) + JetBrains Mono (live transcript — chosen
  because a monospace, caption-like face is literally what this product does: turn speech
  into captions)
- A signature **animated waveform** component (`src/components/Waveform.vue`), used on the
  home hero, the record screen, and while actively listening — pure CSS, no audio analysis
  needed, respects `prefers-reduced-motion`
- Hand-drawn inline SVG icon set (`AppIcon.vue`) instead of baked-color image assets, so
  every icon inherits the current text color

## Functional bugs fixed

1. **Broken Credits link** — the sidebar linked to `to="credits"` (no leading slash) while
   the router only registered `/credit` (singular). Now both agree on `/credits`, and
   `tests/unit/router.spec.js` pins the route so this can't silently regress.
2. **Non-reactive notes list** — `Notes.vue` copied `store.getters.availableNotes` into local
   `data()` once in `created()`, so the list never updated after navigating away and back.
   `NotesView.vue` now reads the store directly through a `computed`.
3. **Side-effecting computed properties in the recorder** — `recordAudio`, `stopRecording`,
   and `removeDuplicates` were Vue 2 `computed` properties whose getters had side effects
   (starting/stopping the recognizer, mutating `this.message`) and were invoked by merely
   *accessing* them (`this.recordAudio;`). Because computed properties cache based on
   reactive dependencies, the stop/start behavior did not reliably re-run on repeated
   toggles. This is now a proper composable (`useSpeechRecognition`) with real `start()` /
   `stop()` methods and a pure, unit-tested reducer (`reduceResultEvent`) for accumulating
   transcript chunks without duplicating text across recognition events.
4. **No handling for unsupported browsers** — the old app called
   `new SpeechRecognition()` unconditionally and would throw in Firefox/Safari. The new
   recorder detects support, and falls back to the on-device Whisper engine automatically.
5. **Notes were never deletable or persisted** — the "Delete" button in the old notes list
   was inert markup with no handler, and the Vuex store was in-memory only (a refresh lost
   everything). `useNotesStore` now persists to `localStorage` and delete actually removes
   the note (`tests/unit/notes.store.spec.js`).
6. **Empty Credits page** — the view existed but rendered no actual content.

## Why a Whisper fallback instead of a cloud speech API

The app is a static SPA (deployed to GitHub Pages) with no backend. Any cloud STT API
(Google Cloud Speech, AssemblyAI, Deepgram, OpenAI Whisper API, ...) needs a secret key,
which can't be safely embedded in a client-only bundle. Running Whisper **in the browser**
via `@huggingface/transformers` (WebAssembly) needs no key, has no per-minute cost, keeps
audio on-device, and works in every modern browser — not just Chromium. The trade-off is
UX: the native engine transcribes live, word by word, while the on-device model transcribes
once you stop talking. Both are available; `Settings` lets you pick.

The Whisper model and the `onnxruntime-web` runtime it needs (~24 MB WASM) are behind a
dynamic `import()` in `useWhisperTranscriber.js`, so Chrome/Edge users — the common case —
never download it.

## Testing

`npm run test` runs 29 tests across 8 files:

- `notes.store.spec.js`, `settings.store.spec.js` — Pinia store behavior + persistence
- `useSpeechRecognition.spec.js` — the transcript-accumulation reducer that replaced the
  buggy computed properties
- `time.spec.js` — the mm:ss formatter used by the recording timer
- `router.spec.js` — route table, including a regression check for the credits link bug
- `HomeView.spec.js`, `NotesView.spec.js`, `Waveform.spec.js` — component rendering and
  interaction (empty state, note deletion, deterministic waveform bars)

`MediaRecorder`/`AudioContext`-dependent code (the Whisper recording pipeline) isn't
exercised by jsdom-based unit tests — jsdom doesn't implement those APIs — so that path was
verified manually in a real browser instead.

## Desktop (Electron)

`electron/main.cjs` loads the Vite dev server in development and `dist/index.html` in
production, and grants microphone permission requests explicitly
(`session.setPermissionRequestHandler`). `npm run electron:dev` runs Vite and Electron
together (`concurrently` + `wait-on`); `npm run electron:build` builds the web bundle and
packages it with `electron-builder` for macOS/Windows/Linux.
