import { defineStore } from 'pinia';

const STORAGE_KEY = 'speeco.settings.v1';
const VALID_ENGINES = ['auto', 'browser', 'whisper'];

function loadFromDisk() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return VALID_ENGINES.includes(parsed.engine) ? parsed.engine : 'auto';
  } catch {
    return 'auto';
  }
}

function saveToDisk(engine) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ engine }));
  } catch {
    // Ignore — falls back to the default next load.
  }
}

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    // 'auto'    — native speech recognition when available, Whisper otherwise
    // 'browser' — force the native Web Speech API
    // 'whisper' — force the on-device Whisper model
    engine: loadFromDisk()
  }),
  actions: {
    setEngine(engine) {
      if (!VALID_ENGINES.includes(engine)) return;
      this.engine = engine;
      saveToDisk(engine);
    }
  }
});
