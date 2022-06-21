import React from 'react';

interface StepPadProps {
	step: number;
	selected: boolean;
	active: boolean;
	onClick: (step: number, selected: boolean) => void;
}

const StepPad: React.FC<StepPadProps> = ({
	step,
	selected,
	active,
	onClick,
}) => {
	const playingClass = active ? 'playing' : '';
	const activeClass = selected ? 'selected' : '';
	return (
		<div
			className={`beat-pad btn ${activeClass} ${playingClass}`}
			onClick={() => onClick(step, selected)}
		></div>
	);
};

export default React.memo(StepPad);
