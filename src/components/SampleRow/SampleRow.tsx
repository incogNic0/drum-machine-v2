import './SampleRow.css';
import React, { useCallback, useRef } from 'react';
import { useTypedSelector, useIsPlaying, useActions } from '../../hooks';
import StepPad from './StepPad';

interface SampleRowProps {
	sampleName: string;
}

const SampleRow: React.FC<SampleRowProps> = ({ sampleName }) => {
	const isPlaying = useIsPlaying();
	const audioRef = useRef<HTMLAudioElement>(null);
	const { toggleSampleStep, toggleMuteSample } = useActions();
	const currentStep = useTypedSelector(({ sequencer: { step } }) => step);
	const sample = useTypedSelector(({ samples }) => samples.data[sampleName]);

	const onClick = useCallback(
		(step: number, selected: boolean) => {
			toggleSampleStep(sampleName, step);
			if (audioRef.current && !selected && !isPlaying) {
				audioRef.current.currentTime = 0;
				audioRef.current.play();
			}
		},
		[sampleName, isPlaying]
	);

	const renderedPads = sample.steps.map((isSelected, i) => {
		const isActive = isPlaying && currentStep === i && isSelected;
		return (
			<StepPad
				step={i}
				selected={isSelected}
				active={isActive}
				onClick={onClick}
				key={i}
			/>
		);
	});

	const onToggleMute = () => {
		toggleMuteSample(sample.name);
	};

	return (
		<div className="sample-row">
			<div className={`sample-row-content ${sample.mute && 'is-muted'}`}>
				<h4>
					{sampleName}
					{sample.mute ? (
						<i className="fa-solid fa-volume-xmark" onClick={onToggleMute}></i>
					) : (
						<i className="fa-solid fa-volume-high" onClick={onToggleMute}></i>
					)}
				</h4>
				<audio ref={audioRef} src={sample.path} />
				<div className="sample-row-pads">{renderedPads}</div>
			</div>
		</div>
	);
};

export default SampleRow;
