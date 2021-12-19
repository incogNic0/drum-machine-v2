import React, { useContext } from "react";
import { PlayerContext } from "../../../contexts/PlayerContext";
import playIcon from "../../../assets/images/play.png";
import pauseIcon from "../../../assets/images/pause.png";

function PlayBtn({ onPlayPause }) {
	const context = useContext(PlayerContext);
	const isPlaying = context.isPlaying;

	let imgSrc = isPlaying ? pauseIcon : playIcon;
	let playState = isPlaying ? "playing" : "stopped";
	return (
		<div className={`play-stop-btn btn ${playState}`}>
			<img src={imgSrc} alt="Play/Pause" onClick={onPlayPause} />
		</div>
	);
}

export default PlayBtn;
