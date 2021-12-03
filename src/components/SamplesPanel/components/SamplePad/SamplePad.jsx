import React from "react";
import './SamplePad.css';


function SamplePad({ sampleName, onSamplePadClick, kits }) {
    return (
        <div className='sample-pad btn' onClick={onSamplePadClick}>
            <audio src={`https://raw.githubusercontent.com/nickn10/beat-sequencer/master/assets/audio/${kits.current}/${sampleName.toLowerCase()}.wav`}></audio>
            {sampleName.toUpperCase()}
        </div>
    )
}

export default SamplePad;