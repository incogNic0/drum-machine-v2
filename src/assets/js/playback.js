const lookahead = 25.0;
const scheduleAheadTime = 0.1;
let tempo;
let currentStep = 0;
let nextStepTime = 0.0; // when the next note is due.
let timerID;
let KitState;

const audioContext = new AudioContext() ||  new window.webkitAudioContext();


export function updateTempo(newTempo) {
    tempo = newTempo;
}

export function handlePlayStop() {
    tempo = this.state.currentTempo;
    KitState = this.state.kitData;
    if(audioContext.state === 'suspended') audioContext.resume();
    if(!this.state.isPlaying) {
        currentStep = 0;
        nextStepTime = audioContext.currentTime;
        scheduler(); // handles scheduling and playback
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


function incrementStep() {
    const secondsPerBeat = 60.0 / tempo / 4; // sixteenth notes
    nextStepTime += secondsPerBeat; // when the next step should play
    currentStep++;
    if (currentStep === 16) currentStep = 0; // reset after 4 quarter notes
}


function scheduler() {
    while (nextStepTime < audioContext.currentTime + scheduleAheadTime ) {
        scheduleSamples(currentStep, nextStepTime);
        incrementStep();
    }
    // continues to call scheduler every 25ms (lookahead) 
    timerID = setTimeout(scheduler, lookahead);
}


// schedule playback for all active samples in the next step sequence
function scheduleSamples(step, startTime) {
    for (const sample in KitState) {
        const currentSample = KitState[sample];
        const isActive = currentSample.pattern[step];
        if(isActive) {
            playback(currentSample.audio, startTime);
        }
    }
}