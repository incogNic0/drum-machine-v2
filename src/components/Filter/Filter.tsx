import './Filter.css';
import { useState } from 'react';
import { useActions, useTypedSelector } from '../../hooks';
import RangeInput from '../RangeInput/RangeInput';

const Filter = () => {
	const [collapse, setCollapse] = useState(true);
	const { updateFilterType, updateFilterCutoff, updateFilterResonance } =
		useActions();
	const filter = useTypedSelector(({ filter }) => filter);

	const onFilterClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		const selected = e.currentTarget.id;
		if (filter.type === selected) {
			updateFilterType(null);
		} else {
			updateFilterType(selected as BiquadFilterType);
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const range = e.target;
		const value = parseFloat(range.value);
		if (range.id === 'filter-cutoff') updateFilterCutoff(value, filter.type);
		if (range.id === 'filter-resonance')
			updateFilterResonance(value, filter.type);
	};

	return (
		<div className="filter">
			<div className="filter-header">
				<h4>Filter</h4>
				<span
					className="collapse-option"
					onClick={() => setCollapse((state) => !state)}
				>
					{collapse ? '-' : 'X'}
				</span>
			</div>
			<div className={`filter-content ${collapse ? 'collapse' : ''}`}>
				<div className="filter-selection">
					<button
						className={`filter-type ${
							filter.type === 'highpass' ? 'active' : ''
						}`}
						id="highpass"
						onClick={onFilterClick}
					>
						High Pass
					</button>
					<button
						className={`filter-type ${
							filter.type === 'lowpass' ? 'active' : ''
						}`}
						id="lowpass"
						onClick={onFilterClick}
					>
						Low Pass
					</button>
				</div>
				<div className="filter-inputs">
					<RangeInput
						label="Cutoff"
						id="filter-cutoff"
						// value={filter.cutoff}
						onChange={handleInputChange}
						step=".5"
						min="1"
						max="400"
					/>
					<RangeInput
						label="Resonance"
						id="filter-resonance"
						// value={filter.resonance}
						onChange={handleInputChange}
						step=".1"
						min="0"
						max="10"
					/>
				</div>
			</div>
		</div>
	);
};

export default Filter;
