<template>
  <div class="notes-view">
    <header class="notes-view__header">
      <div>
        <p class="eyebrow">{{ countLabel }}</p>
        <h1>Your notes</h1>
      </div>
      <RouterLink to="/record" class="btn btn--primary">
        <AppIcon name="mic" :size="18" />
        New recording
      </RouterLink>
    </header>

    <p v-if="!notes.length" class="notes-view__empty">
      No notes yet — record something and it'll show up here.
    </p>

    <ul v-else class="notes-grid">
      <li v-for="note in notes" :key="note.id" class="note-card">
        <p class="note-card__meta">{{ formatDate(note.createdAt) }}</p>
        <p class="note-card__text">{{ note.text }}</p>
        <button
          type="button"
          class="btn btn--danger-ghost note-card__delete"
          :aria-label="`Delete note from ${formatDate(note.createdAt)}`"
          @click="notesStore.deleteNote(note.id)"
        >
          <AppIcon name="trash" :size="16" />
          Delete
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import AppIcon from '@/components/AppIcon.vue';
import { useNotesStore } from '@/stores/notes';

const notesStore = useNotesStore();
const notes = computed(() => notesStore.availableNotes);
const countLabel = computed(() => {
  const n = notes.value.length;
  return n === 0 ? 'No notes saved' : `${n} note${n === 1 ? '' : 's'} saved`;
});

function formatDate(iso) {
  return new Date(iso).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  });
}
</script>

<style scoped lang="scss">
.notes-view__header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}

h1 {
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  margin-top: 0.25rem;
}

.notes-view__empty {
  color: var(--color-slate);
  border: 1px dashed var(--color-line);
  border-radius: var(--radius-md);
  padding: 3rem 1.5rem;
  text-align: center;
}

.notes-grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(17rem, 1fr));
  gap: 1.25rem;
}

.note-card {
  background: var(--color-paper-raised);
  border: 1px solid var(--color-line);
  border-radius: var(--radius-md);
  padding: 1.25rem;
  box-shadow: var(--shadow-card);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.note-card__meta {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--color-slate);
}

.note-card__text {
  line-height: 1.55;
  flex: 1;
  overflow-wrap: anywhere;
}

.note-card__delete {
  align-self: flex-end;
  padding: 0.4rem 0.75rem;
  height: auto;
}
</style>
