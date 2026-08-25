import { describe, expect, it } from 'vitest';
import { mount, RouterLinkStub } from '@vue/test-utils';
import HomeView from '@/views/HomeView.vue';

describe('HomeView', () => {
  it('renders the hero headline and a link into the recorder', () => {
    const wrapper = mount(HomeView, {
      global: { stubs: { RouterLink: RouterLinkStub } }
    });

    expect(wrapper.text()).toContain('Say it once.');
    const recordLink = wrapper.findAllComponents(RouterLinkStub).find(link => link.props('to') === '/record');
    expect(recordLink).toBeTruthy();
  });

  it('lists the three-step how-it-works sequence', () => {
    const wrapper = mount(HomeView, {
      global: { stubs: { RouterLink: RouterLinkStub } }
    });

    expect(wrapper.findAll('.step')).toHaveLength(3);
  });
});
