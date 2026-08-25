/**
 * Brave exposes `navigator.brave.isBrave()` on purpose, specifically so
 * sites can feature-detect it — because Brave ships the same
 * `webkitSpeechRecognition` constructor as Chrome, but blocks the network
 * round-trip to Google's speech backend for privacy reasons. The result:
 * recognition.start() succeeds, the mic permission prompt appears, and then
 * nothing ever comes back — no result, no error event.
 */
export async function isBraveBrowser() {
  try {
    return Boolean(await window.navigator?.brave?.isBrave?.());
  } catch {
    return false;
  }
}
