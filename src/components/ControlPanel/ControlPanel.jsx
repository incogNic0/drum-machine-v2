import React from 'react';
import './ControlPanel.css'
import PlayBtn from './components/PlayBtn/PlayBtn';
import ResetBtn from './components/ResetBtn/ResetBtn';
import PresestsMenu from './components/PresetsMenu/PresetsMenu';
import TempoCtrl from './components/TempCtrl/TempoCtrl';


function ControlPanel( props ) {

    const propsPlayBtn = {
        isPlaying: props.isPlaying,
        onPlayPause: props.onPlayPause
    }

    const propsResetBtn = {
        onResetClick: props.onResetClick
    }

    const propsPresetMenu = {
        allKits: props.allKits,
        currentKit: props.currentKit,
        onKitSelection: props.onKitSelection
    }

    const propsTempoCtrl = {
        currentTempo: props.currentTempo,
        onTempoChange: props.onTempoChange
    }

    return (
        <div className='control-panel'>
            < PlayBtn {...propsPlayBtn} />
            < ResetBtn {...propsResetBtn} />
            < PresestsMenu {...propsPresetMenu} />
            < TempoCtrl {...propsTempoCtrl} />
        </div>
    )
}

export default ControlPanel;
