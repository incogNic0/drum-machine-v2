import { store } from '../store';

export const getAudioFile = async (filepath: string) => {
	const context = window.audioContext;
	const res = await fetch(filepath, { cache: 'no-cache' });
	const arrayBuffer = await res.arrayBuffer();
	const audioBuffer = await context.decodeAudioData(arrayBuffer);
	return audioBuffer;
};

export const loadAudioBuffers = async () => {
	const {
		sequencer: { currentKit },
		samples,
	} = store.getState();
	if (samples.order.length && !window.audioBuffers[currentKit]) {
		window.audioBuffers[currentKit] = {};
		for (const name of samples.order) {
			const audioBuffer = await getAudioFile(samples.data[name].path);
			window.audioBuffers[currentKit][name] = audioBuffer;
		}
	}
};

export const adjustFilterFreq = (
	val: number,
	filter: BiquadFilterType | null
) => {
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
