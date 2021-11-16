import React from "react";
import './SamplesSection.css'
import SampleRow from "./components/SampleRow/SampleRow";

function SamplesSection(props) {
    const {onBeatPadClick, samples, isPlaying, currentStep} = props
    const sampleRows = []
    for(const [i, sample] of samples.entries()) {
        sampleRows.push(
            < SampleRow
                onBeatPadClick={onBeatPadClick}
                sampleName={sample}
                isPlaying={isPlaying}
                currentStep={currentStep}
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