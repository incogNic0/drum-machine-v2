import { allKits, KitName, loadAudioBuffers } from '../state';
import { toggleIsPlaying } from '../state/action-creators';
import { useActions } from './useActions';

export const useLoadKit = () => {
	const {
		setTempo,
		loadSample,
		clearSamples,
		updateCurrentKit,
		updateSamplesBaseUrl,
	} = useActions();
	return (kitName: KitName) => {
		const kit = allKits.find((kit) => kit.name === kitName);
		if (!kit) throw ReferenceError(`Kit [${kitName}] dose not exist.`);
		toggleIsPlaying(false);
		updateCurrentKit(kit.name);
		setTempo(kit.defaultTempo);
		clearSamples();
		updateSamplesBaseUrl(kit.baseUrl);
		kit.samples.forEach((sample) => loadSample(sample));
		loadAudioBuffers();
	};
};
