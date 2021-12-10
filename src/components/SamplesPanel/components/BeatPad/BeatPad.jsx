import React from "react";
import './BeatPad.css'

function BeatPad(props) {
    const {
        audio,
        sampleName,
        step,
        isActive,
        isPlaying,
        currentStep,
        onBeatPadClick,
    } = props;

    const handleClickEvent = () => {
        onBeatPadClick(sampleName, step)
    }

    const activeClass = isActive ? 'active' : '';
    let playingClass = '';

    if(isPlaying && isActive && step === currentStep) {
        playingClass = 'playing'
        audio.currentTime = 0;
        audio.play();
    }

    return (
        <div 
            className={`beat-pad btn ${activeClass} ${playingClass}`}
            onClick={(e) => {handleClickEvent()}}
        >
        </div>
    )
}


export default BeatPad;