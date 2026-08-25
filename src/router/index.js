import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/record',
    name: 'record',
    component: () => import('@/views/RecordView.vue')
  },
  {
    path: '/recording',
    name: 'recording',
    component: () => import('@/views/RecordingView.vue')
  },
  {
    path: '/notes',
    name: 'notes',
    component: () => import('@/views/NotesView.vue')
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('@/views/SettingsView.vue')
  },
  {
    path: '/credits',
    name: 'credits',
    component: () => import('@/views/CreditsView.vue')
  }
];

const router = createRouter({
  // Hash history keeps deep links working from a plain `file://` load
  // in the Electron build, and from GitHub Pages without server rewrites.
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 })
});

export default router;
