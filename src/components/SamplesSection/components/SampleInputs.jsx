import React, {useState} from "react";
import "../../../assets/styles/SampleInputs.css";

function SampleInputs({ sample, onSampleRangeInput }) {
  const [hideInputs, sethideInputs] = useState(false);

  const handleDisplayClick = () => {
    sethideInputs(prev => !prev);
  }
	const handleRangeEvt = (evt) => {
		onSampleRangeInput(evt, sample.name);
	};

	return (
		<div className="sample-inputs-container">
      <h4>
        {sample.name}
        <span 
          className="sample-display-option"
          onClick={handleDisplayClick}
        >
          {hideInputs ? 'show' : 'hide'}
        </span>
      </h4>
			<div className={`sample-inputs-content ${hideInputs ? 'hidden' : ''}`}>
				<div className="sample-input">
					<label htmlFor={`gain-${sample.name}`}>
						Gain: {sample.effects.gainValue}
					</label>
					<input
						id={`gain-${sample.name}`}
						type="range"
						min="0"
						max="2"
						step=".01"
						value={sample.effects.gainValue}
						onInput={handleRangeEvt}
						className="gain-input rs-range"
            name="gainValue"
					/>
				</div>
				<div className="sample-input">
					<label htmlFor={`pan-${sample.name}`}>
						Pan: {sample.effects.panValue}
					</label>
					<input
						id={`panner-${sample.name}`}
						type="range"
						min="-1"
						max="1"
						step=".01"
						value={sample.effects.panValue}
						onInput={handleRangeEvt}
						className="pan-input rs-range"
            name="panValue"
					/>
				</div>
			</div>
		</div>
	);
}

export default SampleInputs;
