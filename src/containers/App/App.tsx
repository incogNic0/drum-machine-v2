import './App.css';
import { useEffect } from 'react';
import { useLoadKit } from '../../hooks';
import Sequencer from '../Sequencer/Sequencer';
import ControlPanel from '../ControlPanel/ControlPanel';
import { loadSavedPresets } from '../../utils';
import Filter from '../../components/Filter/Filter';

function App() {
	const loadKit = useLoadKit();
	useEffect(() => {
		window.audioContext = new AudioContext();
		window.audioFilter = window.audioContext.createBiquadFilter();
		window.audioBuffers = {};
		loadKit('house');
		loadSavedPresets();
	}, [loadKit]);

	return (
		<div className="App">
			<img
				className="bg-image"
				src="/assets/images/brushed-aluminium.jpg"
				alt="brushed aluminium"
			/>
			<ControlPanel />
			<Filter />
			<Sequencer />
		</div>
	);
}

export default App;
