import { getFile } from "./playback";

export const resetSamplePattern = (kitData) => {
    const resetKit = {...kitData};

    const resetSamples = kitData.samples.map( sample => {
        sample.pattern = Array.from({length: 16}, () => false);
        return sample;
    });

    resetKit.samples = resetSamples;

    return resetKit;
}

export const getKitAudio = async kit => {
    const updateKit = {...kit};
    const updateSamples = [];
    
    for (const sample of updateKit.samples) {
        const updateSample = {...sample};
        updateSample.audio = await getFile(sample.url);
        updateSamples.push(updateSample);
    }
    updateKit.samples = updateSamples;

    return updateKit;
}

export function updateSamplePattern(sampleName, stepNum) {
    const updateKit = {...this.state.kitData};
    const updateSamples = updateKit.samples.map( sample => {
        if(sample.name === sampleName) {
            sample.pattern[stepNum] = !sample.pattern[stepNum];

            if(sample.pattern[stepNum] && !this.context.isPlaying) {
                const audio = document.querySelector(`#${sampleName}`);
                audio.currentTime = 0;
                audio.play();
            }
        }
        return sample;
    })
    updateKit.samples = updateSamples;
    return updateKit;
}
