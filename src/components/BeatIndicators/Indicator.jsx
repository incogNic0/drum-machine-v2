import React from "react";
import '../../assets/styles/Indicator.css'

function Indicator({isActive}) {
        return (
            <div 
                className={`beat-indicator ${isActive ? 'active': ''}`}
            >
            </div>
        )
}

export default Indicator