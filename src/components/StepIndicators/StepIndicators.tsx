import './StepIndicators.css';
import Indicator from './Indicator';
import { useTypedSelector, useIsPlaying } from '../../hooks';

function StepIndicators() {
	const indicatorsArray = [];
	const isPlaying = useIsPlaying();
	const currentStep = useTypedSelector(({ sequencer: { step } }) => step);
	for (let i = 0; i < 16; i++) {
		const activeStep = isPlaying && currentStep === i;
		indicatorsArray.push(<Indicator activeStep={activeStep} key={i} />);
	}

	return (
		<div className="indicator-panel">
			<div className="indicators">{indicatorsArray}</div>
		</div>
	);
}

export default StepIndicators;
