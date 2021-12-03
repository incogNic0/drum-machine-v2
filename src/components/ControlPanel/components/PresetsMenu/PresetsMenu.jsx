import React from 'react';
import './PresetsMenu.css'

function PresestsMenu({kits, onKitSelection}) {
    const kitOptions = [];
    for (const kit in kits.all) {
        const kitOption  = <option value={kit}  key={kit} >{kit} </option>
        kitOptions.push(kitOption);
    }
    return (
        <div className='presets-menu btn'>
            <select value={kits.current} onChange={onKitSelection} id="kits" className='btn'>
                {kitOptions}
            </select>
        </div>
    )
}

export default PresestsMenu;