import './PresetSelector.css';
import SelectorMenu from '../SelectorMenu/SelectorMenu';
import { useRef } from 'react';
import { useTypedSelector, useActions } from '../../hooks';
import { getPattern, savePresetsData } from '../../utils';
import { usePresets } from '../../hooks/usePresets';

const PresetSelector = () => {
	const {
		addPreset,
		updatePreset,
		removePreset,
		setActivePreset,
		loadSelectedPreset,
	} = useActions();
	const currentKit = useTypedSelector(({ sequencer }) => sequencer.currentKit);
	const presets = usePresets(currentKit);
	const activePreset = useTypedSelector(({ presets }) => presets.active);
	const ref = useRef<HTMLSelectElement>(null);

	// Select Preset
	const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const { value } = e.target;
		const name = value === 'new preset' ? null : value;
		if (name) {
			loadSelectedPreset(name, currentKit);
		}
		setActivePreset(name);
	};

	// Save Preset
	const onSave = () => {
		const name = `preset-${presets.length}`;
		const pattern = getPattern();
		if (ref?.current?.value === 'new preset') {
			addPreset(name, currentKit, pattern);
			setActivePreset(name);
		}
		if (activePreset) {
			updatePreset(activePreset, currentKit, pattern);
		}
		savePresetsData();
	};

	// Delete Preset
	const onDelete = () => {
		if (activePreset) {
			removePreset(activePreset, currentKit);
			savePresetsData();
		}
		setActivePreset(null);
	};

	return (
		<div className="preset-selector">
			<i className="fa-regular fa-floppy-disk btn" onClick={onSave}></i>
			<SelectorMenu
				ref={ref}
				options={presets}
				value={activePreset || presets[0]}
				onChange={onChange}
			/>
			<i className="fa-regular fa-trash-can" onClick={onDelete}></i>
		</div>
	);
};

export default PresetSelector;
