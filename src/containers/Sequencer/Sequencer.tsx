import './Sequencer.css';
import SampleRow from '../../components/SampleRow/SampleRow';
import { useTypedSelector } from '../../hooks';

const Sequencer = () => {
	const samples = useTypedSelector(({ samples }) => samples.order);
	return (
		<div className="sequencer">
			{samples.map((sample) => (
				<SampleRow sampleName={sample} key={sample} />
			))}
		</div>
	);
};

export default Sequencer;
