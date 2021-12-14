import { getFile } from "./playback";

export const resetSamplePattern = (kitData) => {
    const resetKit = {...kitData};
    for (const sample in resetKit) {
        const kitSample = {...resetKit[sample]}
        kitSample.pattern = Array.from({ length: 16 }, () => false);
        resetKit[sample] = kitSample;
    }
    return resetKit;
}

export const getKitAudio = async kit => {
    const updatedKit = {...kit};
    for (const sample in updatedKit) {
        const sampleCopy = {...updatedKit[sample]}
        sampleCopy.audio = await getFile(sampleCopy.url);
        updatedKit[sample] = sampleCopy;
    }
    return updatedKit;
}
