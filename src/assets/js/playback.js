const lookahead = 25.0; // milliseconds
const scheduleAheadTime = 0.1; // seconds
let nextStepTime = 0.0;
let currentStep;
let timerID;
let stepsQueue = [];
const audioContext = new AudioContext() || new window.webkitAudioContext();
const filter = audioContext.createBiquadFilter();
let filterType = null;

export function handlePlayStop() {
	if (audioContext.state === "suspended") audioContext.resume();
	if (!this.context.isPlaying) {
		currentStep = this.context.currentStep;
		nextStepTime = audioContext.currentTime;
		scheduler.call(this);
	} else {
		clearTimeout(timerID);
	}
}

export async function getFile(filepath) {
	const res = await fetch(filepath);
	const arrayBuffer = await res.arrayBuffer();
	const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
	return audioBuffer;
}

export function playback(sample, startTime) {
	const playSound = audioContext.createBufferSource();
	const gainNode = audioContext.createGain();
	const pannerNode = audioContext.createStereoPanner();
	gainNode.gain.value = sample.effects.gainValue;
	pannerNode.pan.value = sample.effects.panValue;
	playSound.buffer = sample.audio;
  if (filterType) {
    playSound
      .connect(gainNode)
      .connect(pannerNode)
      .connect(filter)
      .connect(audioContext.destination);
  } else {
    playSound
		.connect(gainNode)
		.connect(pannerNode)
		.connect(audioContext.destination);
  }
	playSound.start(startTime); // will play when audioContext.currentTime === startTime
}

function incrementStep() {
	const secondsPerBeat = 60.0 / this.state.currentTempo / 4; // sixteenth notes
	nextStepTime += secondsPerBeat; // when the next step should play
	currentStep++;
	if (currentStep === 16) currentStep = 0; // reset after 4 quarter notes
}

// schedule playback for all active samples in the next step sequence
function scheduleSamples(step, startTime) {
	stepsQueue.push({ step, startTime });
	for (const sample of this.state.samples) {
		const isActive = sample.pattern[step];
		if (isActive) {
      filterType = this.state.filterType
			playback(sample, startTime);
		}
	}
}

// let lastStep = 15;
function scheduler() {
	const currentTime = audioContext.currentTime;
	// Schedule Audio Playback
	if (nextStepTime < currentTime + scheduleAheadTime) {
		scheduleSamples.call(this, currentStep, nextStepTime); // controls audio playback
		incrementStep.call(this);
	}

	// Increment curretnStep at specified time
	if (stepsQueue.length && stepsQueue[0].startTime < currentTime) {
		let step = stepsQueue[0].step;
		stepsQueue.shift(); // remove note from queue
		this.updateCurrentStep(step);
	}

	// continues to call scheduler every 25ms (lookahead)
	timerID = setTimeout(scheduler.bind(this), lookahead);
}

// FILTERS
export function setFilterValues(filterState) {
  const { coValue, resValue, type } = filterState;
  const qMultiplier = type === 'lowpass' ? .8 : 1.5;

  filter.type = type;
  filter.Q.value = Math.floor(resValue * qMultiplier);
  filter.frequency.value = adjustedFreq(coValue, type);
}

function adjustedFreq(val, type) {
  let multiplier;
  if (type === 'highpass') {
    if (val < 100) multiplier = 4
    if (val >= 100 && val < 200) multiplier = 5;
    if (val >= 200 && val < 300) multiplier = 6;
    if (val >= 300 && val < 350) multiplier = 8;
    if (val >= 350 && val < 400) multiplier = 10;
    if (val >= 400) multiplier = 15;

    return val * multiplier;
  }
  if (type === 'lowpass') {
    return 12050 - (val * 30);
  }
}