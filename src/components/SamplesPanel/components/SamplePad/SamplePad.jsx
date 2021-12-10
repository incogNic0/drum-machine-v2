import React from "react";
import './SamplePad.css';


function SamplePad({ sampleName, onSamplePadClick, allKits, currentKit }) {
    return (
        <div className='sample-pad btn' onClick={onSamplePadClick}>
            <audio src={allKits[currentKit].path + sampleName.toLowerCase() + '.wav'}></audio>
            {sampleName.toUpperCase()}
        </div>
    )
}

export default SamplePad;