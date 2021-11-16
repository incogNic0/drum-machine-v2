import React, { Component } from 'react';
import './App.css';
import ControlPanel from '../components/ControlPanel/ControlPanel'
import BeatIndicators from '../components/BeatIndicators/BeatIndicators';
import SamplesSection from '../components/SamplesPanel/SamplesSection';

let playing;


class App extends Component {
    constructor() {
        super();
        this.state = {
            isPlaying: false,
            kits: ['rock','dnb','techno', 'house'],
            samples: ['kick','kick2','snare','snare2','tom','h-hat','h-hat2','crash','ride'],
            allPadsCurrentState: {},
            currentTempo: 0,
            timing: 0,
            currentStep: -1
        }
    }

    componentDidMount(){
        this.onTempoChange(100)
        const pads = setAllPadsInitialState(this.state.samples, 16);
        this.setState({allPadsCurrentState: pads})
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
        const resetState = setAllPadsInitialState(this.state.samples, 16);
        this.setState({allPadsCurrentState: resetState})
    }

    onTempoChange = (tempo)=> {
        this.setState({
            currentTempo: tempo,
            timing: (60000 / tempo / 4).toFixed(4)});
    }

    onBeatPadClick = (clickedSample, step) => {
        const currentState = {...this.state.allPadsCurrentState};
        const updatedState = {}
        // copy state
        for (const sample in currentState) {
            updatedState[sample] = [...currentState[sample]]
        }

        // flip state of clicked pad
        if(updatedState[clickedSample]) {
            updatedState[clickedSample][step] = !updatedState[clickedSample][step] 
        } else {
            throw new Error('This sample is not currently loaded: ', clickedSample)
        }

        this.setState({ allPadsCurrentState: updatedState })
    }

    render() {
        return (
            <div className="container">
                < ControlPanel 
                    isPlaying={this.state.isPlaying}
                    onPlayPause={this.onPlayStop}
                    kits={this.state.kits}
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
                    isPlaying={this.state.isPlaying}
                    currentStep={this.state.currentStep}
                />
            </div>
          );
    }

}

function setAllPadsInitialState(samplesArr, numSteps) {
    // all pads initial state is inactive (false) by default
    const allPads = []
    for (const sample of samplesArr) {
        allPads[sample] = []
        for (let step=0; step<numSteps; step++) {
            allPads[sample].push(false)
        }
    }
    return allPads;
}

export default App;

