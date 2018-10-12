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
        <div class="words" contenteditable="true"> {{removeDuplicates}} </div>
        
        <div class="save-button">
          <div class="btn btn--body" @click="addToNote">Save</div>
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
			message: '',
			toggle: false,
			state: 'Start',
			minute: 0,
			recognition: null,
			seconds: 0,
			counter: 0,
			transcript: [],
			interval: null
		};
	},
	methods: {
		addToNote() {
			// console.log(this.message);
			this.$store.commit('addNote', this.message);
			this.$router.push('notes');
			this.message = '';
		},
		switchState() {
			if (this.toggle == false) {
				this.toggle = !this.toggle;
				this.state = 'Stop';
				this.startCounting();
				this.recordAudio;
			} else {
				this.state = 'start';
				this.toggle = !this.toggle;
				this.stopRecording;
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
	},
	computed: {
		recordAudio() {
			let values;
			let value;
			const dictate = () => {
				this.recognition.start();
				this.recognition.onresult = event => {
					for (const value of event.results) {
						// console.log(value.isFinal);
						if (value.isFinal == true) {
							self = this;
							self.transcript.push(value[0].transcript);
						}
					}
				};
			};
			dictate();
		},
		removeDuplicates() {
			let tempArray = this.transcript;
			const values = [];
			let newD = tempArray.filter(function(item, index) {
				return tempArray.indexOf(item) >= index;
			});
			console.log(newD);
			let data = newD.join(',');
			return (this.message = data);
		},
		stopRecording() {
			this.recognition.stop();
		}
	},
	created() {
		window.SpeechRecognition =
			window.webkitSpeechRecognition || window.SpeechRecognition;
		this.recognition = new SpeechRecognition();
		this.recognition.interimResults = true;
		this.recognition.continuous = true;
		this.recognition.lang = 'en-ng';

		console.log(this.recognition);
	}
};
</script>
<style lang="scss" scoped>
.words {
	max-width: 700px;
	max-height: 600px;
	overflow: auto;
	margin: 50px 0;
	background: white;
	border-radius: 5px;
	font-size: 2rem;
	font-weight: 400;
	box-shadow: 10px 10px 0 rgba(0, 0, 0, 0.1);
	padding: 1rem 2rem 1rem 5rem;
	background: -webkit-gradient(
			linear,
			0 0,
			0 100%,
			from(#d9eaf3),
			color-stop(4%, #fff)
		)
		0 4px;
	background-size: 100% 3rem;
	position: relative;
	line-height: 3rem;
}

p {
	margin: 0 0 3rem;
}

.words:before {
	content: '';
	position: absolute;
	width: 4px;
	top: 0;
	left: 30px;
	bottom: 0;
	border: 1px solid;
	border-color: transparent #efe4e4;
}
</style>
