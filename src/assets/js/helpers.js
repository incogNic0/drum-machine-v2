import { getFile, playback } from "./playback";

export const resetSamples = (samples) => {
	const resetSamples = samples.map( sample => {
    const copy = {...sample};
    copy.pattern = Array.from({ length: 16 }, () => false);
    copy.effects = { gainValue: 1, panValue: 0};

    return copy;
  })

	return resetSamples;
};

export const getSamplesAudio = async (samples) => {
	const updatedSamples = [];

	for (const sample of samples) {
		const sampleCopy = {...sample };
		sampleCopy.audio = await getFile(sample.path);

    updatedSamples.push(sampleCopy);
	}

	return updatedSamples;
};

export function updatePattern(sampleName, step) {
  const updated = this.state.samples.map( sample => {
    if(sample.name === sampleName) {
      const copy = {...sample};
      copy.pattern = [...sample.pattern];
      copy.pattern[step] = !copy.pattern[step]
      
      if(copy.pattern[step] && !this.context.isPlaying) {
        playback(copy, 0);
      }
      return copy;
    }
      
    return sample;
  });

	return updated
}

export function updateEffect(sampleName, effect, value) {
  const updated = this.state.samples.map( sample => {
    if(sample.name === sampleName) {
      const copy = {...sample};
      copy.effects = {...sample.effects};
      copy.effects[effect] = value;
    
      return copy;
    }
    
    return sample;
  });

  return updated;
}
