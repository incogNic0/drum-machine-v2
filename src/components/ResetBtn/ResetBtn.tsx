import './ResetBtn.css';
import { useActions } from '../../hooks';

const ResetBtn = () => {
	const { resetSamplesSteps, toggleIsPlaying } = useActions();
	const onClick = () => {
		resetSamplesSteps();
		toggleIsPlaying(false);
	};
	return (
		<button className="reset-btn btn" onClick={onClick}>
			reset
		</button>
	);
};

export default ResetBtn;
