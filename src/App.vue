<template>
  <div class="shell">
    <AppSidebar :collapsed="collapsed" @toggle="collapsed = !collapsed" />
    <main class="shell__content" :class="{ 'shell__content--collapsed': collapsed }">
      <RouterView v-slot="{ Component, route }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" :key="route.path" />
        </Transition>
      </RouterView>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import AppSidebar from '@/components/AppSidebar.vue';

const collapsed = ref(false);
</script>

<style lang="scss">
@use '@/assets/styles/main.scss';
</style>

<style scoped lang="scss">
.shell {
  min-height: 100vh;
}

.shell__content {
  margin-left: var(--rail-width);
  min-height: 100vh;
  padding: clamp(1.5rem, 3vw, 3.5rem);
  transition: margin-left 0.35s var(--ease-out);
}

.shell__content--collapsed {
  margin-left: var(--rail-width-collapsed);
}

@media (max-width: 720px) {
  .shell__content {
    margin-left: var(--rail-width-collapsed);
    padding: 1.25rem;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.18s var(--ease-out);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
