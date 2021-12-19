import React from "react";

function ResetBtn({ onResetClick }) {
	return (
		<div className="reset-btn btn" onClick={onResetClick}>
			<p>reset</p>
		</div>
	);
}

export default ResetBtn;
