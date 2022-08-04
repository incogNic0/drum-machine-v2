import { useState } from 'react';
import RangeInput from '../RangeInput/RangeInput';

const SampleInputs = () => {
	const [gain, setGain] = useState(1.0);

	const updateGain = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = parseFloat(e.currentTarget.value);
		setGain(value);
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
