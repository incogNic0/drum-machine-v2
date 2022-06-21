import './PlayBtn.css';
import { useIsPlaying, useActions } from '../../hooks';
import { handlePlayback } from '../../utils';
import { useEffect } from 'react';

const PlayBtn = () => {
	const isPlaying = useIsPlaying();
	const { toggleIsPlaying, resetStep } = useActions();

	const imgPath = isPlaying ? '/images/stop.png' : '/images/play.png';
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
			<img src={imgPath} alt={altText} />
		</div>
	);
};

export default PlayBtn;
