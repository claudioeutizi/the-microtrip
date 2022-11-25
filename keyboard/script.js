// import * as Tone from 'tone'

const piano = document.getElementById("interactive-piano");

const noteMap = { q: 'C5', 2: 'C#5', w: 'D5', 3:'D#5', e: 'E5', r:'F5', 5:'F#5', t:'G5', 6:'G#5', y: 'A5', 7: 'A#5', u: 'B5', i: 'C6', o:'D6', p:'E6'};


let noteS;
let noteP;
let noteToPlay;
let noteToStop;
let samplerIndex = document.getElementById("Instrument_data").selectedIndex;


//====================================SAMPLERS===================================//
let violin = new Tone.Sampler({
	"C5" : "Violin_C5.mp3"
}).toMaster();

let flute = new Tone.Sampler({
	"C6" : "Flute_C6.mp3"
}).toMaster();

let bass = new Tone.Sampler({
	"C5" : "Bass_C5.wav"
}).toMaster();

let arrayTemp = [violin, flute, bass];

//-------------------------------------loops------------------------------------//

const loop=new Tone.Loop(()=>{
    arrayTemp[samplerIndex].triggerAttack(noteToPlay)
}, 1);
Tone.Transport.start();



//===================================LISTENERS===================================//

//----------------------------------click events---------------------------------//
piano.addEventListener("note-down", (event) => {
    noteToPlay = event.detail.note;
    playSound(noteToPlay);
});

piano.addEventListener("note-up", (event) => {
    noteToStop = event.detail.note;
    stopSound(noteToStop);
});

document.getElementById("Instrument_data").addEventListener("change", ()=>{
    samplerIndex=document.getElementById("Instrument_data").selectedIndex
});

//---------------------------------keyboard events--------------------------------//
document.body.onkeydown = function(event) {
    if (event.repeat) return;
    noteToPlay = noteMap[event.key];
    
    playSound(noteToPlay);
    
    noteP=noteToPlay.charAt(0);
    if(noteToPlay.length-2){
        noteP=noteToPlay.slice(0,2);
    }
    piano.setNoteDown(noteP, noteToPlay.slice(-1));
}

//TO ADD: se il loop sta andando allora utilizzare un altro loop per avere polifonia
//LATENCY
//BROWSERIFY e vedere se la latenza si risolve con l'import
//ottave
//MIDI

document.body.onkeyup = function(event) {
    noteToStop = noteMap[event.key];
    
    stopSound(noteToStop);

    noteS=noteToStop.charAt(0);
    if(noteToStop.length-2){
        noteS=noteToStop.slice(0,2);
    }
    piano.setNoteUp(noteS, noteToStop.slice(-1));
}

//===================================PLAY/STOP===================================//

function playSound(n){
    // loop.start();
    arrayTemp[samplerIndex].triggerAttack(n)
}

function stopSound(n){
    // loop.stop();
    arrayTemp[samplerIndex].triggerRelease(n);
}




// var keyState = {};    
// window.addEventListener('keydown',function(e){
//     keyState[e.keyCode || e.which] = true;
// },true);    
// window.addEventListener('keyup',function(e){
//     keyState[e.keyCode || e.which] = false;
// },true);

// let x = 100;

// function gameLoop() {
//     if (keyState[37] || keyState[65]){
//         x -= 1;
//         console.log(x);
//     }    
//     if (keyState[39] || keyState[68]){
//         x += 1;
//         console.log(x);
//     }

//     // redraw/reposition your object here
//     // also redraw/animate any objects not controlled by the user

//     setTimeout(gameLoop, 10);
// }    
// gameLoop();


