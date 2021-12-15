import React from "react";
import '../../assets/styles/SamplesSection.css'
import SampleRow from "./components/SampleRow";


function SamplesSection({kitData, onStepPadClick, onSamplePadClick}) {
    const sampleRows = [];
    for(const sample in kitData) {
        const propsSampleRow = {
            sampleData: {...kitData[sample], name: sample},
            onSamplePadClick: onSamplePadClick,
            onStepPadClick: onStepPadClick,
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