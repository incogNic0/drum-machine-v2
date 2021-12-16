export default class KitData {
    constructor({name, path, defaultTempo, samples}) {
        this.name = name;
        this.defaultTempo = defaultTempo;
        this.samples = samples.map( sampleName => {
            const sample = {
                name: sampleName,
                pattern: Array.from({ length: 16 }, () => false),
                audio: null,
                gainValue: 1,
                panValue: 0,
                url: path + sampleName.toLowerCase() + '.wav'
            }
            return sample
        })
    }
}