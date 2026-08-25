import { describe, expect, it } from 'vitest';
import { resolveEngine } from '@/utils/engine';

describe('resolveEngine', () => {
  it('respects an explicit "browser" choice even without native support', () => {
    expect(resolveEngine({ settingEngine: 'browser', nativeSupported: false, isBrave: false })).toBe(
      'browser'
    );
  });

  it('respects an explicit "whisper" choice even with native support', () => {
    expect(resolveEngine({ settingEngine: 'whisper', nativeSupported: true, isBrave: false })).toBe(
      'whisper'
    );
  });

  it('auto picks the browser engine when native support exists and it is not Brave', () => {
    expect(resolveEngine({ settingEngine: 'auto', nativeSupported: true, isBrave: false })).toBe(
      'browser'
    );
  });

  it('auto falls back to whisper when there is no native support', () => {
    expect(resolveEngine({ settingEngine: 'auto', nativeSupported: false, isBrave: false })).toBe(
      'whisper'
    );
  });

  it('auto falls back to whisper on Brave even though the constructor exists', () => {
    expect(resolveEngine({ settingEngine: 'auto', nativeSupported: true, isBrave: true })).toBe(
      'whisper'
    );
  });
});
