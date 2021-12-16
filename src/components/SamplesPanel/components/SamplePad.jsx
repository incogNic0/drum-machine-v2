import React from "react";
import '../../../assets/styles/SamplePad.css';


function SamplePad({ sample, onSamplePadClick, onSampleRangeInput }) {
    const handleRangeEvt = (evt) => {          
        onSampleRangeInput(evt, sample.name);
    }

    const handlePadClick = (evt) => {
        const elem = evt.target.tagName;
        if (elem === 'INPUT') return;
        onSamplePadClick(sample.name);
    }

    const showPanValue = () => {
        const panValue = sample.panValue;
        let panDirection;
        if(panValue < 0) panDirection = 'L: ';
        if(panValue > 0) panDirection = 'R: '

        return panDirection ? panDirection + panValue : 'C: 0';
    }

    return (
        <div className='sample-pad btn' onClick={handlePadClick}>
            <h5>{sample.name}</h5>
            <label htmlFor={`gain-${sample.name}`}>Gain: {sample.gainValue}</label>
            <input 
                id={`gain-${sample.name}`}
                type="range" 
                min="0" 
                max="2"
                step=".01" 
                value={sample.gainValue} 
                onInput={handleRangeEvt}
                className="gain-input"
            />
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
                className="pan-input"
            />
        </div>
    )
}

export default SamplePad;