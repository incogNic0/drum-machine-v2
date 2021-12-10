import React from 'react';
import './PresetsMenu.css'

function PresestsMenu({allKits, currentKit, onKitSelection}) {
    const kitOptions = [];
    for (const kit in allKits) {
        const kitOption  = <option value={kit}  key={kit} >{kit} </option>
        kitOptions.push(kitOption);
    }
    return (
        <div className='presets-menu btn'>
            <select value={currentKit} onChange={onKitSelection} id="kits" className='btn'>
                {kitOptions}
            </select>
        </div>
    )
}

export default PresestsMenu;