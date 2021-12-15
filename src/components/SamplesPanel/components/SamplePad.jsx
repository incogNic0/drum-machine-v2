import React from "react";
import '../../../assets/styles/SamplePad.css';


function SamplePad({ sample, onSamplePadClick }) {
    return (
        <div className='sample-pad btn' onClick={onSamplePadClick}>
            <audio src={sample.url} id={sample.name} crossOrigin="anonymous"></audio>
            {sample.name}
        </div>
    )
}

export default SamplePad;