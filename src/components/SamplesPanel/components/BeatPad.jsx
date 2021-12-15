import React, { useContext } from "react";
import { PlayerContext } from "../../../contexts/PlayerContext";
import '../../../assets/styles/BeatPad.css'


function BeatPad({onStepPadClick, sampleData, isActive, step}) {
    const context = useContext(PlayerContext);

    const handleClickEvent = () => {
        onStepPadClick(sampleData.name, step)
    }
    const activeClass = isActive ? 'active' : '';
    let playingClass = '';

    if(context.isPlaying && isActive && step === context.currentStep) {
        playingClass = 'playing';
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