import React, { Component } from "react";
import './SampleRow.css'
import SamplePad from "../SamplePad/SamplePad";
import BeatPad from "../BeatPad/BeatPad";

class SampleRow extends Component {
    constructor(props) {
        super(props);
        this.row = props.row
    }

    loadBeatPads() {
        const beatPadsArray = []
        for (let i=0; i<16; i++) {
            beatPadsArray.push(
                < BeatPad
                    row={this.row}
                    col={i}
                    onBeatPadClick={this.props.onBeatPadClick}
                    key={i}
                />
            )
        }
        return beatPadsArray;
    }


    render() {
        const padsArray = this.loadBeatPads();
        return (
            <div className='sample-row'>
                < SamplePad />
                {padsArray}
            </div>
        )
    }

}

export default SampleRow