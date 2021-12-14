import React from "react";
import '../../../assets/styles/SampleRow.css'
import SamplePad from "./SamplePad";
import BeatPad from "./BeatPad";

// props = {
    // sampleData: {kitData[sample], name: sample},
    // isPlaying,
    // currentStep,
    // onSamplePadClick,
    // onStepPadClick
// }

function SampleRow(props) {
    const generateStepPads = () => {
        const stepPadsArray = []
        let step = 0;
        for (const stepState of props.sampleData.pattern) {
            const propsStepPad = {
                onStepPadClick: props.onStepPadClick,
                sampleData: props.sampleData,
                currentStep: props.currentStep,
                isPlaying: props.isPlaying,
                isActive: stepState,
                step,
                key: step
            }
            stepPadsArray.push(< BeatPad {...propsStepPad} />);
            step++
        }
        return stepPadsArray;
    }

    const propsSamplePad = {
        sampleData: props.sampleData,
        onSamplePadClick: props.onSamplePadClick
    }

    return (
        <div className='sample-row'>
            < SamplePad {...propsSamplePad} />
            {generateStepPads()}
        </div>
    )
}

export default SampleRow