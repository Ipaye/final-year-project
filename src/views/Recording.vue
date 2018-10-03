<template>
  <main id="mainContent">
  <section class="recording-section">
    <div class="wrapper">
      <figure class="recording-svgs">
        <div class="time">{{padNumber(minute)}}:{{padNumber(seconds)}}</div>
        <img src="../assets/img/sound.svg" class="recording__svg-overlay" alt="record icon overlay">
        <img src="../assets/img/030-microphone.svg" class="recording__svg-record" alt="record button">
        <div class="recording-button">
          <a class="btn btn--body" @click="switchState">{{state}}</a>
        </div>
      </figure>
      <div class="container">
        <textarea class="recording-container" cols="30" rows="10"> </textarea>
        
        <div class="save-button">
          <router-link to="/notes" href="/notes" class="btn btn--body">Save</router-link>
        </div>
      </div>
    </div>
  </section>
  </main>
</template>

<script>
export default {
	name: 'recording',
	data() {
		return {
			message: 'Hello world',
			toggle: false,
			state: 'Start',
			minute: 0,
			seconds: 0,
			counter: 50,
			interval: null
		};
	},
	methods: {
		switchState() {
			if (this.toggle == false) {
				this.toggle = !this.toggle;
				this.state = 'Stop';
				this.startCounting();
			} else {
				this.state = 'start';
				this.toggle = !this.toggle;
				clearInterval(this.interval);
			}
		},
		padNumber(number) {
			if (number < 10) {
				return '0' + number;
			} else {
				return number;
			}
		},
		startCounting() {
			this.interval = setInterval(() => {
				const count = ++this.counter;
				if (this.counter >= 60) {
					this.seconds = this.counter % 60;
					this.minute = parseInt(count / 60);
				} else {
					this.seconds = count;
				}
			}, 1000);
		}
	}
};
</script>