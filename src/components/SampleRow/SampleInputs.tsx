import { useState } from 'react';
import { useActions, useTypedSelector } from '../../hooks';
import RangeInput from '../RangeInput/RangeInput';

type SampleInputsProps = {
	sampleName: string;
};

const SampleInputs: React.FC<SampleInputsProps> = ({ sampleName }) => {
	const gain = useTypedSelector(({ samples }) => {
		return samples.data[sampleName].gain;
	});
	const { setSampleGain } = useActions();

	const updateGain = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = parseFloat(e.currentTarget.value);
		setSampleGain(sampleName, value);
	};

	return (
		<div className="sample-inputs">
			<div className="sample-input-content">
				<p>
					Gain: <span>{gain.toFixed(2)}</span>
				</p>
				<div className="sample-input-range">
					<RangeInput step="0.01" max="2" onChange={updateGain} value={gain} />
				</div>
			</div>
		</div>
	);
};

export default SampleInputs;
