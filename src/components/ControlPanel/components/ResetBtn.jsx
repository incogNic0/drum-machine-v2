import React from "react";
import '../../../assets/styles/ResetBtn.css'


function ResetBtn({onResetClick}) {
    return (
        <div className='reset-btn btn' onClick={onResetClick}>
            <p>reset</p>
        </div>
    )
}

export default ResetBtn;