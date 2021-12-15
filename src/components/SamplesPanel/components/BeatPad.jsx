import React, { useContext } from "react";
import { PlayerContext } from "../../../contexts/PlayerContext";
import '../../../assets/styles/BeatPad.css'


function BeatPad({onStepPadClick, sampleName, stepNum ,isActive}) {
    const context = useContext(PlayerContext);

    const handleClickEvent = () => {
        onStepPadClick(sampleName, stepNum)
    }
    const activeClass = isActive ? 'active' : '';
    let playingClass = '';

    if(context.isPlaying && stepNum === context.currentStep) {
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