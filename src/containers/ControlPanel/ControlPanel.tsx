import './ControlPanel.css';
import Tempo from '../../components/Tempo/Tempo';
import PlayBtn from '../../components/PlayBtn/PlayBtn';
import ResetBtn from '../../components/ResetBtn/ResetBtn';
import KitSelector from '../../components/KitSelector/KitSelector';
import StepIndicators from '../../components/StepIndicators/StepIndicators';
import PresetSelector from '../../components/PresetSelector/PresetSelector';

const ControlPanel = () => {
	return (
		<div className="control-panel">
			<PlayBtn />
			<ResetBtn />
			<KitSelector />
			<PresetSelector />
			<Tempo />
			<StepIndicators />
		</div>
	);
};

export default ControlPanel;
