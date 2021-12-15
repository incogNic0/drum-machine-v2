const lookahead = 25.0; // milliseconds
const scheduleAheadTime = 0.1; // seconds
let nextStepTime = 0.0;
let currentStep;
let timerID;
let kitState;
let stepsQueue = []
const audioContext = new AudioContext() ||  new window.webkitAudioContext();


export function handlePlayStop(context) {
    kitState = this.state.kitData;
    if(audioContext.state === 'suspended') audioContext.resume();
    if(!context.isPlaying) {
        currentStep = context.currentStep;
        nextStepTime = audioContext.currentTime;
        scheduler.call(this);
    } else {
        clearTimeout(timerID);
    }
}


export async function getFile(filepath) {
    const res = await fetch(filepath);
    const arrayBuffer = await res.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    return audioBuffer;
}

function playback(audio, startTime) {
    const playSound = audioContext.createBufferSource();
    playSound.buffer = audio;
    playSound.connect(audioContext.destination);
    playSound.start(startTime); // will play when audioContext.currentTime === startTime
}


function incrementStep(step) {
    const secondsPerBeat = 60.0 / this.state.currentTempo / 4; // sixteenth notes
    nextStepTime += secondsPerBeat; // when the next step should play
    currentStep++;
    if (currentStep === 16) currentStep = 0; // reset after 4 quarter notes
}

// let lastStep = 15;
function scheduler() {
    const currentTime = audioContext.currentTime
    // Schedule Audio Playback
    if (nextStepTime < currentTime + scheduleAheadTime ) {
        scheduleSamples(currentStep, nextStepTime); // controls audio playback
        incrementStep.call(this);
    } 

    // Increment curretnStep at specified time
    if (stepsQueue.length && stepsQueue[0].startTime < currentTime) {
        let step = stepsQueue[0].step;
        stepsQueue.shift();   // remove note from queue
        this.updateCurrentStep(step);
    }

    // continues to call scheduler every 25ms (lookahead) 
    timerID = setTimeout(scheduler.bind(this), lookahead);
}


// schedule playback for all active samples in the next step sequence
function scheduleSamples(step, startTime) {
    stepsQueue.push({ step, startTime });
    for (const sample of kitState.samples) {
        const isActive = sample.pattern[step];
        if(isActive) {
            playback(sample.audio, startTime);
        }
    }
}
