import React from "react";
import './SamplePad.css';


function SamplePad({ sampleName, onSamplePadClick, kits }) {
    return (
        <div className='sample-pad btn' onClick={onSamplePadClick}>
            <audio src={kits.all[kits.current].path + sampleName.toLowerCase() + '.wav'}></audio>
            {sampleName.toUpperCase()}
        </div>
    )
}

export default SamplePad;