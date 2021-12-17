import React from "react";
import '../../../assets/styles/SamplePad.css';
// import '../../../assets/styles/RangeInputs.scss';

function SamplePad({ sample, onSamplePadClick }) {
    const handlePadClick = (evt) => {
        const elem = evt.target.tagName;
        if (elem === 'INPUT') return;
        onSamplePadClick(sample.name);
    }

    return (
        <div className='sample-pad btn' onClick={handlePadClick}>
            <h5>{sample.name}</h5>
        </div>
    )
}

export default SamplePad;
