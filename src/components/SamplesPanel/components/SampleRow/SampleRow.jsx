import React, { Component } from "react";
import './SampleRow.css'
import SamplePad from "../SamplePad/SamplePad";
import BeatPad from "../BeatPad/BeatPad";

class SampleRow extends Component {
    constructor(props) {
        super(props);
        this.sampleName = props.sampleName
    }

    loadBeatPads() {
        const {
            kits,
            sampleName,
            onBeatPadClick,
            isPlaying,
            currentStep,
            padsState
        
        } = this.props

        const beatPadsArray = []
        let step = 0;
        for (const padState of padsState) {
            beatPadsArray.push(
                < BeatPad
                    kits={kits}
                    sampleName={sampleName}
                    step={step}
                    isActive={padState}
                    onBeatPadClick={onBeatPadClick}
                    isPlaying={isPlaying}
                    currentStep={currentStep}
                    key={step}
                />
            )
            step++
        }
        return beatPadsArray;
    }


    render() {
        const padsArray = this.loadBeatPads();
        return (
            <div className='sample-row'>
                < SamplePad 
                    kits={this.props.kits}
                    sampleName={this.props.sampleName}
                    onSamplePadClick={this.props.onSamplePadClick}
                />
                {padsArray}
            </div>
        )
    }

}

export default SampleRow