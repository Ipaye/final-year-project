/**
 * Decides which transcription engine to use. Pulled out as a pure function
 * so the (surprisingly tricky) auto-selection logic — especially the Brave
 * special case — can be unit tested without mounting a component.
 */
export function resolveEngine({ settingEngine, nativeSupported, isBrave }) {
  if (settingEngine === 'browser') return 'browser';
  if (settingEngine === 'whisper') return 'whisper';

  // 'auto'
  if (!nativeSupported) return 'whisper';
  // Brave has the constructor but silently drops the speech-recognition
  // network request, so treat it like "not supported" for auto-selection.
  if (isBrave) return 'whisper';
  return 'browser';
}
