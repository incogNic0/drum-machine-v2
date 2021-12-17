import React from "react";
import '../../../assets/styles/SampleRow.css'
import SamplePad from "./SamplePad";
import BeatPad from "./BeatPad";

function SampleRow({ sample, onSamplePadClick, onStepPadClick, onSampleRangeInput }) {
    const propsSamplePad = {
        sample,
        onSamplePadClick,
        onSampleRangeInput
    }
    return (
        <div className="sample-row-container">
            <div className="sample-row-title">
                <h4>{sample.name}</h4>
            </div>
            <div className='sample-row-pads'>
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
        </div>
    )
}

export default SampleRow