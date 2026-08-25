<template>
  <div class="record-intro">
    <p class="eyebrow">Ready when you are</p>
    <h1>Let's get this down.</h1>
    <p class="record-intro__copy">
      Speeco will ask for microphone access, then listen until you stop it. Talk normally —
      pauses are fine.
    </p>

    <div class="record-intro__wave">
      <Waveform :active="false" :count="40" />
    </div>

    <div class="record-intro__engine">
      <AppIcon :name="engineIcon" :size="18" />
      <span>{{ engineLabel }}</span>
    </div>

    <RouterLink to="/recording" class="btn btn--primary record-intro__cta">
      <AppIcon name="mic" :size="18" />
      Start recording
    </RouterLink>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import AppIcon from '@/components/AppIcon.vue';
import Waveform from '@/components/Waveform.vue';
import { useSettingsStore } from '@/stores/settings';
import { getSpeechRecognitionCtor } from '@/composables/useSpeechRecognition';
import { resolveEngine } from '@/utils/engine';
import { isBraveBrowser } from '@/utils/browser';

const settings = useSettingsStore();
const nativeSupported = Boolean(getSpeechRecognitionCtor());
const isBrave = ref(false);
onMounted(async () => {
  isBrave.value = await isBraveBrowser();
});

const engine = computed(() =>
  resolveEngine({ settingEngine: settings.engine, nativeSupported, isBrave: isBrave.value })
);
const willUseWhisper = computed(() => engine.value === 'whisper');

const engineIcon = computed(() => (willUseWhisper.value ? 'chip' : 'cloud'));
const engineLabel = computed(() => {
  if (willUseWhisper.value && isBrave.value && settings.engine === 'auto') {
    return 'Brave blocks browser speech recognition — using on-device AI transcription instead';
  }
  return willUseWhisper.value
    ? 'Using on-device AI transcription (Whisper) — private, works after you stop talking'
    : "Using your browser's live transcription";
});
</script>

<style scoped lang="scss">
.record-intro {
  max-width: 34rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
}

h1 {
  font-size: clamp(2.1rem, 4vw, 3rem);
  margin-bottom: 0.25rem;
}

.record-intro__copy {
  color: var(--color-ink-soft);
  line-height: 1.6;
}

.record-intro__wave {
  height: 3.5rem;
  width: 100%;
  margin: 1rem 0;
}

.record-intro__engine {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.6rem 1rem;
  border-radius: var(--radius-sm);
  background: var(--color-signal-soft);
  color: var(--color-signal);
  font-size: 0.88rem;
  font-weight: 500;
}

.record-intro__cta {
  margin-top: 1rem;
}
</style>
