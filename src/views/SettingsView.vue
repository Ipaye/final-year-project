<template>
  <div class="settings-view">
    <p class="eyebrow">Settings</p>
    <h1>Transcription engine</h1>
    <p class="settings-view__copy">
      Choose how Speeco turns your voice into text. This only affects new recordings.
    </p>

    <div class="engine-options" role="radiogroup" aria-label="Transcription engine">
      <button
        v-for="option in engineOptions"
        :key="option.value"
        type="button"
        class="engine-option"
        :class="{ 'engine-option--active': settings.engine === option.value }"
        role="radio"
        :aria-checked="settings.engine === option.value"
        @click="settings.setEngine(option.value)"
      >
        <AppIcon :name="option.icon" :size="20" />
        <div>
          <p class="engine-option__title">{{ option.title }}</p>
          <p class="engine-option__desc">{{ option.desc }}</p>
        </div>
      </button>
    </div>

    <div class="settings-view__danger">
      <h2>Data</h2>
      <p>
        Notes are stored only in this browser (<code>localStorage</code>) — nothing is uploaded
        anywhere.
      </p>
      <button type="button" class="btn btn--ghost" @click="confirmClear">
        <AppIcon name="trash" :size="16" />
        Clear all notes
      </button>
    </div>
  </div>
</template>

<script setup>
import AppIcon from '@/components/AppIcon.vue';
import { useSettingsStore } from '@/stores/settings';
import { useNotesStore } from '@/stores/notes';

const settings = useSettingsStore();
const notesStore = useNotesStore();

const engineOptions = [
  {
    value: 'auto',
    icon: 'settings',
    title: 'Auto (recommended)',
    desc: "Live transcription in Chrome/Edge, on-device AI everywhere else."
  },
  {
    value: 'browser',
    icon: 'cloud',
    title: "Browser's live transcription",
    desc: 'Fastest, word-by-word. Chrome and Edge only.'
  },
  {
    value: 'whisper',
    icon: 'chip',
    title: 'On-device AI (Whisper)',
    desc: 'Runs fully on this device — private, works in any modern browser.'
  }
];

function confirmClear() {
  if (!notesStore.count) return;
  if (window.confirm(`Delete all ${notesStore.count} saved notes? This can't be undone.`)) {
    notesStore.clearAll();
  }
}
</script>

<style scoped lang="scss">
h1 {
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  margin: 0.25rem 0 0.5rem;
}

.settings-view__copy {
  color: var(--color-ink-soft);
  max-width: 34rem;
  margin-bottom: 2rem;
}

.engine-options {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-width: 34rem;
}

.engine-option {
  display: flex;
  align-items: flex-start;
  gap: 0.9rem;
  text-align: left;
  padding: 1rem 1.1rem;
  border-radius: var(--radius-md);
  border: 1.5px solid var(--color-line);
  background: var(--color-paper-raised);
  cursor: pointer;
}

.engine-option--active {
  border-color: var(--color-ember);
  background: var(--color-ember-soft);
}

.engine-option__title {
  font-weight: 600;
}

.engine-option__desc {
  color: var(--color-slate);
  font-size: 0.88rem;
  margin-top: 0.15rem;
}

.settings-view__danger {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--color-line);
  max-width: 34rem;
}

.settings-view__danger h2 {
  font-size: 1.15rem;
  margin-bottom: 0.5rem;
}

.settings-view__danger p {
  color: var(--color-ink-soft);
  margin-bottom: 1rem;
  line-height: 1.55;
}
</style>
