import React from "react";

function Indicator({ isActive }) {
	return <div className={`beat-indicator ${isActive ? "active" : ""}`}></div>;
}

export default Indicator;
