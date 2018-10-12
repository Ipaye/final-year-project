import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		notes: [
			'Hello world',
			'Hello world',
			'Hello world',
			'Hello world',
			'Hello world',
			'Hello world',
			'Hello world',
			'Hello world',
			'Hello world',
			'Hello world',
			'Hello world'
		]
	},
	getters: {
		availableNotes(state, getters) {
			return state.notes;
		}
	},
	mutations: {
		addNote(state, payload) {
			console.log(payload);
			state.notes.unshift(payload);
		}
	},
	actions: {}
});
