<template>
  <div
    class="waveform"
    :class="[{ 'waveform--live': active }, `waveform--${tone}`]"
    role="img"
    :aria-label="ariaLabel"
  >
    <span
      v-for="bar in bars"
      :key="bar.i"
      class="waveform__bar"
      :style="{
        '--h': bar.h + '%',
        '--delay': bar.delay + 's',
        '--dur': bar.dur + 's'
      }"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  active: { type: Boolean, default: false },
  count: { type: Number, default: 24 },
  tone: { type: String, default: 'ember' } // 'ember' | 'signal'
});

const ariaLabel = computed(() =>
  props.active ? 'Listening — audio waveform is live' : 'Audio waveform, idle'
);

// Deterministic pseudo-random heights so the bars look organic but the
// render is stable (no layout jump on re-render).
const bars = computed(() => {
  const seedBase = 37;
  return Array.from({ length: props.count }, (_, i) => {
    const seed = Math.sin(i * seedBase) * 10000;
    const rand = seed - Math.floor(seed);
    return {
      i,
      h: 22 + Math.round(rand * 68),
      delay: Number((rand * 0.6).toFixed(2)),
      dur: Number((0.7 + rand * 0.6).toFixed(2))
    };
  });
});
</script>

<style scoped lang="scss">
.waveform {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  height: 100%;
  width: 100%;
}

.waveform__bar {
  flex: 1 1 0;
  min-width: 3px;
  max-width: 8px;
  height: var(--h);
  border-radius: 999px;
  background: var(--color-ink-soft);
  opacity: 0.35;
  transform-origin: center;
  transition: background 0.3s var(--ease-out);
}

.waveform--live.waveform--ember .waveform__bar {
  background: var(--color-ember);
  opacity: 1;
  animation: bounce var(--dur) ease-in-out var(--delay) infinite alternate;
}

.waveform--live.waveform--signal .waveform__bar {
  background: var(--color-signal);
  opacity: 1;
  animation: bounce var(--dur) ease-in-out var(--delay) infinite alternate;
}

@keyframes bounce {
  from {
    transform: scaleY(0.35);
  }
  to {
    transform: scaleY(1);
  }
}
</style>
