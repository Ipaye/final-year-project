<template>
  <aside class="rail" :class="{ 'rail--collapsed': collapsed }">
    <button
      type="button"
      class="rail__toggle"
      :aria-expanded="!collapsed"
      aria-label="Toggle navigation"
      @click="$emit('toggle')"
    >
      <AppIcon name="menu" :size="20" />
    </button>

    <RouterLink to="/" class="rail__brand">
      <span class="rail__mark">S</span>
      <span class="rail__wordmark">Speeco</span>
    </RouterLink>

    <nav class="rail__nav" aria-label="Primary">
      <RouterLink to="/" class="rail__link" exact-active-class="rail__link--active">
        <AppIcon name="home" />
        <span>Home</span>
      </RouterLink>
      <RouterLink to="/notes" class="rail__link" active-class="rail__link--active">
        <AppIcon name="notes" />
        <span>Notes</span>
      </RouterLink>
      <RouterLink to="/settings" class="rail__link" active-class="rail__link--active">
        <AppIcon name="settings" />
        <span>Settings</span>
      </RouterLink>
      <RouterLink to="/credits" class="rail__link" active-class="rail__link--active">
        <AppIcon name="credits" />
        <span>Credits</span>
      </RouterLink>
      <a
        class="rail__link"
        href="https://github.com/Ipaye/final-year-project"
        target="_blank"
        rel="noopener"
      >
        <AppIcon name="docs" />
        <span>Documentation</span>
      </a>
    </nav>

    <RouterLink to="/record" class="btn btn--primary rail__cta">
      <AppIcon name="mic" :size="18" />
      <span>Record</span>
    </RouterLink>
  </aside>
</template>

<script setup>
import AppIcon from './AppIcon.vue';

defineProps({
  collapsed: { type: Boolean, default: false }
});
defineEmits(['toggle']);
</script>

<style scoped lang="scss">
.rail {
  position: fixed;
  inset: 0 auto 0 0;
  width: var(--rail-width);
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1.25rem 1rem;
  background: var(--color-paper-raised);
  border-right: 1px solid var(--color-line);
  transition: width 0.35s var(--ease-out);
  z-index: 10;
}

.rail--collapsed {
  width: var(--rail-width-collapsed);

  .rail__wordmark,
  .rail__link span,
  .rail__cta span {
    display: none;
  }

  .rail__cta {
    padding: 0;
    width: 3rem;
  }
}

.rail__toggle {
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border: 0;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--color-ink);
  cursor: pointer;

  &:hover {
    background: var(--color-ember-soft);
    color: var(--color-ember-strong);
  }
}

.rail__brand {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin: 0.75rem 0 1.5rem;
  text-decoration: none;
  color: var(--color-ink);
}

.rail__mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  flex-shrink: 0;
  border-radius: var(--radius-sm);
  background: var(--color-ink);
  color: var(--color-paper);
  font-family: var(--font-display);
  font-weight: 700;
}

.rail__wordmark {
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 700;
}

.rail__nav {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.rail__link {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.65rem 0.75rem;
  border-radius: var(--radius-sm);
  color: var(--color-ink-soft);
  text-decoration: none;
  font-size: 0.92rem;
  font-weight: 500;

  &:hover {
    background: var(--color-paper);
    color: var(--color-ink);
  }
}

.rail__link--active {
  background: var(--color-ember-soft);
  color: var(--color-ember-strong);
}

.rail__cta {
  margin-top: auto;
  width: 100%;
}

@media (max-width: 720px) {
  .rail {
    width: var(--rail-width-collapsed);
  }

  .rail__wordmark,
  .rail__link span,
  .rail__cta span {
    display: none;
  }

  .rail__cta {
    padding: 0;
    width: 3rem;
  }
}
</style>
