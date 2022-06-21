import './Tempo.css';
import { useTypedSelector, useActions } from '../../hooks';

const TempoCtrl = () => {
	const tempo = useTypedSelector(({ sequencer }) => sequencer.tempo);
	const { incrementTempo, decrementTempo } = useActions();

	return (
		<div className="tempo">
			<button
				className="tempo btn"
				name="tempo-decrement"
				onClick={decrementTempo}
			>
				{' '}
				-{' '}
			</button>
			<p className="current-tempo tempo">{tempo}</p>
			<button
				className="tempo btn"
				name="tempo-increment"
				onClick={incrementTempo}
			>
				{' '}
				+{' '}
			</button>
		</div>
	);
};

export default TempoCtrl;
