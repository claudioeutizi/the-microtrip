// import * as Tone from 'tone'

// Tone=require('tone');


const piano = document.getElementById("interactive-piano");

// const noteMap = { q: 'C5', 2: 'C#5', w: 'D5', 3:'D#5', e: 'E5', r:'F5', 5:'F#5', t:'G5', 6:'G#5', y: 'A5', 7: 'A#5', u: 'B5', i: 'C6', o:'D6', p:'E6'};

const keys="zsxdcvgbhnjmq2w3er5t6y7ui9o0p";
const notes=['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#','B']; 

const button = document.createElement('button');
button.innerText = 'Start';
document.body.appendChild(button);

//variabili daripulire
let dBVolume;
let octaveShift=0;
let octave;
let noteNumber;
let currentTime;
let noteS;
let noteP;
let noteToPlay;
let noteToStop;
let samplerIndex=0;
let octaveSelector = document.getElementById("octaveSelector");


//====================================SAMPLERS===================================//
let violin = new Tone.Sampler({
	"C5" : "Violin_C5.mp3"
}).toDestination();

let flute = new Tone.Sampler({
	"C6" : "Flute_C6.mp3"
}).toDestination();

let bass = new Tone.Sampler({
	"C5" : "Bass_C5.wav"
}).toDestination();


let arrayTemp = [violin, flute, bass];

// var vol = new Tone.Volume(dBVolume);
// instrument.chain(vol, Tone.Master)

//-------------------------------------loops------------------------------------//

// const loop=new Tone.Loop(()=>{
//     arrayTemp[samplerIndex].triggerAttack(noteToPlay)
// }, 1);
// Tone.Transport.start();



//===================================LISTENERS===================================//

//----------------------------------click events---------------------------------//
piano.addEventListener("note-down", (event) => {
    noteToPlay = event.detail.note;
    currentTime = Tone.now();
    playSound(noteToPlay,currentTime);
});

piano.addEventListener("note-up", (event) => {
    noteToStop = event.detail.note;
    stopSound(noteToStop);
});

document.getElementById("Instrument_data").addEventListener("change", ()=>{
    samplerIndex=document.getElementById("Instrument_data").selectedIndex
});

document.getElementById("octave").addEventListener("change", ()=>{
    octaveShift=parseInt(octaveSelector.elements[0].value,10);
});



button.onclick=function(){
    Tone.start();
    console.log("Tone started");
}
//---------------------------------keyboard events--------------------------------//
document.body.onkeydown = function(event) {
    if (event.repeat) return;

    currentTime = Tone.now();
    // noteToPlay = noteMap[event.key];
    // noteToPlay=notes[noteNumber];
    // console.log(noteToPlay);
    noteNumber=keys.indexOf(event.key);
    octave=Math.floor(noteNumber/12)+4+octaveShift;
    noteToPlay=notes[noteNumber % 12]+octave.toString();
    
    playSound(noteToPlay,currentTime);
    
    // noteP=noteToPlay.charAt(0);
    // if(noteToPlay.includes("#")){
    //     noteP+="#";
    // }
    // piano.setNoteDown(noteP, noteToPlay.slice(-1));
    piano.setNoteDown(notes[noteNumber % 12], octave);
}

document.body.onkeyup = function(event) {
    // noteToStop = noteMap[event.key];
    noteNumber=keys.indexOf(event.key);
    octave=Math.floor(noteNumber/12)+4+octaveShift;
    noteToStop=notes[noteNumber % 12]+octave.toString();
    
    stopSound(noteToStop);

    // noteS=noteToStop.charAt(0);
    // if(noteToStop.includes("#")){
    //     noteS+="#";
    // }
    // piano.setNoteUp(noteS, noteToStop.slice(-1));

    piano.setNoteUp(notes[noteNumber % 12], octave);
}

//===================================PLAY/STOP===================================//

function playSound(n,t){
    // loop.start();
    t=t-1;
    sampler.triggerAttack(n,t);
}

function stopSound(n){
    // loop.stop();
    sampler.triggerRelease(n);
}

//======================================MIDI=====================================//

function midiRequest() {
    if(navigator.requestMIDIAccess){
        navigator.requestMIDIAccess().then(midiSuccess, midiFailure); //do we have access to midi from browser?
    }
}

midiRequest();

function midiFailure(){
    console.log("Could not connect MIDI!");
}

//what i need from midi when i've a connection success
function midiSuccess(midiAccess){
    midiAccess.addEventListener('statechange', updateMidiDevices);
    const inputs = midiAccess.inputs;
    
    //we wanna catch the midi information when a midi source sends to the browser a midi message
    inputs.forEach((input) => {
        input.addEventListener('midimessage', handleMidiInput);
    })
}


function handleMidiInput(input){
    const command = input.data[0];    
    const noteNumber = input.data[1];    
    const velocity = input.data[2];
    switch(command){
        case 144:
        if(velocity > 0){
            midiNoteOn(noteNumber, velocity);

        } else {
            midiNoteOff(noteNumber);
        }
        break;
        case 128: //it can send a 128 message instead of a 144 with 0 velocity
        midiNoteOff(noteNumber);
        break;
    }
}

function midiNoteOn(noteNumber, velocity){
    //vedere la latenza e valutare se mettere questi passaggi all'interno di una funzione
    octave = Math.floor(noteNumber/12) + 2 + octaveShift;
    noteToPlay=notes[noteNumber % 12]+octave.toString();
    console.log(noteToPlay);

    playSound(noteToPlay,Tone.now());  //valutare la latenza di tone now all'interno o come variabile

    piano.setNoteDown(notes[noteNumber % 12], octave);
}

function midiNoteOff(noteNumber){
    octave=Math.floor(noteNumber/12)+2;
    noteToStop=notes[noteNumber % 12]+octave.toString();

    stopSound(noteToStop);

    piano.setNoteUp(notes[noteNumber % 12], octave);
}

function updateMidiDevices(event){
}

// function midi2Frequency(number){
//     const a = 440.0;
//     return (a/32) * (2 ** ((number - 9) / 12));
// }



//TO ADD: se il loop sta andando allora utilizzare un altro loop per avere polifonia
//Master volume vedi esempi jesus
//add the frequency attribute to the keys?
//add text to the keys

