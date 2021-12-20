import React, { Component } from "react";
import "../assets/styles/Sequencer.css";
import PlayerPanel from "../components/PlayerPanel/PlayerPanel";
import SamplesSection from "../components/SamplesSection/SamplesSection";
import allKits from "../assets/js/kits";
import { handlePlayStop } from "../assets/js/playback";
import Kit from '../assets/js/Kit';
import { PlayerContext } from "../contexts/PlayerContext";
import {
	resetSamples,
	getSamplesAudio,
	updatePattern,
  updateEffect
} from "../assets/js/helpers";

class Sequencer extends Component {
	static contextType = PlayerContext;

	constructor() {
		super();
		this.state = {
			kits: [],
			currentTempo: 0,
      currentKit: '',
			samples: null,
		};
		this.updatePattern = updatePattern.bind(this);
    this.updateEffect = updateEffect.bind(this)
	}

	async componentDidMount() {
		const kits = this.fetchKits();
    const [ defaultKit ] = kits.filter(kit => kit.name === 'house')
		this.setState({ kits });
		this.setupKit(defaultKit);
	}

  fetchKits = () => {
    //fetch all kits
    return allKits;
  }

	setupKit = (kit) => {
		const newKit = new Kit(kit);
		this.setState({ 
      currentKit: newKit.name,
      currentTempo: newKit.tempo,
      samples: newKit.samples
    });
		this.loadKitAudio(newKit.samples);
	};

	loadKitAudio = async (samples) => {
    const updatedSamples = await getSamplesAudio(samples);
    this.setState({ samples: updatedSamples});
	};

	onPlayPause = () => {
		handlePlayStop.call(this);
		this.context.togglePlaying();
		this.context.updateCurrentStep(0);
	};

  handlePlayerClick = (evt) => {
    const target = evt.target.getAttribute('name');
    const value = evt.target.value || ''
    if (target === 'play-stop') this.onPlayPause();
    if (target === 'reset') this.onResetClick();
    if (target === 'kit-selector') this.onKitSelection(value);
  }

	updateCurrentStep = (step) => {
		this.context.updateCurrentStep(step);
	};

	onKitSelection = (value) => {
		if (this.context.isPlaying) {
			this.onPlayPause();
		}
    const [ kit ] = this.state.kits.filter( kits => {
      return kits.name === value;
    });
		this.setupKit(kit);
	};

	onResetClick = () => {
		if (this.context.isPlaying) {
			this.onPlayPause();
		}
		const samples = resetSamples(this.state.samples);
		this.setState({ samples });
	};

	onTempoChange = (tempo) => {
		tempo = tempo < 60 ? 60 : tempo;
		tempo = tempo > 200 ? 200 : tempo;
		this.setState({ currentTempo: tempo });
	};

	onStepPadClick = (sampleName, stepNum) => {
		const samples = this.updatePattern(sampleName, stepNum);
		this.setState({ samples });
	};

	onSampleRangeInput = (evt, sampleName) => {
		const effect = evt.target.getAttribute('name');
		const value = evt.target.value;

		const samples = this.updateEffect(sampleName, effect, value);
		this.setState({ samples });
	};

	render() {
		const propsPlayer = {
			kits: this.state.kits,
      currentKit: this.state.currentKit,
			currentTempo: this.state.currentTempo,
      handlePlayerClick: this.handlePlayerClick,
			onTempoChange: this.onTempoChange
		};

		const propsSamples = {
			samples: this.state.samples,
			onStepPadClick: this.onStepPadClick,
			onSampleRangeInput: this.onSampleRangeInput,
		};

		return (
			<div className="container">
				<PlayerPanel { ...propsPlayer } />
				<SamplesSection { ...propsSamples } />
			</div>
		);
	}
}

export default Sequencer;
