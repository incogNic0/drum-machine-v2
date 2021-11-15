import React, { Component } from "react";
import './BeatPad.css'

class BeatPad extends Component {
    constructor(props) {
        super(props);
        this.row = props.row
        this.col = props.col
    }
    
    render() {
        return (
            <div 
                className='beat-pad btn'
                onClick={(e) => {this.props.onBeatPadClick(e,this.row,this.col)}}
            ></div>
        )
    }
}

export default BeatPad;