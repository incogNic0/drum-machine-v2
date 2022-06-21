import { useTypedSelector } from './useTypedSelector';

export const useIsPlaying = () => {
	return useTypedSelector(({ sequencer }) => sequencer.isPlaying);
};
