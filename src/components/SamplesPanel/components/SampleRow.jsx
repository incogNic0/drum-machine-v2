import React from "react";
import '../../../assets/styles/SampleRow.css';
import '../../../assets/styles/RangeInputs.scss';
import SamplePad from "./SamplePad";
import BeatPad from "./BeatPad";
import SampleInputs from './SampleInputs'

function SampleRow({ sample, onSamplePadClick, onStepPadClick, onSampleRangeInput }) {
    const propsSamplePad = {
        sample,
        onSamplePadClick,
    }

    const propsSampleInput = {
        sample,
        onSampleRangeInput
    }
    return (
        <div className="sample-row">
            < SampleInputs {...propsSampleInput} />
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