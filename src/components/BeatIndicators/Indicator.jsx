import React from "react";
import './Indicator.css'

function Indicator({isActive}) {
        return (
            <div 
                className={`beat-indicator ${isActive ? 'active': ''}`}
            >
            </div>
        )
}

export default Indicator