<template>
  <div class="recording">
    <section class="recording__stage">
      <div class="recording__timer">{{ formattedTime }}</div>
      <div class="recording__wave">
        <Waveform :active="isListening" :tone="usingWhisper ? 'signal' : 'ember'" :count="30" />
      </div>

      <button type="button" class="btn btn--primary recording__toggle" @click="toggle">
        <AppIcon :name="isListening ? 'close' : 'mic'" :size="18" />
        {{ toggleLabel }}
      </button>

      <p v-if="statusMessage" class="recording__status">{{ statusMessage }}</p>
    </section>

    <section class="recording__transcript">
      <p class="eyebrow">Live transcript</p>
      <div class="transcript-panel" :class="{ 'transcript-panel--empty': !liveText }">
        <p v-if="liveText" class="transcript-panel__text">
          {{ liveText }}<span v-if="interimText" class="transcript-panel__interim"> {{ interimText }}</span>
        </p>
        <p v-else class="transcript-panel__placeholder">
          Nothing yet — start recording and your words will show up here.
        </p>
      </div>

      <div class="recording__actions">
        <button type="button" class="btn btn--ghost" :disabled="!liveText" @click="discard">
          Discard
        </button>
        <button
          type="button"
          class="btn btn--primary"
          :disabled="!liveText || isListening"
          @click="save"
        >
          Save note
        </button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, ref } from 'vue';
import { useRouter } from 'vue-router';
import AppIcon from '@/components/AppIcon.vue';
import Waveform from '@/components/Waveform.vue';
import { useNotesStore } from '@/stores/notes';
import { useSettingsStore } from '@/stores/settings';
import { getSpeechRecognitionCtor, useSpeechRecognition } from '@/composables/useSpeechRecognition';
import { useWhisperTranscriber, isMicrophoneSupported } from '@/composables/useWhisperTranscriber';
import { formatTime } from '@/utils/time';

const router = useRouter();
const notesStore = useNotesStore();
const settings = useSettingsStore();

const nativeSupported = Boolean(getSpeechRecognitionCtor());
const usingWhisper = computed(() => {
  if (settings.engine === 'whisper') return true;
  if (settings.engine === 'browser') return false;
  return !nativeSupported;
});

const native = useSpeechRecognition();
const whisper = useWhisperTranscriber();

const isListening = computed(() =>
  usingWhisper.value ? whisper.isRecording.value : native.isListening.value
);
const liveText = computed(() =>
  usingWhisper.value ? whisper.transcript.value : native.transcript.value
);
const interimText = computed(() => (usingWhisper.value ? '' : native.interimTranscript.value));

const elapsed = ref(0);
let timer = null;

const formattedTime = computed(() => formatTime(elapsed.value));

function startTimer() {
  elapsed.value = 0;
  timer = setInterval(() => {
    elapsed.value += 1;
  }, 1000);
}
function stopTimer() {
  clearInterval(timer);
  timer = null;
}

const toggleLabel = computed(() => {
  if (isListening.value) return 'Stop';
  if (usingWhisper.value && whisper.isTranscribing.value) return 'Transcribing…';
  return 'Start recording';
});

const statusMessage = computed(() => {
  if (unsupported.value) {
    return "This browser can't record audio. Try Chrome, Edge, or Firefox.";
  }
  if (usingWhisper.value && whisper.isTranscribing.value) {
    return whisper.modelProgress.value > 0 && whisper.modelProgress.value < 100
      ? `Loading the on-device model… ${whisper.modelProgress.value}%`
      : 'Transcribing your recording…';
  }
  if (usingWhisper.value && !isListening.value && !liveText.value) {
    return "On-device AI mode — I'll transcribe right after you stop.";
  }
  if (native.error.value === 'not-allowed') {
    return 'Microphone access was denied — allow it in your browser settings to record.';
  }
  if (whisper.error.value === 'microphone-denied') {
    return 'Microphone access was denied — allow it in your browser settings to record.';
  }
  return '';
});

const unsupported = computed(() => !nativeSupported && !isMicrophoneSupported());

async function toggle() {
  if (unsupported.value) return;

  if (isListening.value) {
    stopTimer();
    if (usingWhisper.value) {
      await whisper.stop();
    } else {
      native.stop();
    }
    return;
  }

  if (usingWhisper.value) {
    whisper.reset();
    await whisper.start();
    if (whisper.error.value) return;
  } else {
    native.reset();
    native.start();
    if (native.error.value) return;
  }
  startTimer();
}

function discard() {
  if (usingWhisper.value) {
    whisper.reset();
  } else {
    native.reset();
  }
  elapsed.value = 0;
}

function save() {
  if (!liveText.value) return;
  notesStore.addNote(liveText.value);
  discard();
  router.push('/notes');
}

onBeforeUnmount(() => {
  stopTimer();
});
</script>

<style scoped lang="scss">
.recording {
  display: grid;
  grid-template-columns: minmax(16rem, 22rem) 1fr;
  gap: 2.5rem;
  align-items: start;
}

@media (max-width: 900px) {
  .recording {
    grid-template-columns: 1fr;
  }
}

.recording__stage {
  background: var(--color-paper-raised);
  border: 1px solid var(--color-line);
  border-radius: var(--radius-lg);
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;
  box-shadow: var(--shadow-card);
}

.recording__timer {
  font-family: var(--font-mono);
  font-size: 2.75rem;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
}

.recording__wave {
  width: 100%;
  height: 4rem;
}

.recording__toggle {
  width: 100%;
}

.recording__status {
  color: var(--color-slate);
  font-size: 0.85rem;
  line-height: 1.5;
}

.recording__transcript {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.transcript-panel {
  min-height: 16rem;
  max-height: 26rem;
  overflow-y: auto;
  background: var(--color-paper-raised);
  border: 1px solid var(--color-line);
  border-radius: var(--radius-md);
  padding: 1.5rem;
  box-shadow: var(--shadow-card);
}

.transcript-panel__text {
  font-family: var(--font-mono);
  font-size: 1.15rem;
  line-height: 1.9;
  white-space: pre-wrap;
}

.transcript-panel__interim {
  color: var(--color-slate);
}

.transcript-panel__placeholder {
  color: var(--color-slate);
  font-style: italic;
}

.recording__actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
}
</style>
