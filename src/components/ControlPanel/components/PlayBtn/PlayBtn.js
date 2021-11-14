import React from "react";
import './PlayBtn.css'
import play from './play.png'
import pause from './pause.png'

function PlayBtn( {isPlaying, onPlayPause}) {
    let imgSrc = isPlaying ? pause : play
    let playState = isPlaying ? 'playing' : 'paused'
    return (
        <div className={`play-pause-btn btn ${playState}`}>
            <img src={imgSrc} alt="Play/Pause" onClick={onPlayPause} />
        </div>
    )
}

export default PlayBtn