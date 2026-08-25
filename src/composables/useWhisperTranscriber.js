import { reactive, toRefs } from 'vue';

const MODEL_ID = 'Xenova/whisper-tiny.en';
const TARGET_SAMPLE_RATE = 16000;

let transcriberPromise = null;

/**
 * Lazily loads the Whisper pipeline. The @huggingface/transformers package
 * is dynamically imported so Chromium users (who use the native Web Speech
 * API) never pay for it.
 */
function getTranscriber(onProgress) {
  if (!transcriberPromise) {
    transcriberPromise = import('@huggingface/transformers').then(({ pipeline }) =>
      pipeline('automatic-speech-recognition', MODEL_ID, {
        progress_callback: onProgress
      })
    );
  }
  return transcriberPromise;
}

/** Decodes a recorded audio Blob into mono Float32 PCM at 16kHz. */
export async function blobToFloat32Audio(blob, targetSampleRate = TARGET_SAMPLE_RATE) {
  const arrayBuffer = await blob.arrayBuffer();
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  const audioCtx = new AudioCtx();
  const decoded = await audioCtx.decodeAudioData(arrayBuffer);

  const offline = new OfflineAudioContext(
    1,
    Math.ceil(decoded.duration * targetSampleRate),
    targetSampleRate
  );
  const source = offline.createBufferSource();
  source.buffer = decoded;
  source.connect(offline.destination);
  source.start(0);
  const rendered = await offline.startRendering();
  audioCtx.close();
  return rendered.getChannelData(0);
}

export function isMicrophoneSupported() {
  return typeof navigator !== 'undefined' && Boolean(navigator.mediaDevices?.getUserMedia);
}

/**
 * Records the microphone and transcribes it with an in-browser Whisper
 * model on stop. No API key, no server, no per-minute cost — the audio
 * never leaves the device. Trade-off vs. the native engine: transcription
 * appears once you stop recording rather than live, word by word.
 */
export function useWhisperTranscriber() {
  const state = reactive({
    isRecording: false,
    isTranscribing: false,
    modelProgress: 0,
    transcript: '',
    error: null
  });

  let mediaRecorder = null;
  let chunks = [];
  let stream = null;

  async function start() {
    state.error = null;
    if (!isMicrophoneSupported()) {
      state.error = 'unsupported';
      return;
    }
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      chunks = [];
      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.ondataavailable = event => {
        if (event.data.size > 0) chunks.push(event.data);
      };
      mediaRecorder.start();
      state.isRecording = true;
    } catch {
      state.error = 'microphone-denied';
    }
  }

  function stop() {
    return new Promise(resolve => {
      if (!mediaRecorder || !state.isRecording) {
        resolve();
        return;
      }
      mediaRecorder.onstop = async () => {
        state.isRecording = false;
        stream?.getTracks().forEach(track => track.stop());
        await transcribe();
        resolve();
      };
      mediaRecorder.stop();
    });
  }

  async function transcribe() {
    if (!chunks.length) return;
    state.isTranscribing = true;
    state.modelProgress = 0;
    try {
      const blob = new Blob(chunks, { type: mediaRecorder.mimeType });
      const audio = await blobToFloat32Audio(blob);
      const transcriber = await getTranscriber(progress => {
        if (progress.status === 'progress' && typeof progress.progress === 'number') {
          state.modelProgress = Math.round(progress.progress);
        }
      });
      const result = await transcriber(audio);
      state.transcript = (result?.text || '').trim();
    } catch (err) {
      state.error = err?.message || 'transcription-failed';
    } finally {
      state.isTranscribing = false;
    }
  }

  function reset() {
    state.transcript = '';
    state.error = null;
  }

  return { ...toRefs(state), start, stop, reset };
}
