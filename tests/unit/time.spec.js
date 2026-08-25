import { describe, expect, it } from 'vitest';
import { formatTime } from '@/utils/time';

describe('formatTime', () => {
  it('zero-pads single-digit minutes and seconds', () => {
    expect(formatTime(5)).toBe('00:05');
  });

  it('formats minutes and seconds past a minute', () => {
    expect(formatTime(65)).toBe('01:05');
  });

  it('handles zero', () => {
    expect(formatTime(0)).toBe('00:00');
  });

  it('does not pad double-digit minutes', () => {
    expect(formatTime(11 * 60 + 3)).toBe('11:03');
  });

  it('floors fractional seconds and clamps negatives to zero', () => {
    expect(formatTime(5.9)).toBe('00:05');
    expect(formatTime(-4)).toBe('00:00');
  });
});
