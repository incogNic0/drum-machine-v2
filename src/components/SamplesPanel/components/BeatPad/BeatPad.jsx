import React, { Component } from "react";
import './BeatPad.css'

class BeatPad extends Component {
    constructor(props) {
        super(props);
        this.row = props.row
        this.col = props.col
        this.state = {
            isActive: false
        }
    }

    handleClickEvent(e) {
        // returns state prior to click
        this.props.onBeatPadClick(this.row,this.col, this.state.isActive);
        this.setState({isActive: !this.state.isActive});
    }
    
    render() {
        const {isPlaying, currentStep} = this.props
        const activeClass = this.state.isActive ? 'active' : '';
        let playingClass = '';
        if(isPlaying && this.state.isActive && this.col === currentStep) {
            playingClass = 'playing'
        }
        return (
            <div 
                className={`beat-pad btn ${activeClass} ${playingClass}`}
                onClick={(e) => {this.handleClickEvent()}}
            ></div>
        )
    }
}

export default BeatPad;