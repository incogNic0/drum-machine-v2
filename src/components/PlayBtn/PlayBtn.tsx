import './PlayBtn.css';
import { useEffect } from 'react';
import { handlePlayback } from '../../utils';
import { useIsPlaying, useActions } from '../../hooks';

const PlayBtn = () => {
	const isPlaying = useIsPlaying();
	const { toggleIsPlaying, resetStep } = useActions();

	const iconClass = isPlaying ? 'fa-solid fa-stop' : 'fa-solid fa-play';
	const altText = isPlaying ? 'stop' : 'play';

	useEffect(() => {
		handlePlayback(isPlaying);
		resetStep();
	}, [isPlaying, resetStep]);

	return (
		<div
			className={`play-button btn ${isPlaying && 'active'}`}
			onClick={() => {
				toggleIsPlaying();
			}}
		>
			<i className={iconClass}></i>
		</div>
	);
};

export default PlayBtn;
