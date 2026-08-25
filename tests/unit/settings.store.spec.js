import { beforeEach, describe, expect, it } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useSettingsStore } from '@/stores/settings';

describe('settings store', () => {
  beforeEach(() => {
    localStorage.clear();
    setActivePinia(createPinia());
  });

  it('defaults the transcription engine to auto', () => {
    const store = useSettingsStore();
    expect(store.engine).toBe('auto');
  });

  it('updates and persists a valid engine choice', () => {
    const store = useSettingsStore();
    store.setEngine('whisper');
    expect(store.engine).toBe('whisper');

    setActivePinia(createPinia());
    const reloaded = useSettingsStore();
    expect(reloaded.engine).toBe('whisper');
  });

  it('ignores unknown engine values', () => {
    const store = useSettingsStore();
    store.setEngine('carrier-pigeon');
    expect(store.engine).toBe('auto');
  });
});
