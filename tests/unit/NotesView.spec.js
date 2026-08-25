import { describe, expect, it, beforeEach } from 'vitest';
import { mount, RouterLinkStub } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import NotesView from '@/views/NotesView.vue';
import { useNotesStore } from '@/stores/notes';

function mountView() {
  return mount(NotesView, {
    global: {
      stubs: { RouterLink: RouterLinkStub }
    }
  });
}

describe('NotesView', () => {
  beforeEach(() => {
    localStorage.clear();
    setActivePinia(createPinia());
  });

  it('shows an empty-state message when there are no notes', () => {
    const wrapper = mountView();
    expect(wrapper.text()).toContain('No notes yet');
  });

  it('renders one card per saved note, most recent first', () => {
    const store = useNotesStore();
    store.addNote('first');
    store.addNote('second');

    const wrapper = mountView();
    const cards = wrapper.findAll('.note-card');

    expect(cards).toHaveLength(2);
    expect(cards[0].text()).toContain('second');
    expect(cards[1].text()).toContain('first');
  });

  it('deletes a note when its delete button is clicked', async () => {
    const store = useNotesStore();
    store.addNote('to be deleted');

    const wrapper = mountView();
    await wrapper.find('.note-card__delete').trigger('click');

    expect(store.count).toBe(0);
    expect(wrapper.text()).toContain('No notes yet');
  });
});
