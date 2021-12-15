import React, { Component } from 'react';
import '../assets/styles/Sequencer.css';
import ControlPanel from '../components/ControlPanel/ControlPanel'
import BeatIndicators from '../components/BeatIndicators/BeatIndicators';
import SamplesSection from '../components/SamplesPanel/SamplesSection';
import allKits from '../assets/js/kits';
import { handlePlayStop } from '../assets/js/playback';
import { resetSamplePattern, getKitAudio } from '../assets/js/helpers';
import KitData from '../assets/js/KitData';
import { PlayerContext } from '../contexts/PlayerContext';

class Sequencer extends Component {
    static defaultProps = {
        allKits,
        defaultKit: Object.keys(allKits)[2]
    }
    static contextType = PlayerContext;

    constructor(props,contextType) {
        super(props);
        this.state = {
            kitName: this.props.defaultKit,
            currentTempo: 0,
            kitData: null // { sampleName: {pattern =[true or false x 16], audio: audioBuffer }, ...}
        };
    }

    async componentDidMount(){
        this.setupKit(allKits[this.props.defaultKit]);
    }

    setupKit = kit => {
        const { path, defaultTempo, samples } = kit;
        const newKit = new KitData(path, ...samples);
        this.setState({ kitData: newKit, currentTempo: defaultTempo});
        this.loadKitAudio(newKit);
    }

    loadKitAudio = async kit => {
        const updatedKit = await getKitAudio(kit);
        this.setState({kitData: updatedKit});
    }

    onPlayPause = ()=> {
        handlePlayStop.call(this, this.context);
        this.context.togglePlaying();
        this.context.updateCurrentStep(0);
    }

    updateCurrentStep = step => {
        this.context.updateCurrentStep(step);
    }

    onKitSelection = (e) => {
        if (this.context.isPlaying) {
            this.onPlayPause();
        }
        const kitName = e.target.value;
        const kit = this.props.allKits[kitName];
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

    onStepPadClick = (sampleName, step) => {
        const updatedKit = {...this.state.kitData};
        const updatedSample = {...updatedKit[sampleName]};
        updatedSample.pattern[step] = !updatedSample.pattern[step]; // toggle boolean
        if(updatedSample.pattern[step] && !this.context.isPlaying) {
            const audio = document.querySelector(`#${sampleName}`);
            audio.currentTime = 0;
            audio.play();
        }
        updatedKit[sampleName] = updatedSample;
        this.setState({ kitData: updatedKit });
    }

    onSamplePadClick = (e) => {
        const audio = e.target.children[0];
        audio.currentTime = 0;
        audio.play();
    }


    render() {
        const propsCtrlPanel = {
            allKits: this.props.allKits,
            kitName: this.state.kitName,
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

