import React, { Component, createContext } from "react";

export const PlayerContext = createContext();

export class PlayerProvider extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isPlaying: false,
			currentStep: 0,
		};
	}

	togglePlaying = () => {
		this.setState({ isPlaying: !this.state.isPlaying });
	};

	updateCurrentStep = (step) => {
		this.setState({ currentStep: step });
	};

	render() {
		const values = {
			...this.state,
			togglePlaying: this.togglePlaying,
			updateCurrentStep: this.updateCurrentStep,
		};
		return (
			<PlayerContext.Provider value={values}>
				{this.props.children}
			</PlayerContext.Provider>
		);
	}
}
