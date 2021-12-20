import React from "react";

function ResetBtn({ handlePlayerClick }) {
	return (
		<div 
      className="reset-btn btn" 
      name="reset"
      onClick={handlePlayerClick}
    >
      reset
    </div>
	);
}

export default ResetBtn;
