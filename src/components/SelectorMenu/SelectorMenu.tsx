import React from 'react';
import './SelectorMenu.css';

interface SelectorMenuProps {
	options?: string[];
	value: string;
	onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	name?: string;
	children?: React.ReactNode;
}

const SelectorMenu = React.forwardRef<HTMLSelectElement, SelectorMenuProps>(
	({ options, value, onChange, name = 'select-menu', children }, ref) => {
		return (
			<select
				ref={ref}
				value={value.toLowerCase()}
				onChange={onChange}
				className="select-menu btn"
				name={name}
			>
				{options?.map((opt) => {
					return (
						<option value={opt.toLowerCase()} key={opt}>
							{opt}
						</option>
					);
				})}
				{children}
			</select>
		);
	}
);

export default SelectorMenu;
