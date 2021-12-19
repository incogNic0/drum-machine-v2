import React, { useContext } from "react";
import "../../../assets/styles/BeatIndicators.css";
import Indicator from "./Indicator";
import { PlayerContext } from "../../../contexts/PlayerContext";

function BeatIndicators() {
	const context = useContext(PlayerContext);
	const indicatorsArray = [];

	for (let i = 0; i < 16; i++) {
		indicatorsArray.push(
			<Indicator
				isActive={context.isPlaying && context.currentStep === i}
				key={i}
			/>
		);
	}

	return (
		<div className="indicator-panel">
			<div className="buffer"></div>
			<div className="indicators">{indicatorsArray}</div>
		</div>
	);
}

export default BeatIndicators;
