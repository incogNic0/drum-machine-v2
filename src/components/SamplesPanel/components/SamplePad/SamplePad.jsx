import React from "react";
import './SamplePad.css'

function SamplePad({ sampleName }) {
    return (
        <div className='sample-pad btn'>{sampleName.toUpperCase()}</div>
    )
}

export default SamplePad;