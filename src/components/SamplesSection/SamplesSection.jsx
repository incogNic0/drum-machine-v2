import React from "react";
import "../../assets/styles/SamplesSection.css";
import SampleRow from "./components/SampleRow";

function SamplesSection({ samples, onStepPadClick, onSampleRangeInput }) {
	if (!samples) return <div>Loading...</div>;
	return (
		<div className="samples-section">
			{samples.map((sample) => {
				const props = {
					sample,
					onStepPadClick,
					onSampleRangeInput,
					key: sample.name,
				};
				return <SampleRow {...props} />;
			})}
		</div>
	);
}

export default SamplesSection;
