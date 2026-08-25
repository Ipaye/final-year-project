<template>
  <div class="credits-view">
    <p class="eyebrow">Credits</p>
    <h1>Made by Ipaye Alameen</h1>
    <p class="credits-view__copy">
      Speeco started as a final-year project exploring how far browser-native speech recognition
      could take a simple note-taking tool — and how a fallback on-device AI model could make it
      work everywhere else.
    </p>

    <dl class="credits-list">
      <div class="credits-list__row">
        <dt>Design &amp; development</dt>
        <dd><a href="https://ipaye.github.io" target="_blank" rel="noopener">Ipaye Alameen</a></dd>
      </div>
      <div class="credits-list__row">
        <dt>Source</dt>
        <dd>
          <a href="https://github.com/Ipaye/final-year-project" target="_blank" rel="noopener">
            github.com/Ipaye/final-year-project
          </a>
        </dd>
      </div>
      <div class="credits-list__row">
        <dt>Built with</dt>
        <dd>Vue 3, Pinia, Vite &amp; the Web Speech / Transformers.js APIs</dd>
      </div>
      <div class="credits-list__row">
        <dt>License</dt>
        <dd>MIT</dd>
      </div>
    </dl>
  </div>
</template>

<style scoped lang="scss">
.credits-view {
  max-width: 34rem;
}

h1 {
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  margin: 0.25rem 0 1rem;
}

.credits-view__copy {
  color: var(--color-ink-soft);
  line-height: 1.6;
  margin-bottom: 2.5rem;
}

.credits-list {
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
  margin: 0;
}

.credits-list__row {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  padding-bottom: 1.1rem;
  border-bottom: 1px solid var(--color-line);
}

dt {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-slate);
}

dd {
  margin: 0;
  font-weight: 500;
}

a {
  color: var(--color-ember-strong);
  text-decoration: underline;
  text-underline-offset: 3px;
}
</style>
