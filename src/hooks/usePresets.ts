import { KitName } from '../state';
import { useTypedSelector } from './useTypedSelector';

export const usePresets = (kit: KitName) => {
	return useTypedSelector(({ presets }) => {
		return presets.data[kit].reduce(
			(prev, current) => {
				prev.push(current.name);
				return prev;
			},
			['new preset']
		);
	});
};
