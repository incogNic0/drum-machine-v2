import React from "react";
import '../../assets/styles/SamplesSection.css'
import SampleRow from "./components/SampleRow";

// props = {
//     kitData: this.state.kitData,
//     isPlaying: this.state.isPlaying,
//     currentStep: this.state.currentStep,
//     onSamplePadClick: this.onSamplePadClick,
//     onStepPadClick: this.onBeatPadClick,
// }

function SamplesSection(props) {
    const sampleRows = [];
    for(const sample in props.kitData) {
        const propsSampleRow = {
            sampleData: {...props.kitData[sample], name: sample},
            isPlaying: props.isPlaying,
            currentStep: props.currentStep,
            onSamplePadClick: props.onSamplePadClick,
            onStepPadClick: props.onStepPadClick,
            key: sample,
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