import React from "react";
import '../../../assets/styles/SampleRow.css';
import BeatPad from "./BeatPad";
import SampleInputs from './SampleInputs'

function SampleRow({ sample, onStepPadClick, onSampleRangeInput }) {

    const propsSampleInput = {
        sample,
        onSampleRangeInput
    }
    return (
        <div className="sample-row">
            < SampleInputs {...propsSampleInput} />
            <div className='sample-row-pads'>
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