import { describe, expect, it } from 'vitest';
import { reduceResultEvent } from '@/composables/useSpeechRecognition';

function makeResult(transcript, isFinal) {
  const result = [{ transcript }];
  result.isFinal = isFinal;
  return result;
}

describe('reduceResultEvent', () => {
  it('separates final text from interim text', () => {
    const event = {
      resultIndex: 0,
      results: [makeResult('hello ', true), makeResult('wor', false)]
    };

    const { finals, interim } = reduceResultEvent(event);

    expect(finals).toEqual(['hello']);
    expect(interim).toBe('wor');
  });

  it('only reads from resultIndex onward, so re-processing does not duplicate old finals', () => {
    // Simulates the browser firing a second `onresult` event that only
    // covers the newly produced result — this is the case that broke the
    // original computed-property implementation.
    const event = {
      resultIndex: 1,
      results: [makeResult('hello', true), makeResult('world', true)]
    };

    const { finals } = reduceResultEvent(event);

    expect(finals).toEqual(['world']);
  });

  it('trims each final chunk', () => {
    const event = {
      resultIndex: 0,
      results: [makeResult('  padded chunk  ', true)]
    };

    expect(reduceResultEvent(event).finals).toEqual(['padded chunk']);
  });

  it('returns no finals when every result is still interim', () => {
    const event = {
      resultIndex: 0,
      results: [makeResult('typing', false)]
    };

    const { finals, interim } = reduceResultEvent(event);
    expect(finals).toEqual([]);
    expect(interim).toBe('typing');
  });
});
