import React from "react";
import '../../../assets/styles/BeatPad.css'

// props = {
//     onStepPadClick: props.onStepPadClick,
//     sampleData: props.sampleData,
//     currentStep: props.currentStep,
//     isPlaying: props.isPlaying,
//     isActive: stepState,
//     step,
// }

function BeatPad(props) {
    const {
        sampleData,
        step,
        isActive,
        isPlaying,
        currentStep,
        onStepPadClick,
    } = props;

    const handleClickEvent = () => {
        onStepPadClick(sampleData.name, step)
    }
    const activeClass = isActive ? 'active' : '';
    let playingClass = '';

    if(isPlaying && isActive && step === currentStep) {
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