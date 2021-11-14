import React from 'react';
import './ControlPanel.css'
import PlayBtn from './components/PlayBtn/PlayBtn';
import ResetBtn from './components/ResetBtn/ResetBtn';
import PresestsMenu from './components/PresetsMenu/PresetsMenu';
import TempoCtrl from './components/TempCtrl/TempoCtrl';


function ControlPanel( {isPlaying, onPlayPause, kits, currentTempo, onTempoChange}) {
    return (
        <div className='control-panel'>
            < PlayBtn isPlaying={isPlaying} onPlayPause={onPlayPause} />
            < ResetBtn />
            < PresestsMenu kits={kits} />
            < TempoCtrl currentTempo={currentTempo} onTempoChange={onTempoChange} />
        </div>
    )
}

export default ControlPanel;
