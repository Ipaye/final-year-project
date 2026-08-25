# Speeco

Speeco turns spoken words into clean, saved text notes — right in your browser or as a
desktop app. Hit record, talk, and Speeco transcribes as you go.

- **Live transcription** in Chrome/Edge via the native Web Speech API
- **On-device AI transcription** (Whisper, via [`@huggingface/transformers`](https://github.com/huggingface/transformers.js)) as a free, no-API-key fallback for every other browser — audio never leaves the device
- **Notes saved locally** (`localStorage`), no account or server required
- Ships as a **web app** and, via Electron, a **desktop app** for macOS/Windows/Linux

> Looking for what changed in the 2.0 rewrite (Vue 2 → Vue 3, new UI, tests, Electron)?
> See [`docs/MODERNIZATION.md`](docs/MODERNIZATION.md).

## Getting started

```bash
npm install
npm run dev       # web app, http://localhost:5173
npm run electron:dev  # desktop app (runs the same UI inside Electron)
```

## Scripts

| Script                 | What it does                                            |
| ----------------------- | -------------------------------------------------------- |
| `npm run dev`           | Start the Vite dev server                                |
| `npm run build`         | Production web build → `dist/`                           |
| `npm run preview`       | Serve the production build locally                       |
| `npm run test`          | Run the unit test suite once (Vitest)                    |
| `npm run test:watch`    | Run the unit test suite in watch mode                    |
| `npm run lint`          | Lint `.js` and `.vue` files                               |
| `npm run electron:dev`  | Run the desktop app against the Vite dev server           |
| `npm run electron:build`| Build the web app and package it with Electron Builder    |
| `npm run deploy`        | Build and publish `dist/` to GitHub Pages                 |

## How transcription is chosen

Set the engine in **Settings**:

- **Auto** (default) — native browser transcription when available, on-device Whisper otherwise
- **Browser** — force the native Web Speech API (Chrome/Edge only)
- **On-device AI** — force Whisper, running fully client-side via WebAssembly

The Whisper model (`Xenova/whisper-tiny.en`, ~40 MB) is only downloaded the first time it's
actually needed, and is cached by the browser afterwards.

## Tech stack

Vue 3 · Vue Router 4 · Pinia · Vite · Vitest + Vue Test Utils · Sass · Electron + Electron
Builder · Web Speech API · Transformers.js (Whisper)

## Project structure

```
src/
  components/   Reusable UI (AppSidebar, Waveform, AppIcon, ...)
  composables/  useSpeechRecognition, useWhisperTranscriber
  stores/       Pinia stores (notes, settings)
  views/        One component per route
  router/       Route definitions
  assets/styles/  Design tokens + shared primitives
electron/       Electron main/preload processes
tests/unit/     Vitest unit + component tests
```

## Credit

Designed and built by [Ipaye Alameen](https://ipaye.github.io).

## License

MIT — see [LICENSE](LICENSE).
