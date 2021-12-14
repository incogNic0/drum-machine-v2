import React, { Component } from 'react';
import '../assets/styles/Sequencer.css';
import ControlPanel from '../components/ControlPanel/ControlPanel'
import BeatIndicators from '../components/BeatIndicators/BeatIndicators';
import SamplesSection from '../components/SamplesPanel/SamplesSection';
import allKits from '../assets/js/kits';
import { handlePlayStop, updateTempo } from '../assets/js/playback';
import { resetSamplePattern, getKitAudio } from '../assets/js/helpers';
import KitData from '../assets/js/KitData';

let playing;

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
            allPadsCurrentState: {},
            currentTempo: 0,
            currentStep: -1,
            kitData: null // { sampleName: {pattern =[], audio: audioBuffer }, ...}
        }
    }

    async componentDidMount(){
        this.onTempoChange(this.props.allKits[this.props.defaultKit].defaultTempo);
        this.setupKit(allKits[this.props.defaultKit]);
    }

    setupKit = kit => {
        const newKit = new KitData(kit.path, ...kit.samples);
        this.setState({ kitData: newKit });
        this.loadKitAudio(newKit);
    }

    loadKitAudio = async kit => {
        const updatedKit = await getKitAudio(kit);
        this.setState({kitData: updatedKit});
    }

    onPlayPause = ()=> {
        const handlePlayback = handlePlayStop.bind(this.state);
        handlePlayback();
        this.setState((prevState) => ({
            isPlaying: !prevState.isPlaying
        }));
    }

    playSequence = () => {
        /*  BeatIndicator and BeatPad animations are triggered when currentStep state changes.
            If currentStep === index/step of Indicator/BeatPad then 'active' class is added. 
            It's then removed, or not added, during the next rendering of playSequence since
            currentStep !== index/step.
        */
        this.incrementCurrentStep()
    }

    incrementCurrentStep = () => {
        let nextStep = this.state.currentStep + 1
        this.setState({
            currentStep: nextStep < 16 ? nextStep : 0
        });
    }

    getTiming = () => {
        return (60000 / this.state.currentTempo / 4).toFixed(4);
    }

    onResetClick = () => {
        if(this.state.isPlaying) this.setState({isPlaying: false});
        const resetKit = resetSamplePattern(this.state.kitData);
        this.setState({ kitData: resetKit});
    }

    onTempoChange = (tempo)=> {
        updateTempo(tempo);
        this.setState({currentTempo: tempo});
        if(this.state.isPlaying) {
            clearInterval(playing);
            playing = setInterval(() => this.playSequence(), this.getTiming());
        }
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

    onKitSelection = (e) => {
        if (this.state.isPlaying) {
            this.setState({isPlaying: false});
        }
        const kitName = e.target.value;
        const kit = this.props.allKits[kitName];
        this.setState({currentKit: kitName, currentTempo: kit.defaultTempo});
        this.setAllPadsInitialState(kit);
    }

    setAllPadsInitialState = (kit=allKits[this.state.currentKit]) => {
        // all pads initial state is inactive (false) by default
        const allPads = {}
        for (const sample of kit.samples) {
            allPads[sample] = []
            for (let step=0; step<16; step++) {
                allPads[sample].push(false)
            }
            allPads[sample].audio = new Audio(kit.path + sample.toLowerCase() + '.wav');
        }
        this.setState({allPadsCurrentState: allPads});
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

