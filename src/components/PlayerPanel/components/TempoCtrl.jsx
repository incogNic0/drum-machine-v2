import React from "react";
import "../../../assets/styles/TempoCtrl.css";

function TempoCtrl({ currentTempo, onTempoChange }) {
	const incrementTempo = () => onTempoChange(currentTempo + 1);
	const decrementTempo = () => onTempoChange(currentTempo - 1);
	return (
		<div className="tempo">
			<button 
        className="tempo btn" 
        name="tempo-increment" 
        onClick={incrementTempo}
      > + </button>

			<p className="current-tempo tempo">{currentTempo}</p>

			<button 
        className="tempo btn" 
        name="tempo-decrement"
        onClick={decrementTempo}
      > - </button>
		</div>
	);
}

export default TempoCtrl;
