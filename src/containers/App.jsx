import React, { Component } from 'react';
import './App.css';
import ControlPanel from '../components/ControlPanel/ControlPanel'
import BeatIndicators from '../components/BeatIndicators/BeatIndicators';
import SamplesSection from '../components/SamplesPanel/SamplesSection';
import allKits from '../assets/js/kits';
const defaultKit = Object.keys(allKits)[0]
let playing;

class App extends Component {
    constructor() {
        super();
        this.state = {
            isPlaying: false,
            kits: { all: allKits, current: defaultKit},
            allPadsCurrentState: {},
            currentTempo: 0,
            timing: 0,
            currentStep: -1
        }
    }

    componentDidMount(){
        this.onTempoChange(100)
        this.setAllPadsInitialState();
    }

    onPlayStop = ()=> {
        clearInterval(playing)
        if(this.state.isPlaying) {
            this.setState({isPlaying: false, currentStepPads: []})
        } else {
            this.setState({ isPlaying: true, currentStep: -1 })   
            playing = setInterval(() => this.playSequence(), this.state.timing)
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
        })
    }

    onResetClick = () => {
        this.setAllPadsInitialState();
    }

    onTempoChange = (tempo)=> {
        this.setState({
            currentTempo: tempo,
            timing: (60000 / tempo / 4).toFixed(4)});
    }

    onBeatPadClick = (clickedSample, step) => {
        const currentState = {...this.state.allPadsCurrentState};
        const updatedState = {}
        for (const sample in currentState) {
            updatedState[sample] = [...currentState[sample]]
        }

        // flip state of clicked pad
        if(updatedState[clickedSample]) {
            const isActive = updatedState[clickedSample][step];
            if(!isActive && !this.state.isPlaying) {
                const src = allKits[this.state.kits.current].path + clickedSample.toLowerCase() + '.wav';
                const audio = new Audio(src);
                audio.currentTime = 0;
                audio.play();
            }
            updatedState[clickedSample][step] = !updatedState[clickedSample][step] 
        } else {
            throw new Error('This sample is not currently loaded: ', clickedSample)
        }

        this.setState({ allPadsCurrentState: updatedState })
    }

    onSamplePadClick = (e) => {
        const audio = e.target.children[0];
        audio.currentTime = 0;
        audio.play();
    }

    onKitSelection = (e) => {
        const kits = {...this.state.kits};
        kits.current = e.target.value;
        this.setState({kits});
        this.setAllPadsInitialState(kits);
    }

    setAllPadsInitialState = (kits=this.state.kits) => {
        // all pads initial state is inactive (false) by default
        const kit = allKits[kits.current];
        const allPads = {}
        for (const sample of kit.samples) {
            allPads[sample] = []
            for (let step=0; step<16; step++) {
                allPads[sample].push(false)
            }
        }
        this.setState({allPadsCurrentState: allPads});
    }


    render() {
        return (
            <div className="container">
                < ControlPanel 
                    isPlaying={this.state.isPlaying}
                    onPlayPause={this.onPlayStop}
                    kits={this.state.kits}
                    onKitSelection={this.onKitSelection}
                    currentTempo={this.state.currentTempo}
                    onTempoChange={this.onTempoChange}
                    onResetClick={this.onResetClick}
                />
                < BeatIndicators 
                    isPlaying={this.state.isPlaying}
                    currentStep={this.state.currentStep} />
                < SamplesSection
                    onBeatPadClick={this.onBeatPadClick}
                    allPadsCurrentState={this.state.allPadsCurrentState}
                    kits = {this.state.kits}
                    isPlaying={this.state.isPlaying}
                    currentStep={this.state.currentStep}
                    onSamplePadClick={this.onSamplePadClick}
                />
            </div>
        );
    }

}

export default App;

