//Creating context
window.AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

//Creating a buffer of 1 second
const buffer = audioContext.createBuffer(
    1,
    audioContext.sampleRate * 1,
    audioContext.sampleRate
);

//Filling the buffer with rand in order to create a white noise
const channelData = buffer.getChannelData(0);
for (let i = 0; i < buffer.length; i++) {
    channelData[i] = Math.random() * 2 - 1;

}

//Gain managing
const primaryGainControl = audioContext.createGain();
primaryGainControl.gain.setValueAtTime(0.05, 0);

//connecting gain to master (destination of the audio context = output)
primaryGainControl.connect(audioContext.destination);

//Creating a button to press in order to generate the noise
const button = document.createElement('button');
button.innerText = "White Noise";

//listener that tells the system what to do when the button is clicked
button.addEventListener("click", () => {
    const whiteNoiseSource = audioContext.createBufferSource();
    // assigning the previously filled buffer
    whiteNoiseSource.buffer = buffer;
    whiteNoiseSource.connect(primaryGainControl);
    whiteNoiseSource.start();
});
//attaching the button to the page
document.body.appendChild(button);

//Creating a snare (high-filtered noise)
const snareFilter = audioContext.createBiquadFilter();
snareFilter.type = "highpass";
snareFilter.frequency = 1500;
snareFilter.connect(primaryGainControl);

//same as before
const snareButton = document.createElement("button");
snareButton.innerText = "snare";
snareButton.addEventListener("click", () => {
    const whiteNoiseSource = audioContext.createBufferSource();
    whiteNoiseSource.buffer = buffer;
    //snare gain envelope
    const whiteNoiseGain = audioContext.createGain();
    whiteNoiseGain.gain.setValueAtTime(
        1,
        audioContext.currentTime
    );

    whiteNoiseGain.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 0.2
    );

    whiteNoiseSource.connect(whiteNoiseGain);
    whiteNoiseGain.connect(snareFilter);
    whiteNoiseSource.start();
    whiteNoiseSource.stop(audioContext.currentTime + 0.2);

    const snareOscillator = audioContext.createOscillator();
    snareOscillator.type = "triangle";
    snareOscillator.frequency.setValueAtTime(180, audioContext.currentTime);

    const snareGain = audioContext.createGain();
    snareGain.gain.setValueAtTime(
        1,
        audioContext.currentTime
    );

    snareGain.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 0.2
    );

    snareOscillator.connect(snareGain);
    snareGain.connect(primaryGainControl);
    snareOscillator.start();
    snareOscillator.stop(audioContext.currentTime + 0.2);
});


document.body.appendChild(snareButton);


//kick drum
const kickButton = document.createElement("button");
kickButton.innerText = "Kick";
kickButton.addEventListener("click", () => {
    const kickOscillator = audioContext.createOscillator();
    kickOscillator.type = "sine";
    //low frequency oscillator
    kickOscillator.frequency.setValueAtTime(150, 0); //middle C

    //the frequency exponentially decays after to 0 after 0.5s
    kickOscillator.frequency.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime + 0.5
    );

    //kick gain node cause otherwise there will be tails and
    // clicks when
    //two or more kicks are played together
    const kickGain = audioContext.createGain();
    kickGain.gain.setValueAtTime(1, 0);
    kickGain.gain.exponentialRampToValueAtTime(
        0.001,
        audioContext.currentTime + 0.5
    );

    //kick -> kickGain -> primaryGain -> output
    kickOscillator.connect(kickGain);
    kickGain.connect(primaryGainControl);
    kickOscillator.start();
    kickOscillator.stop(audioContext.currentTime + 0.5);
});
document.body.appendChild(kickButton);

//hihat taken from file (useful for wavetable!!)
const HIHAT_URL = "https://unpkg.com/@teropa/drumkit@1.1.0/src/assets/hatOpen2.mp3";
const hihatButton = document.createElement('button');
hihatButton.innerText = "hi hat";

//hihat managing:
//1)i will wait for the response from the website
//2)creating an array buffer with the data i receive
//3)decoding the array data in audio buffer data
//4)creating a sound source from the decoded audio data

hihatButton.addEventListener("click", async() => {
    const response = await fetch(HIHAT_URL);
    const soundBuffer = await response.arrayBuffer();
    const hihatBuffer = await audioContext.decodeAudioData(soundBuffer);
    const hihatSource = audioContext.createBufferSource();
    hihatSource.buffer = hihatBuffer;

    //time scaling: modifying the duration i modify the pitch
    hihatSource.playbackRate.setValueAtTime(2, 0);
    
    hihatSource.connect(primaryGainControl);
    hihatSource.start();
    hihatSource.stop(audioContext.currentTime + 0.5);
});

document.body.appendChild(hihatButton);