import React from "react";
import './SamplesSection.css'
import SampleRow from "./components/SampleRow/SampleRow";

function SamplesSection(props) {
    const sampleRows = [];
    for(const sample in props.allPadsCurrentState) {
        const propsSampleRow = { 
            ...props,
            audio: props.allPadsCurrentState[sample].audio,
            key: sample,
            allPadsState: props.allPadsCurrentState[sample],
            sampleName: sample
        }
        sampleRows.push(< SampleRow {...propsSampleRow} />)
    }
    return (
        <div className='samples-section'>
            {sampleRows}
        </div>
    )
}

export default SamplesSection