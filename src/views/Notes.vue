<template>
  <main id="mainContent">
   <section class="note-section">
        <div class="note-image">
          <img src="../assets/img/Top-icon-svg.svg" class="top-note-image" alt="Note icon">
        </div>
        <div class="notes">
          <div class="note" v-for="(note, index) in notes" :key="index">
            <div class="note__content"> {{note}} </div>
            <div class="note__footer">
              <div class="note__footer--left">Note Saved</div>
              <div class="note__footer--right">Save Delete </div>
            </div>
          </div>
        </div>
      </section>
    </main>
</template>
<script>
import store from '@/store';
export default {
	name: 'note',
	data() {
		return {
			notes: []
		};
	},
	methods: {
		displayNotes() {
			this.notes = store.getters.availableNotes;
			// return store.getters.availableNotes;
		}
	},
	created: function() {
		this.displayNotes();
	}
};
</script>
