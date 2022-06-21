import React from 'react';

interface IndicatorProps {
	activeStep: boolean;
}

const Indicator: React.FC<IndicatorProps> = ({ activeStep }) => {
	return <div className={`beat-indicator ${activeStep ? 'active' : ''}`}></div>;
};

export default React.memo(Indicator);
