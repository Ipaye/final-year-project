import { onBeforeUnmount, reactive, toRefs } from 'vue';

export function getSpeechRecognitionCtor() {
  return typeof window !== 'undefined'
    ? window.SpeechRecognition || window.webkitSpeechRecognition
    : undefined;
}

/**
 * Pure reducer for a single SpeechRecognition `result` event: splits the
 * result list (from `resultIndex` onward) into the text that is now final
 * and the text still being interpreted. Kept standalone so the accumulation
 * logic can be unit tested without a real SpeechRecognition instance.
 */
export function reduceResultEvent(event) {
  let interim = '';
  const finals = [];
  for (let i = event.resultIndex; i < event.results.length; i++) {
    const result = event.results[i];
    const text = result[0] ? result[0].transcript : '';
    if (result.isFinal) {
      finals.push(text.trim());
    } else {
      interim += text;
    }
  }
  return { finals, interim };
}

/**
 * Wraps the browser's native Web Speech API as a Vue composable.
 * Only available in Chromium-based browsers — check `isSupported`
 * before calling `start()`.
 */
export function useSpeechRecognition({ lang = 'en-US' } = {}) {
  const Ctor = getSpeechRecognitionCtor();
  const isSupported = Boolean(Ctor);

  const state = reactive({
    isListening: false,
    transcript: '',
    interimTranscript: '',
    error: null
  });

  let recognition = null;
  let finalChunks = [];

  function ensureRecognition() {
    if (recognition || !isSupported) return recognition;
    recognition = new Ctor();
    recognition.lang = lang;
    recognition.interimResults = true;
    recognition.continuous = true;

    recognition.onresult = event => {
      const { finals, interim } = reduceResultEvent(event);
      if (finals.length) finalChunks.push(...finals);
      state.transcript = finalChunks.join(' ').trim();
      state.interimTranscript = interim;
    };

    recognition.onerror = event => {
      state.error = event.error || 'unknown-error';
      state.isListening = false;
    };

    recognition.onend = () => {
      state.isListening = false;
    };

    return recognition;
  }

  function start() {
    if (!isSupported) {
      state.error = 'unsupported';
      return;
    }
    state.error = null;
    ensureRecognition().start();
    state.isListening = true;
  }

  function stop() {
    if (recognition && state.isListening) recognition.stop();
    state.isListening = false;
  }

  function reset() {
    finalChunks = [];
    state.transcript = '';
    state.interimTranscript = '';
  }

  onBeforeUnmount(() => stop());

  return { isSupported, ...toRefs(state), start, stop, reset };
}
