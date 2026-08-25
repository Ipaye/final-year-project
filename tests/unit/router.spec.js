import { describe, expect, it } from 'vitest';
import router from '@/router';

describe('router', () => {
  it('registers every primary view under its expected path', () => {
    const paths = router.getRoutes().map(route => route.path);
    expect(paths).toEqual(
      expect.arrayContaining(['/', '/record', '/recording', '/notes', '/settings', '/credits'])
    );
  });

  it('exposes a /credits route matching the sidebar link (previously a broken /credit link)', () => {
    const resolved = router.resolve('/credits');
    expect(resolved.name).toBe('credits');
  });
});
