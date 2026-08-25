import { beforeEach, describe, expect, it } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useNotesStore } from '@/stores/notes';

describe('notes store', () => {
  beforeEach(() => {
    localStorage.clear();
    setActivePinia(createPinia());
  });

  it('starts empty when nothing is in storage', () => {
    const store = useNotesStore();
    expect(store.availableNotes).toEqual([]);
    expect(store.count).toBe(0);
  });

  it('adds a note to the front of the list', () => {
    const store = useNotesStore();
    store.addNote('first note');
    store.addNote('second note');

    expect(store.availableNotes).toHaveLength(2);
    expect(store.availableNotes[0].text).toBe('second note');
    expect(store.availableNotes[1].text).toBe('first note');
  });

  it('trims whitespace and ignores empty text', () => {
    const store = useNotesStore();
    const note = store.addNote('  padded  ');
    expect(note.text).toBe('padded');

    expect(store.addNote('   ')).toBeNull();
    expect(store.addNote('')).toBeNull();
    expect(store.count).toBe(1);
  });

  it('assigns each note a unique id and an ISO timestamp', () => {
    const store = useNotesStore();
    const a = store.addNote('a');
    const b = store.addNote('b');

    expect(a.id).not.toBe(b.id);
    expect(() => new Date(a.createdAt).toISOString()).not.toThrow();
  });

  it('deletes a note by id', () => {
    const store = useNotesStore();
    const a = store.addNote('a');
    store.addNote('b');

    store.deleteNote(a.id);

    expect(store.count).toBe(1);
    expect(store.availableNotes.find(n => n.id === a.id)).toBeUndefined();
  });

  it('clears all notes', () => {
    const store = useNotesStore();
    store.addNote('a');
    store.addNote('b');

    store.clearAll();

    expect(store.availableNotes).toEqual([]);
  });

  it('persists notes to localStorage across store instances', () => {
    const store = useNotesStore();
    store.addNote('persisted note');

    setActivePinia(createPinia());
    const reloaded = useNotesStore();

    expect(reloaded.availableNotes).toHaveLength(1);
    expect(reloaded.availableNotes[0].text).toBe('persisted note');
  });
});
