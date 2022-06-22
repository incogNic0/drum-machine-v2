declare interface Window {
	audioContext: AudioContext;
	audioBuffers: {
		[key: string]: {
			[key: string]: AudioBuffer;
		};
	};
	audioFilter: BiquadFilterNode;
}

declare module '*.jpg' {
	const value: any;
	export = value;
}

declare module '*.png' {
	const value: any;
	export = value;
}
