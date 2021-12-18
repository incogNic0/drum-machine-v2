import React, { useContext } from "react";
import { PlayerContext } from "../../../contexts/PlayerContext";
import '../../../assets/styles/BeatPad.css'


function BeatPad({onStepPadClick, sampleName, stepNum ,isActive}) {
    const context = useContext(PlayerContext);

    const handleClickEvent = () => {
        onStepPadClick(sampleName, stepNum)
    }

    const addActiveClasses = () => {
        if(!isActive) return '';
        let playingClass = context.isPlaying && stepNum === context.currentStep;
        return 'active' + (playingClass ? ' playing' : '')
    }

    return (
        <div 
            className={`beat-pad btn ${addActiveClasses()}`}
            onClick={(e) => {handleClickEvent()}}
        >
        </div>
    )
}


export default BeatPad;