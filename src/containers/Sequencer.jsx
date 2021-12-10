import React, { Component } from 'react';
import '../assets/styles/Sequencer.css';
import ControlPanel from '../components/ControlPanel/ControlPanel'
import BeatIndicators from '../components/BeatIndicators/BeatIndicators';
import SamplesSection from '../components/SamplesPanel/SamplesSection';
import allKits from '../assets/js/kits';

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
            currentKit: this.props.defaultKit,
            allPadsCurrentState: {},
            currentTempo: 0,
            timing: 0,
            currentStep: -1
        }
    }

    componentDidMount(){
        this.onTempoChange(100)
        this.setAllPadsInitialState(this.props.allKits[this.state.currentKit]);
    }

    onPlayPause = ()=> {
        clearInterval(playing)
        if(this.state.isPlaying) {
            this.setState({isPlaying: false, currentStepPads: []})
        } else {
            this.setState({ isPlaying: true, currentStep: -1 })   
            playing = setInterval(() => this.playSequence(), this.getTiming())
        }
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
        this.setAllPadsInitialState();
    }

    onTempoChange = (tempo)=> {
        this.setState({currentTempo: tempo});
        if(this.state.isPlaying) {
            clearInterval(playing);
            playing = setInterval(() => this.playSequence(), this.getTiming());
        }
    }

    onBeatPadClick = (sample, step) => {
        const updatedState = {...this.state.allPadsCurrentState};
        // toggle pad activation
        updatedState[sample][step] = !updatedState[sample][step]; // true or false
        if(updatedState[sample][step] && !this.state.isPlaying) {
            const audio = updatedState[sample].audio;
            audio.currentTime = 0;
            audio.play();
        }
        this.setState({ allPadsCurrentState: updatedState })
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
        const selectedKit = e.target.value;
        this.setState({currentKit: selectedKit});
        this.setAllPadsInitialState(this.props.allKits[selectedKit]);
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
            allPadsCurrentState: this.state.allPadsCurrentState,
            allKits : this.props.allKits,
            currentKit: this.state.currentKit,
            isPlaying: this.state.isPlaying,
            currentStep: this.state.currentStep,
            onSamplePadClick: this.onSamplePadClick,
            onBeatPadClick: this.onBeatPadClick,
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

