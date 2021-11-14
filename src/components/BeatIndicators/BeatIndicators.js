import React from "react";
import './BeatIndicators.css'

function BeatIndicators(){
    return(
        <div className='indicator-panel'>
            <div className='buffer'></div>
            <div className='indicators'>
                <div className='beat-indicator' key='0' ></div>
                <div className='beat-indicator' key='1'></div>
                <div className='beat-indicator' key='2'></div>
                <div className='beat-indicator' key='3'></div>
                <div className='beat-indicator' key='4'></div>
                <div className='beat-indicator' key='5'></div>
                <div className='beat-indicator' key='6'></div>
                <div className='beat-indicator' key='7'></div>
                <div className='beat-indicator' key='8'></div>
                <div className='beat-indicator' key='9'></div>
                <div className='beat-indicator' key='10'></div>
                <div className='beat-indicator' key='11'></div>
                <div className='beat-indicator' key='12'></div>
                <div className='beat-indicator' key='13'></div>
                <div className='beat-indicator' key='14'></div>
                <div className='beat-indicator' key='15'></div>
            </div>
        </div>
    )
}

export default BeatIndicators