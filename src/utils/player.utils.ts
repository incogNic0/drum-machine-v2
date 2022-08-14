import { store } from '../state';
import { incrementStep } from '../state/action-creators';

const MAX_FREQUENCY = 22050;

const { getState } = store;
const LOOK_AHEAD = 25.0; // milliseconds
const SCHEDULE_AHEAD = 0.1; // seconds
let nextStepTime = 0.0;
let currentStep: number;
let timerID: NodeJS.Timeout;
let stepsQueue: number[] = [];
let audioContext: AudioContext;

export const handlePlayback = (isPlaying: boolean) => {
	if (window.audioContext) {
		audioContext = window.audioContext;
		if (audioContext.state === 'suspended') audioContext.resume();
		if (isPlaying) {
			currentStep = 0;
			nextStepTime = audioContext.currentTime;
			scheduler();
		} else {
			clearTimeout(timerID);
		}
	}
};

const playback = (sample: string, startTime: number) => {
	const { currentKit } = getState().sequencer;
	const filterType = getState().filter.type;
	const gainValue = getState().samples.data[sample].gain;
	const filter = window.audioFilter;
	const playSound = audioContext.createBufferSource();
	playSound.buffer = window.audioBuffers[currentKit][sample];
	const gainNode = audioContext.createGain();
	gainNode.gain.value = gainValue;
	console.log(gainNode);
	// TODO: NEED TO ADD UI COMPONENT
	// const pannerNode = audioContext.createStereoPanner();
	// pannerNode.pan.value = sample.effects.panValue;
	if (filterType) {
		filter.type = filterType;
		playSound
			// .connect(pannerNode)
			.connect(gainNode)
			.connect(filter)
			.connect(audioContext.destination);
	} else {
		playSound
			// .connect(pannerNode)
			.connect(gainNode)
			.connect(audioContext.destination);
	}
	playSound.start(startTime); // will play when audioContext.currentTime === startTime
};

const updateNextStepTime = () => {
	const { tempo } = getState().sequencer;
	const secondsPerBeat = 60.0 / tempo / 4; // sixteenth notes
	nextStepTime += secondsPerBeat; // when the next step should play
	currentStep++;
	if (currentStep > 15) currentStep = 0; // reset after 4 quarter notes
};

// schedule playback for all active samples in the next step sequence
const scheduleSamples = (step: number, startTime: number) => {
	const { samples } = store.getState();
	stepsQueue.push(startTime);
	for (const sampleName of samples.order) {
		const sample = samples.data[sampleName];
		const isActive = sample.steps[step];
		if (!sample.mute && isActive) {
			// filterType = this.state.filterType
			playback(sampleName, startTime);
		}
	}
};

// let lastStep = 15;
const scheduler = () => {
	const currentTime = audioContext.currentTime;
	// Schedule Audio Playback
	if (nextStepTime < currentTime + SCHEDULE_AHEAD) {
		scheduleSamples(currentStep, nextStepTime); // controls audio playback
		updateNextStepTime();
	}

	// Increment curretnStep at specified time
	if (stepsQueue.length && stepsQueue[0] < currentTime) {
		stepsQueue.shift(); // remove note from queue
		store.dispatch(incrementStep());
	}

	// continues to call scheduler every 25ms (lookahead)
	timerID = setTimeout(scheduler, LOOK_AHEAD);
};

// FILTERS
export const setFilterCutoff = (
	type: BiquadFilterType | null = 'lowpass',
	cutoff?: number
) => {
	if (cutoff === undefined) {
	} else {
		const value = adjustedFreq(cutoff, type);
		window.audioFilter.frequency.value = Math.min(value, MAX_FREQUENCY);
	}
};

export const setFilterResonance = (
	type: BiquadFilterType | null,
	resonance?: number
) => {
	resonance = resonance || window.audioFilter.Q.value || 0;
	const qMultiplier = type === 'lowpass' ? 0.8 : 1.5;
	window.audioFilter.Q.value = Math.floor(resonance * qMultiplier);
};

export const adjustedFreq = (val: number, filter: BiquadFilterType | null) => {
	if (filter === 'highpass') {
		let multiplier = 4;
		if (val >= 100 && val < 200) multiplier = 5;
		if (val >= 200 && val < 300) multiplier = 6;
		if (val >= 300 && val < 350) multiplier = 8;
		if (val >= 350 && val < 400) multiplier = 10;
		if (val >= 400) multiplier = 15;
		return val * multiplier;
	}
	if (filter === 'lowpass') {
		return 12050 - val * 30;
	}
	return 0;
};
