<template>
  <div class="home">
    <section class="hero">
      <p class="eyebrow">Speeco · voice to text</p>
      <h1 class="hero__title">
        Say it once.<br />
        <span class="hero__title--accent">Read it forever.</span>
      </h1>
      <p class="hero__subtitle">
        Speeco listens while you talk — a lecture, a stray idea, a to-do list — and turns it
        straight into a clean text note you can search, edit, and keep.
      </p>
      <div class="hero__actions">
        <RouterLink to="/record" class="btn btn--primary">
          <AppIcon name="mic" :size="18" />
          Start recording
        </RouterLink>
        <RouterLink to="/notes" class="btn btn--ghost">Browse notes</RouterLink>
      </div>
      <div class="hero__wave">
        <Waveform :active="true" :count="34" />
      </div>
    </section>

    <section class="steps" aria-label="How Speeco works">
      <article class="step">
        <p class="step__index">01</p>
        <h3>Hit record</h3>
        <p>Open the recorder and speak normally — no scripts, no special commands.</p>
      </article>
      <article class="step">
        <p class="step__index">02</p>
        <h3>Watch it transcribe</h3>
        <p>Your words appear as text while you talk, powered by your browser or an on-device model.</p>
      </article>
      <article class="step">
        <p class="step__index">03</p>
        <h3>Save the note</h3>
        <p>One tap saves it to your notes list, stored right on this device.</p>
      </article>
    </section>
  </div>
</template>

<script setup>
import AppIcon from '@/components/AppIcon.vue';
import Waveform from '@/components/Waveform.vue';
</script>

<style scoped lang="scss">
.home {
  display: flex;
  flex-direction: column;
  gap: 4rem;
  max-width: 62rem;
}

.hero__title {
  font-size: clamp(2.5rem, 5vw, 4.25rem);
  font-weight: 700;
  line-height: 1.08;
  margin: 0.75rem 0 1.25rem;
}

.hero__title--accent {
  color: var(--color-ember);
}

.hero__subtitle {
  max-width: 34rem;
  font-size: 1.15rem;
  line-height: 1.6;
  color: var(--color-ink-soft);
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
  margin: 1.75rem 0 2.5rem;
}

.hero__wave {
  height: 4.5rem;
  max-width: 30rem;
}

.steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  gap: 1.5rem;
  border-top: 1px solid var(--color-line);
  padding-top: 2.5rem;
}

.step__index {
  font-family: var(--font-mono);
  color: var(--color-slate);
  font-size: 0.85rem;
  margin-bottom: 0.6rem;
}

.step h3 {
  font-size: 1.15rem;
  margin-bottom: 0.4rem;
}

.step p:last-child {
  color: var(--color-ink-soft);
  line-height: 1.55;
}
</style>
