import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import Waveform from '@/components/Waveform.vue';

describe('Waveform', () => {
  it('renders the requested number of bars', () => {
    const wrapper = mount(Waveform, { props: { count: 10 } });
    expect(wrapper.findAll('.waveform__bar')).toHaveLength(10);
  });

  it('is idle (no live class) by default and live when active', () => {
    const idle = mount(Waveform);
    expect(idle.classes()).not.toContain('waveform--live');

    const live = mount(Waveform, { props: { active: true } });
    expect(live.classes()).toContain('waveform--live');
  });

  it('produces the same bar heights on every render (no layout jump)', () => {
    const a = mount(Waveform, { props: { count: 6 } });
    const b = mount(Waveform, { props: { count: 6 } });

    const heights = wrapper => wrapper.findAll('.waveform__bar').map(bar => bar.attributes('style'));
    expect(heights(a)).toEqual(heights(b));
  });
});
