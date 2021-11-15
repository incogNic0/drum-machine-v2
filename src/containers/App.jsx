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
            activePads: {}, // col key w/ array value of rows
            currentTempo: 0,
            timing: 0,
            currentStep: -1
        }
    }

    componentDidMount(){
        this.onTempoChange(100)
    }

    onPlayStop = ()=> {
        if(this.state.isPlaying) {
            this.setState({isPlaying: false})
        } else {
            this.setState({isPlaying: true, currentStep: -1})   
            clearInterval(playing)
            playing = setInterval(() => this.playSequence(), this.state.timing)
        }
    }

    playSequence = () => {
        
        this.incrementCurrentStep()
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

    onBeatPadClick = (evt,row,col) => {
        const pad = evt.target;
        let activePads = {...this.state.activePads}
        if(pad.classList.contains('active')) {
            pad.classList.remove('active');
            activePads[col] = activePads[col].filter(r => r !== row)
        } else {
            pad.classList.add('active');
            if(activePads[col]) {
                activePads[col].push(row)
            } else {
                activePads[col] = [row]
            }
        }
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
                />
            </div>
          );
    }

}

export default App;
