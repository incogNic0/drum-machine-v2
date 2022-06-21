import React, { useState } from 'react';
import './RangeInput.css';

interface RangeInputProps {
	label?: string;
	id?: string;
	value?: string | number;
	className?: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	step?: string;
	min?: string;
	max?: string;
}

const RangeInput: React.FC<RangeInputProps> = ({
	label,
	id,
	value,
	className = '',
	onChange,
	step,
	min,
	max,
}) => {
	const [inputValue, setInputValue] = useState(value || 0);
	const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.currentTarget.value);
		onChange(e);
	};
	return (
		<>
			{label && <label htmlFor={id}>{label}</label>}
			<input
				type="range"
				id={id}
				value={inputValue}
				className={`rs-range ${className}`}
				onChange={onInputChange}
				step={step}
				min={min}
				max={max}
			/>
		</>
	);
};

export default RangeInput;
