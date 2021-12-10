import React from "react";
import './SampleRow.css'
import SamplePad from "../SamplePad/SamplePad";
import BeatPad from "../BeatPad/BeatPad";

function SampleRow(props) {
    const generateBeatPads = () => {
        const beatPadsArray = []
        let step = 0;
        for (const padState of props.allPadsState) {
            const propsBeatPad = {
                ...props,
                isActive: padState,
                step,
                key: step
            }
            beatPadsArray.push(< BeatPad {...propsBeatPad} />);
            step++
        }
        return beatPadsArray;
    }

    const propsSamplePad = {
        audio: props.audio,
        allKits: props.allKits,
        currentKit: props.currentKit,
        sampleName: props.sampleName,
        onSamplePadClick: props.onSamplePadClick
    }

    return (
        <div className='sample-row'>
            < SamplePad {...propsSamplePad} />
            {generateBeatPads()}
        </div>
    )
}

export default SampleRow