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
            activePads: {}, // col key w/ array value of rows
            currentStepPads: [],
            currentTempo: 0,
            timing: 0,
            currentStep: -1
        }
    }

    componentDidMount(){
        this.onTempoChange(100)
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
        /*  BeatIndicator animation is triggered when currentStep state changes.
            If currentStep === index of Indicator then 'active' class is added 
            and then not added (or 'removed') during the next rendering of playSequence
        */
        this.incrementCurrentStep()
        const currentStepPads = this.state.activePads[this.state.currentStep];
        this.setState({currentStepPads})
    }

    incrementCurrentStep = () => {
        let nextStep = this.state.currentStep + 1
        this.setState({
            currentStep: nextStep < 16 ? nextStep : 0
        })
    }

    onTempoChange = (tempo)=> {
        this.setState({
            currentTempo: tempo,
            timing: (60000 / tempo / 4).toFixed(4)});
    }

    onBeatPadClick = (row, col, isActive) => {
        let activePads = {...this.state.activePads}
        // previous state of pad
        if(isActive) {
            // was active, but no longer. remove from array
            activePads[col] = activePads[col].filter(xRow => xRow !== row)
        } else {
            // wasn't active, but now is.  add to array
            if(activePads[col]) {
                activePads[col].push(row)
            } else {
                activePads[col] = [row]
            }
        }
        activePads[col].sort()
        this.setState({ activePads })
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
                />
                < BeatIndicators 
                    isPlaying={this.state.isPlaying}
                    currentStep={this.state.currentStep} />
                < SamplesSection
                    onBeatPadClick={this.onBeatPadClick}
                    samples={this.state.samples}
                    isPlaying={this.state.isPlaying}
                    currentStep={this.state.currentStep}
                />
            </div>
          );
    }

}

export default App;
