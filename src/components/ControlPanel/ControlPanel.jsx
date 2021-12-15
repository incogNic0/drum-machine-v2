import React from 'react';
import '../../assets/styles/ControlPanel.css'
import PlayBtn from './components/PlayBtn';
import ResetBtn from './components/ResetBtn';
import PresestsMenu from './components/PresetsMenu';
import TempoCtrl from './components/TempoCtrl';


function ControlPanel( props ) {

    const propsPlayBtn = {
        onPlayPause: props.onPlayPause
    }

    const propsResetBtn = {
        onResetClick: props.onResetClick
    }

    const propsPresetMenu = {
        allKits: props.allKits,
        kitName: props.kitName,
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
