const lookahead = 25.0; // milliseconds
const scheduleAheadTime = 0.1; // seconds
let nextStepTime = 0.0;
let currentStep;
let timerID;
let kitState;
let stepsQueue = []
const audioContext = new AudioContext() ||  new window.webkitAudioContext();


export function handlePlayStop() {
    kitState = this.state.kitData;
    if(audioContext.state === 'suspended') audioContext.resume();
    if(!this.state.isPlaying) {
        currentStep = this.state.currentStep;
        nextStepTime = audioContext.currentTime;
        const startScheduler = scheduler.bind(this);
        startScheduler();
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


function incrementStep(tempo) {
    const secondsPerBeat = 60.0 / tempo / 4; // sixteenth notes
    nextStepTime += secondsPerBeat; // when the next step should play
    currentStep++;
    if (currentStep === 16) currentStep = 0; // reset after 4 quarter notes
}

function scheduler() {
    while (nextStepTime < audioContext.currentTime + scheduleAheadTime ) {
        scheduleSamples(currentStep, nextStepTime); // controls audio playback
        this.updateCurrentStep(currentStep); // controls animations
        incrementStep(this.state.currentTempo);
    }
    // continues to call scheduler every 25ms (lookahead) 
    timerID = setTimeout(scheduler.bind(this), lookahead);
}


// schedule playback for all active samples in the next step sequence
function scheduleSamples(step, startTime) {
    stepsQueue.push({ step, startTime });
    for (const sample in kitState) {
        const currentSample = kitState[sample];
        const isActive = currentSample.pattern[step];
        if(isActive) {
            playback(currentSample.audio, startTime);
        }
    }
}
