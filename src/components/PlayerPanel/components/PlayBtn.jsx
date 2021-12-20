import React, { useContext } from "react";
import { PlayerContext } from "../../../contexts/PlayerContext";
import playIcon from "../../../assets/images/play.png";
import stopIcon from '../../../assets/images/stop.png';

function PlayBtn({ handlePlayerClick }) {
	const context = useContext(PlayerContext);
	const isPlaying = context.isPlaying;

	let imgSrc = isPlaying ? stopIcon : playIcon;
	let playState = isPlaying ? "playing" : "stopped";
	return (
		<div className={`play-stop-btn btn ${playState}`} >
			<img src={imgSrc} alt="Play/Pause" onClick={handlePlayerClick} name="play-stop"/>
		</div>
	);
}

export default PlayBtn;
