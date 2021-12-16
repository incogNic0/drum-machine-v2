import React, { Component } from 'react';
import '../assets/styles/Sequencer.css';
import ControlPanel from '../components/ControlPanel/ControlPanel'
import BeatIndicators from '../components/BeatIndicators/BeatIndicators';
import SamplesSection from '../components/SamplesPanel/SamplesSection';
import allKits from '../assets/js/kits';
import { handlePlayStop } from '../assets/js/playback';
import { resetSamplePattern, getKitAudio, updateSample, playSample } from '../assets/js/helpers';
import KitData from '../assets/js/KitData';
import { PlayerContext } from '../contexts/PlayerContext';

class Sequencer extends Component {
    static defaultProps = {
        defaultKit: 'house'
    }
    static contextType = PlayerContext;

    constructor(props) {
        super();
        this.state = {
            kits: [],
            currentTempo: 0,
            kitData: null
        };
        this.updateSample = updateSample.bind(this);
    }

    async componentDidMount(){
        const kit = this.getSelectedKit(this.props.defaultKit)
        this.setState({kits: allKits.map(kit => kit.name)});
        this.setupKit(kit);
    }

    getSelectedKit = kitName => {
        return allKits.filter( kit => kit.name === kitName)[0];
    }

    setupKit = kit => {
        const newKit = new KitData(kit);
        this.setState({ kitData: newKit, currentTempo: newKit.defaultTempo});
        this.loadKitAudio(newKit);
    }

    loadKitAudio = async kit => {
        const updatedKit = await getKitAudio(kit);
        this.setState({kitData: updatedKit});
    }

    onPlayPause = ()=> {
        handlePlayStop.call(this);
        this.context.togglePlaying();
        this.context.updateCurrentStep(0);
    }

    updateCurrentStep = step => {
        this.context.updateCurrentStep(step);
    }

    onKitSelection = (evt) => {
        if (this.context.isPlaying) {
            this.onPlayPause();
        }
        const kitName = evt.target.value;
        const kit = this.getSelectedKit(kitName);
        this.setupKit(kit);
    }

    onResetClick = () => {
        if(this.context.isPlaying) {
            this.onPlayPause();
        };
        const resetKit = resetSamplePattern(this.state.kitData);
        this.setState({ kitData: resetKit});
    }

    onTempoChange = (tempo)=> {
        this.setState({currentTempo: tempo});
    }

    onStepPadClick = (sampleName, stepNum) => {
        const updatedKit = this.updateSample(sampleName, 'pattern', stepNum);
        this.setState({ kitData: updatedKit });
    }

    onSamplePadClick = (sampleName) => {
        playSample.call(this, sampleName);
    }

    onGainChange = (sampleName, value) => {
        const updatedKit = this.updateSample(sampleName, 'gainValue', value);
        this.setState({ kitData: updatedKit });
    }


    render() {
        const propsCtrlPanel = {
            kits: this.state.kits,
            kitData: this.state.kitData || '',
            currentTempo: this.state.currentTempo,
            onPlayPause: this.onPlayPause,
            onTempoChange: this.onTempoChange,
            onResetClick: this.onResetClick,
            onKitSelection: this.onKitSelection
        }

        const propsSampleSection = {
            kitData: this.state.kitData,
            onSamplePadClick: this.onSamplePadClick,
            onStepPadClick: this.onStepPadClick,
            onGainChange: this.onGainChange
        }

        return (
            <div className="container">
                < ControlPanel {...propsCtrlPanel} />
                < BeatIndicators />
                < SamplesSection {...propsSampleSection} />
            </div>
        );
    }

}

export default Sequencer;

