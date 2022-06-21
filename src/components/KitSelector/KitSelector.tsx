import './KitSelector.css';
import SelectorMenu from '../SelectorMenu/SelectorMenu';
import { useTypedSelector, useActions, useLoadKit } from '../../hooks';
import { KitName } from '../../state';

const KitSelector = () => {
	const { updateCurrentKit, toggleIsPlaying } = useActions();
	const loadKit = useLoadKit();
	const kits = useTypedSelector(({ sequencer }) => sequencer.kits);
	const currentKit = useTypedSelector(({ sequencer }) => sequencer.currentKit);

	const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const kitName = e.target.value as KitName;
		toggleIsPlaying(false);
		updateCurrentKit(kitName);
		loadKit(kitName);
	};

	return (
		<div className="kit-selector">
			<SelectorMenu
				options={[...kits]}
				value={currentKit}
				onChange={onChange}
			/>
		</div>
	);
};

export default KitSelector;
