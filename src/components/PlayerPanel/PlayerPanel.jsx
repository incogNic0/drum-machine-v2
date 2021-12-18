import React from 'react';
import '../../assets/styles/PlayerPanel.css'
import PlayBtn from './components/PlayBtn';
import ResetBtn from './components/ResetBtn';
import PresestsMenu from './components/PresetsMenu';
import TempoCtrl from './components/TempoCtrl';
import BeatIndicators from './components/BeatIndicators'


function ControlPanel( props ) {
    const {
        kits,
        kitData,
        currentTempo,
        onPlayPause,
        onKitSelection,
        onResetClick,
        onTempoChange
    } = props;

    const propsPlayBtn = { onPlayPause }

    const propsResetBtn = { onResetClick }

    const propsPresetMenu = {
        kitData,
        kits,
        onKitSelection
    }

    const propsTempoCtrl = {
        currentTempo,
        onTempoChange
    }

    return (
        <div className='player-panel'>
            <div className='player-controls'>
                < PlayBtn {...propsPlayBtn} />
                < ResetBtn {...propsResetBtn} />
                < PresestsMenu {...propsPresetMenu} />
                < TempoCtrl {...propsTempoCtrl} />
            </div>
            <div>
                < BeatIndicators />
            </div>
        </div>
    )
}

export default ControlPanel;
