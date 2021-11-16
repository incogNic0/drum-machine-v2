import React from "react";
import './SamplesSection.css'
import SampleRow from "./components/SampleRow/SampleRow";

function SamplesSection(props) {
    const {onBeatPadClick, allPadsCurrentState, isPlaying, currentStep} = props
    const sampleRows = []
    let index = 0;
    for(const sample in allPadsCurrentState) {
        sampleRows.push(
            < SampleRow
                onBeatPadClick={onBeatPadClick}
                sampleName={sample}
                padsState={allPadsCurrentState[sample]}
                isPlaying={isPlaying}
                currentStep={currentStep}
                key={index}
            />
        )
        index++
    }
    return (
        <div className='samples-section'>
            {sampleRows}
        </div>
    )
}

export default SamplesSection