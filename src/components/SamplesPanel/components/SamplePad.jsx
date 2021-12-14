import React from "react";
import '../../../assets/styles/SamplePad.css';


function SamplePad({ sampleData, onSamplePadClick }) {
    return (
        <div className='sample-pad btn' onClick={onSamplePadClick}>
            <audio src={sampleData.url} id={sampleData.name} crossOrigin="anonymous"></audio>
            {sampleData.name}
        </div>
    )
}

export default SamplePad;