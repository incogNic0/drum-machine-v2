import React from "react";
import '../../assets/styles/BeatIndicators.css'
import Indicator from "./Indicator";



function BeatIndicators({isPlaying, currentStep}){
    const indicatorsArray = [];

    for (let i=0; i<16; i++) {
        indicatorsArray.push(
            <Indicator 
                isActive={isPlaying && currentStep === i} 
                key={i}
            />
        )
    };

    return(
        <div className='indicator-panel'>
            <div className='buffer'></div>
            <div className='indicators'>
                {indicatorsArray}
            </div>
        </div>
    )
}

export default BeatIndicators