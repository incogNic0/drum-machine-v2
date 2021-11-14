import React, { Component } from 'react';
import './App.css';
import ControlPanel from '../components/ControlPanel/ControlPanel'
import BeatIndicators from '../components/BeatIndicators/BeatIndicators';


class App extends Component {
    constructor() {
        super();
        this.state = {
            isPlaying: false,
            kits: ['rock','dnb','techno', 'house'],
            currentTempo: 100,
        }
    }

    onPlayPause = ()=> {
        this.setState({isPlaying: !this.state.isPlaying})
    }

    onTempoChange = (num)=> {
        this.setState({currentTempo: num});
    }

    render() {
        return (
            <div className="container">
                < ControlPanel 
                    isPlaying={this.state.isPlaying}
                    onPlayPause={this.onPlayPause}
                    kits={this.state.kits}
                    currentTempo={this.state.currentTempo}
                    onTempoChange={this.onTempoChange}
                />
                < BeatIndicators />
            </div>
          );
    }

}

export default App;
