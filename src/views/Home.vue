<template>
<!-- <main id="mainContent"> -->
  
   <section class="home-section" >
    <figure class="homePage-image">
      <img src="../assets/img/note.svg" alt="note background image" class="home-image">
    </figure>
    <div class="home-text">
      <h1 class="primary-heading">Take <span class="m-red">notes</span> and set <span class="m-red">reminders</span>
        easily.</h1>
      <h6 class="subtitle">Transcribe voice inputs into texts. Say goodbye to lenghty lectures and forgotten
        events.
        simply record and transcribe to easily readable text.</h6>
      <router-link to="/record" class="btn btn--body">Record</router-link>
    </div>
  </section>
<!-- </main> -->
  
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
	name: 'home',
	components: {
		HelloWorld
	}
};
</script>
