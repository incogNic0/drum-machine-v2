import React from "react";
import '../../../assets/styles/SamplePad.css';


function SamplePad({ sample, onSamplePadClick, onGainChange }) {
    const handleGainEvt = (evt) => {
        const newValue = evt.target.value;
        onGainChange(sample.name, newValue);
    }

    const handlePadClick = (evt) => {
        if (evt.target.classList.contains('gain-input')) return;
        onSamplePadClick(sample.name, evt.target.value);
    }

    return (
        <div className='sample-pad btn' onClick={handlePadClick}>
            <audio src={sample.url} id={sample.name} crossOrigin="anonymous"></audio>
            <h5>{sample.name}</h5>
            <label htmlFor={`gain-${sample.name}`}>Gain - {sample.gainValue}</label>
            <input 
                type="range" 
                min="0" 
                max="2"
                step=".01" 
                value={sample.gainValue} 
                onInput={handleGainEvt}
                className="gain-input"
            />
        </div>
    )
}

export default SamplePad;