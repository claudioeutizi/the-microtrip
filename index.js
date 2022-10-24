/* AudioContext */

window.audioContext = window.AudioContext || window.webkitAudioContext;
let context;
const oscillators = {};
const contextButton = document.querySelector('button');
contextButton.addEventListener('click', () => {
    context = new AudioContext();
    console.log(context);
});


/* MIDI */

if(navigator.requestMIDIAccess){
    navigator.requestMIDIAccess().then(midiSuccess, midiFailure); //do we have access to midi from browser?
}

function midiFailure(){
    console.log("Could not connect MIDI!");
}

//what i need from midi when i've a connection success
function midiSuccess(midiAccess){
    console.log(midiAccess);
    midiAccess.addEventListener('statechange', updateMidiDevices);
    const inputs = midiAccess.inputs;

    inputs.forEach((input) => {
        input.addEventListener('midimessage', handleMidiInput);//we wanna catch the midi information when a midi source sends to the browser a midi message
    })
}

function handleMidiInput(input){
    const command = input.data[0];    
    const note = input.data[1];    
    const velocity = input.data[2];
    switch(command){
        case 144:
        if(velocity > 0){
            midiNoteOn(note, velocity);
        } else {
            midiNoteOff(note);
        }
        break;
        case 128: //it can send a 128 message instead of a 144 with 0 velocity
        midiNoteOff(note);
        break;
    }
}

function midiNoteOn(note, velocity){
    const osc = context.createOscillator();
    console.log(oscillators)

    //general gain in order not to distorce the sound
    const oscGain = context.createGain();
    oscGain.gain.value = 0.1;

    //gain that depends on the velocity
    const velocityGainValue = (1/127) * velocity; //value range
    const velocityGain = context.createGain();
    velocityGain.gain.value = velocityGainValue;

    osc.type = 'sine';
    osc.frequency.value = midiToFrequency(note);
    osc.connect(oscGain);
    oscGain.connect(velocityGain)
    velocityGain.connect(context.destination);

    //this will contain all the infos about the oscillator
    osc.gain = oscGain;
    oscillators[note.toString()] = osc;
    osc.start();

}

function midiNoteOff(note){
    const osc = oscillators[note.toString()];
    const oscGain = osc.gain;

    oscGain.gain.setValueAtTime(oscGain.gain.value, context.currentTime);
    oscGain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.03);
    setTimeout(() => {
        osc.stop();
        osc.disconnect();
    }, 20);

    delete oscillators[note.toString()];
    console.log(oscillators);
}

function updateMidiDevices(event){
    console.log(event);
    console.log(`Name: ${event.port.name}, Brand: ${event.port.manufacturer}, State, ${event.port.state}, Type: ${event.port.type}`);
}

function midiToFrequency(number){
    const a = 440;
    return (a /32) * (2 ** ((number - 9) / 12));
}
