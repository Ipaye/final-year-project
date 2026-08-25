import { defineStore } from 'pinia';

const STORAGE_KEY = 'speeco.notes.v1';

function loadFromDisk() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveToDisk(notes) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch {
    // Storage can be unavailable (private mode, quota) — notes still
    // work for the session, they just won't survive a refresh.
  }
}

export const useNotesStore = defineStore('notes', {
  state: () => ({
    notes: loadFromDisk()
  }),
  getters: {
    availableNotes: state => state.notes,
    count: state => state.notes.length
  },
  actions: {
    addNote(text) {
      const trimmed = (text || '').trim();
      if (!trimmed) return null;

      const note = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        text: trimmed,
        createdAt: new Date().toISOString()
      };
      this.notes.unshift(note);
      saveToDisk(this.notes);
      return note;
    },
    deleteNote(id) {
      this.notes = this.notes.filter(note => note.id !== id);
      saveToDisk(this.notes);
    },
    clearAll() {
      this.notes = [];
      saveToDisk(this.notes);
    }
  }
});
