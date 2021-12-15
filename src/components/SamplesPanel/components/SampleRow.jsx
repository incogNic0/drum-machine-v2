import React from "react";
import '../../../assets/styles/SampleRow.css'
import SamplePad from "./SamplePad";
import BeatPad from "./BeatPad";

function SampleRow({ sampleData, onSamplePadClick, onStepPadClick}) {
    const generateStepPads = () => {
        const stepPadsArray = []
        let step = 0;
        for (const stepState of sampleData.pattern) {
            const props = {
                sampleData,
                onStepPadClick: onStepPadClick,
                isActive: stepState,
                step,
                key: step
            }
            stepPadsArray.push(< BeatPad {...props} />);
            step++
        }
        return stepPadsArray;
    }

    const propsSamplePad = {
        sampleData: sampleData,
        onSamplePadClick: onSamplePadClick
    }

    return (
        <div className='sample-row'>
            < SamplePad {...propsSamplePad} />
            {generateStepPads()}
        </div>
    )
}

export default SampleRow