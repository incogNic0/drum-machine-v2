import React from "react";
import '../../assets/styles/SamplesSection.css'
import SampleRow from "./components/SampleRow";


function SamplesSection({kitData, onStepPadClick, onSamplePadClick}) {
    if(!kitData) return <div>Loading...</div>;
    return (
        <div className='samples-section'>
            {kitData.samples.map( sample => {
                const props = {
                    sample,
                    onSamplePadClick,
                    onStepPadClick,
                    key: sample.name,
                }
                return < SampleRow {...props} />
            })}
        </div>
    )
}

export default SamplesSection