import React, { Component } from 'react';
import '../assets/styles/Sequencer.css';
import ControlPanel from '../components/ControlPanel/ControlPanel'
import BeatIndicators from '../components/BeatIndicators/BeatIndicators';
import SamplesSection from '../components/SamplesPanel/SamplesSection';
import allKits from '../assets/js/kits';
import { handlePlayStop } from '../assets/js/playback';
import { resetSamplePattern, getKitAudio } from '../assets/js/helpers';
import KitData from '../assets/js/KitData';


class Sequencer extends Component {
    static defaultProps = {
        allKits,
        defaultKit: Object.keys(allKits)[0]
    }
    constructor(props) {
        super(props);
        this.state = {
            isPlaying: false,
            kitName: this.props.defaultKit,
            currentStep: 0,
            currentTempo: 0,
            kitData: null // { sampleName: {pattern =[], audio: audioBuffer }, ...}
        };
        this.handlePlayStop = handlePlayStop.bind(this);
    }

    async componentDidMount(){
        this.onTempoChange(this.props.allKits[this.props.defaultKit].defaultTempo);
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
        this.handlePlayStop(); // handles audio playback & animation
        this.setState((prevState) => ({
            isPlaying: !prevState.isPlaying
        }));
        this.setState({ currentStep: 0 });
    }

    updateCurrentStep = step => {
        this.setState({ currentStep: step })
    }

    onKitSelection = (e) => {
        if (this.state.isPlaying) {
            this.handlePlayStop();
            this.setState({isPlaying: false});
        }
        const kitName = e.target.value;
        const kit = this.props.allKits[kitName];
        this.setupKit(kit);
    }

    onResetClick = () => {
        if(this.state.isPlaying) {
            this.handlePlayStop();
            this.setState({isPlaying: false})
        };
        const resetKit = resetSamplePattern(this.state.kitData);
        this.setState({ kitData: resetKit});
    }

    onTempoChange = (tempo)=> {
        // updateTempo(tempo);
        this.setState({currentTempo: tempo});
    }

    onStepPadClick = (sampleName, step) => {
        const updatedKit = {...this.state.kitData};
        const updatedSample = {...updatedKit[sampleName]};
        updatedSample.pattern[step] = !updatedSample.pattern[step]; // toggle boolean
        if(updatedSample.pattern[step] && !this.state.isPlaying) {
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
            isPlaying: this.state.isPlaying,
            allKits: this.props.allKits,
            currentKit: this.state.currentKit,
            currentTempo: this.state.currentTempo,
            onPlayPause: this.onPlayPause,
            onTempoChange: this.onTempoChange,
            onResetClick: this.onResetClick,
            onKitSelection: this.onKitSelection
        }

        const propsBeatIndicators = {
            isPlaying: this.state.isPlaying,
            currentStep: this.state.currentStep
        }

        const propsSampleSection = {
            kitData: this.state.kitData,
            isPlaying: this.state.isPlaying,
            currentStep: this.state.currentStep,
            onSamplePadClick: this.onSamplePadClick,
            onStepPadClick: this.onStepPadClick,
        }

        return (
            <div className="container">
                < ControlPanel {...propsCtrlPanel} />
                < BeatIndicators {...propsBeatIndicators} />
                < SamplesSection {...propsSampleSection} />
            </div>
        );
    }

}

export default Sequencer;

