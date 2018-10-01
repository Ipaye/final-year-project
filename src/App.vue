<template>
  <div id="app">
     <aside id="sidebar" :class="{active: active}">
      <div class="sidebar__hamburger">
        <img src="./assets/img/hamburger.svg" alt="humburger icon" @click="active = !active" class="icon icon--sidebar">
      </div>
      <div class="sidebar__brand">
        <img src="./assets/img/speeco-logo.png" alt="speeco logo" class="brand-logo">
      </div>
      <div>
        <div class="sidebar__navigation">
          <li href="#" class="sidebar__navigation-item">
            <img src="./assets/img/edit.svg" class="icon icon--documentation" alt="documentation icon">
            <p class="sidebar__navigation--text">Documentation</p>
          </li>
          <li href="#" class="sidebar__navigation-item">
            <img src="./assets/img/file.svg" class="icon icon--setting" alt="file icon">
            <p class="sidebar__navigation--text">Notes</p>
          </li>
          <li href="#" class="sidebar__navigation-item">
            <img src="./assets/img/user.svg" class="icon icon--credits" alt="credits icon">
            <p class="sidebar__navigation--text">Credits</p>
          </li>
        </div>
      </div>
      <div class="sidebar__btn">
        <a href="#" class="btn btn--sidebar">Record</a>
      </div>

      <div class="sidebar__setting">
        <img src="./assets/img/cogwheel-outline.svg" class="icon icon--setting" alt="setting icon">
        <p class="sidebar__navigation--text">Setting</p>
      </div>

    </aside>
     <main id="mainContent">  
    </main>
    <img src="/img/UnderBucket.svg" class="buttomBucket none" alt="floating bucket">

    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view/>
  </div>
</template>

<script>
export default {
	data: () => ({
		active: true
	}),
	methods: {
		/* toggleSidebar() {
			const ham = document.querySelector('.icon--sidebar');
			const sidebar = document.querySelector('#sidebar');
			ham.addEventListener('click', () => {
				sidebar.classList.toggle('active');
			});
		} */
	}
};
</script>
