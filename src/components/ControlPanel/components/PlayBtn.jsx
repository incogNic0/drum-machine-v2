import React from "react";
import '../../../assets/styles/PlayBtn.css';
import playIcon from '../../../assets/images/play.png';
import pauseIcon from '../../../assets/images/pause.png';

function PlayBtn( {isPlaying, onPlayPause}) {
    let imgSrc = isPlaying ? pauseIcon : playIcon
    let playState = isPlaying ? 'playing' : 'paused'
    return (
        <div className={`play-pause-btn btn ${playState}`}>
            <img src={imgSrc} alt="Play/Pause" onClick={onPlayPause} />
        </div>
    )
}

export default PlayBtn