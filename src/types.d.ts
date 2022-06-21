declare interface Window {
	audioContext: AudioContext;
	audioBuffers: {
		[key: string]: {
			[key: string]: AudioBuffer;
		};
	};
	audioFilter: BiquadFilterNode;
}
