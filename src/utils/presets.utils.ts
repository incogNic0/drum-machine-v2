import { PresetPattern, PresetsData, store } from '../state';
import { loadPresets } from '../state/action-creators';

export const getPattern = (): PresetPattern => {
	const { samples } = store.getState();
	const pattern: PresetPattern = {};
	for (const sample of samples.order) {
		pattern[sample] = samples.data[sample].steps;
	}
	return pattern;
};

export const savePresetsData = () => {
	const { data } = store.getState().presets;
	window.localStorage.setItem('presets-data', JSON.stringify(data));
};

export const loadSavedPresets = () => {
	const data = window.localStorage.getItem('presets-data');
	if (data) {
		const presets: PresetsData = JSON.parse(data);
		store.dispatch(loadPresets(presets));
	}
};
