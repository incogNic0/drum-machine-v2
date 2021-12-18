import React, { Component } from 'react';
import '../assets/styles/Sequencer.css';
import PlayerPanel from '../components/PlayerPanel/PlayerPanel'
import SamplesSection from '../components/SamplesSection/SamplesSection';
import allKits from '../assets/js/kits';
import { handlePlayStop } from '../assets/js/playback';
import { resetSamplePattern, getKitAudio, updateSample } from '../assets/js/helpers';
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

    onSampleRangeInput = (evt, sampleName) => {
        const input = evt.target;
        const value = input.value;
        let updateProp;

        if( input.classList.contains('gain-input') ) updateProp = 'gainValue';
        if( input.classList.contains('pan-input') ) updateProp = 'panValue'

        const updatedKit = this.updateSample(sampleName, updateProp, value);
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
            onStepPadClick: this.onStepPadClick,
            onSampleRangeInput: this.onSampleRangeInput,
        }

        return (
            <div className="container">
                < PlayerPanel {...propsCtrlPanel} />
                < SamplesSection {...propsSampleSection} />
            </div>
        );
    }

}

export default Sequencer;

