<template>
  <svg
    class="app-icon"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.8"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <g v-html="paths[name] || ''" />
  </svg>
</template>

<script setup>
defineProps({
  name: { type: String, required: true },
  size: { type: [Number, String], default: 22 }
});

// A small, hand-picked icon set — kept in one place so every icon in the
// app shares the same stroke weight and corner style.
const paths = {
  menu: '<path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h10" />',
  home: '<path d="M4 11.5 12 4l8 7.5" /><path d="M6 10v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-9" /><path d="M10 20v-5h4v5" />',
  mic: '<rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0" /><path d="M12 18v3" /><path d="M9 21h6" />',
  notes: '<path d="M6 3h9l5 5v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" /><path d="M15 3v5h5" /><path d="M8 13h8" /><path d="M8 17h5" />',
  settings: '<circle cx="12" cy="12" r="3.2" /><path d="M19.4 13.5a7.7 7.7 0 0 0 0-3l2-1.4-2-3.4-2.3.8a7.8 7.8 0 0 0-2.6-1.5L14 2.5h-4l-.5 2.5a7.8 7.8 0 0 0-2.6 1.5l-2.3-.8-2 3.4 2 1.4a7.7 7.7 0 0 0 0 3l-2 1.4 2 3.4 2.3-.8a7.8 7.8 0 0 0 2.6 1.5l.5 2.5h4l.5-2.5a7.8 7.8 0 0 0 2.6-1.5l2.3.8 2-3.4Z" />',
  credits: '<circle cx="12" cy="8.5" r="3.5" /><path d="M5 20a7 7 0 0 1 14 0" />',
  docs: '<path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" /><path d="M14 3v5h5" /><path d="M14 21v-7l7 3" />',
  trash: '<path d="M4 7h16" /><path d="M9 7V4h6v3" /><path d="M6 7l1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13" /><path d="M10 11v6" /><path d="M14 11v6" />',
  close: '<path d="M6 6l12 12" /><path d="M18 6 6 18" />',
  arrowRight: '<path d="M5 12h14" /><path d="M13 6l6 6-6 6" />',
  cloud: '<path d="M7 18a4.5 4.5 0 0 1-.6-8.96 5.5 5.5 0 0 1 10.8-1.2A4 4 0 0 1 17 18H7Z" />',
  chip: '<rect x="7" y="7" width="10" height="10" rx="1.5" /><path d="M9 3v3" /><path d="M15 3v3" /><path d="M9 18v3" /><path d="M15 18v3" /><path d="M3 9h3" /><path d="M3 15h3" /><path d="M18 9h3" /><path d="M18 15h3" />'
};
</script>

<style scoped>
.app-icon {
  display: block;
  flex-shrink: 0;
}
</style>
