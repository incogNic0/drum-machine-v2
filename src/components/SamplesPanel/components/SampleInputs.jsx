import React from "react";
import '../../../assets/styles/RangeInputs.scss';

function SampleInputs({ sample, onSampleRangeInput }) {
    const handleRangeEvt = (evt) => {          
        onSampleRangeInput(evt, sample.name);
    }

    const showPanValue = () => {
        const panValue = sample.panValue;
        let panDirection;
        if(panValue < 0) panDirection = 'L: ';
        if(panValue > 0) panDirection = 'R: '

        return panDirection ? panDirection + panValue : 'C: 0';
    }

    return(
        <div className="sample-row-inputs">
            <div className="sample-input">
                <label htmlFor={`gain-${sample.name}`}>Gain: {sample.gainValue}</label>
                <input 
                    id={`gain-${sample.name}`}
                    type="range" 
                    min="0" 
                    max="2"
                    step=".01" 
                    value={sample.gainValue} 
                    onInput={handleRangeEvt}
                    className="gain-input rs-range"
                />
            </div>
            <div className="sample-input">
                <label htmlFor={`pan-${sample.name}`}>
                    {showPanValue()}
                </label>
                <input 
                    id={`panner-${sample.name}`}
                    type="range" 
                    min="-1" 
                    max="1"
                    step=".01" 
                    value={sample.panValue}
                    onInput={handleRangeEvt}
                    className="pan-input rs-range"
                />
            </div>
        </div>
    )
}

export default SampleInputs;