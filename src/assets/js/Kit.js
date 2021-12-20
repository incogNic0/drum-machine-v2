export default class Kit {
	constructor({ name, defaultTempo, samples, path }) {
		this.name = name;
		this.tempo = defaultTempo;
    this.samples = this.loadSamples(samples, path);
	}

  loadSamples(namesArr, path) {
    const samples = [];
    for(const sampleName of namesArr) {
      const sampleData = {};
      
      sampleData.name = sampleName;

      // set all 16 steps to inactive
      sampleData.pattern = Array.from({ length: 16 }, () => false);

      sampleData.effects = {
        gainValue: 1,
        panValue: 0
      };

      sampleData.audio = null; // create buffer later (slows ui load)
      sampleData.path = path + sampleName.toLowerCase() + '.wav';
      
      samples.push(sampleData);
    }
    return samples;
  }
}
