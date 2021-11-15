import React from "react";
import './SamplesSection.css'
import SampleRow from "./components/SampleRow/SampleRow";

function SamplesSection({onBeatPadClick}) {
    const sampleRows = []
    for(let i=0; i<9; i++) {
        sampleRows.push(
            < SampleRow
                onBeatPadClick={onBeatPadClick}
                row={i}
                key={i}
            />
        )
    }
    return (
        <div className='samples-section'>
            {sampleRows}
        </div>
    )
}

export default SamplesSection