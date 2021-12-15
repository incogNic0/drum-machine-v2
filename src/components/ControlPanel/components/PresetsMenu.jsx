import React from 'react';
import '../../../assets/styles/PresetsMenu.css'

function PresestsMenu({allKits, kitName, onKitSelection}) {
    const kitOptions = [];
    for (const kit in allKits) {
        const kitOption  = <option value={kit}  key={kit} >{kit} </option>
        kitOptions.push(kitOption);
    }
    return (
        <div className='presets-menu btn'>
            <select value={kitName} onChange={onKitSelection} id="kits" className='btn'>
                {kitOptions}
            </select>
        </div>
    )
}

export default PresestsMenu;