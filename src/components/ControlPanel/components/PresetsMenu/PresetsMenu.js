import React from 'react';
import './PresetsMenu.css'

function PresestsMenu({kits}) {
    const optionsArray = kits.map(kit => <option value={kit}  key={kit} >{kit}</option>)
    return (
        <div className='presets-menu btn'>
            <select name="kits" id="kits" className='btn'>
                {optionsArray}
            </select>
        </div>
    )
}

export default PresestsMenu;