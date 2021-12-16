import { getFile, playback } from "./playback";

export const resetSamplePattern = (kitData) => {
    const resetKit = copyKitData(kitData);
    resetKit.samples.map( sample => {
        sample.pattern = Array.from({length: 16}, () => false);
        sample.gainValue = 1;
        sample.panValue = 0;
        return sample;
    });

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

export function updateSample(sampleName, changeProp, newValue) {
    const copy = copyKitData(this.state.kitData);
    copy.samples.map(sample => {
        if(!sample[changeProp]) throw ReferenceError(`"${changeProp}" does not exist.`)
        if(sample.name === sampleName) {
            if (changeProp === 'pattern') {
                const step = newValue;
                sample.pattern[step] = !sample.pattern[step];
                if(sample.pattern[step] && !this.context.isPlaying) {
                    playback(sample, 0); // is active, but not playing
                }
            } else {
                sample[changeProp] = newValue;
            }
        }
        return sample;
    });
    return copy;
}

export function playSample(sampleName) {
    const [ sample ] = this.state.kitData.samples.filter( sample => {
        return sample.name === sampleName;
    })
    playback(sample, 0);
}

function copyKitData(kit) {
    const kitCopy = {...kit};
    const samplesCopy = kitCopy.samples.map( sample => {
        const sampleCopy = {...sample};
        const patternCopy = [...sample.pattern];
        sampleCopy.pattern = patternCopy;
        return sampleCopy;
    });
    kitCopy.samples = samplesCopy;
    return kitCopy;
}

