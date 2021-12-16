import React from "react";
import '../../../assets/styles/SampleRow.css'
import SamplePad from "./SamplePad";
import BeatPad from "./BeatPad";

function SampleRow({ sample, onSamplePadClick, onStepPadClick, onGainChange}) {
    const propsSamplePad = {
        sample,
        onSamplePadClick,
        onGainChange
    }
    return (
        <div className='sample-row'>
            < SamplePad {...propsSamplePad} />
            {sample.pattern.map( (stepState, stepNum) => {
                const props = {
                    stepNum,
                    onStepPadClick,
                    isActive: stepState,
                    sampleName: sample.name,
                    key: stepNum
                };
                return < BeatPad {...props} />;
            })}
        </div>
    )
}

export default SampleRow