import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Notes from './views/Notes.vue';
import Record from './views/Record.vue';
import Recording from './views/Recording.vue';
import Settings from './views/Settings.vue';

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home
		},
		{
			path: '/notes',
			name: 'notes',
			component: Notes
		},
		{
			path: '/settings',
			name: 'settings',
			component: Settings
		},
		{
			path: '/record',
			name: 'record',
			component: Record
		},
		{
			path: '/recording',
			name: 'recording',
			component: Recording
		},
		{
			path: '/credit',
			name: 'credit',
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () =>
				import(/* webpackChunkName: "about" */ './views/Credit.vue')
		}
	]
});
