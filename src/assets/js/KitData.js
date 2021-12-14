export default class KitData {
    constructor(path, ...args) {
        args.forEach(sample => {
            this[sample] = {
                pattern: Array.from({ length: 16 }, () => false),
                audio: null,
                url: path + sample.toLowerCase() + '.wav'
            }
        });
    }
}