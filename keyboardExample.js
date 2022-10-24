//The createNoteTable() function builds the array noteFreq to contain 
//an array of objects representing each octave. 
//Each octave, in turn, has one named property for each note in that octave; 
//the property's name is the note's name (such as "C#" to represent C-sharp), 
// and the value is the frequency, in Hertz, of that note.

function createNoteTable(){
    const noteFreq = [];
    for (let i = 0; i < 9; i++){
        noteFreq [i] = [];
    }

  noteFreq[0]["A"] = 27.500000000000000;
  noteFreq[0]["A#"] = 29.135235094880619;
  noteFreq[0]["B"] = 30.867706328507756;

  noteFreq[1]["C"] = 32.703195662574829;
  noteFreq[1]["C#"] = 34.647828872109012;
  noteFreq[1]["D"] = 36.708095989675945;
  noteFreq[1]["D#"] = 38.890872965260113;
  noteFreq[1]["E"] = 41.203444614108741;
  noteFreq[1]["F"] = 43.653528929125485;
  noteFreq[1]["F#"] = 46.249302838954299;
  noteFreq[1]["G"] = 48.999429497718661;
  noteFreq[1]["G#"] = 51.913087197493142;
  noteFreq[1]["A"] = 55.000000000000000;
  noteFreq[1]["A#"] = 58.270470189761239;
  noteFreq[1]["B"] = 61.735412657015513;

  for(var i = 2; i < 8; i++){
    noteFreq[i]["C"] = noteFreq[i-1]["C"] * 2;
    noteFreq[i]["C#"] = noteFreq[i-1]["C#"] * 2;
    noteFreq[i]["D"] = noteFreq[i-1]["D"]  * 2;
    noteFreq[i]["D#"] = noteFreq[i-1]["D#"]  * 2;
    noteFreq[i]["E"] = noteFreq[i-1]["E"]  * 2;
    noteFreq[i]["F"] = noteFreq[i-1]["F"]  * 2;
    noteFreq[i]["F#"] = noteFreq[i-1]["F#"]  * 2;
    noteFreq[i]["G"] = noteFreq[i-1]["G"]  * 2;
    noteFreq[i]["G#"] = noteFreq[i-1]["G#"]  * 2;
    noteFreq[i]["A"] = noteFreq[i-1]["A"]  * 2;
    noteFreq[i]["A#"] = noteFreq[i-1]["A#"]  * 2;
    noteFreq[i]["B"] = noteFreq[i-1]["B"]  * 2;

  }

  noteFreq[8]["C"] = 4186.009044809578154;
  return noteFreq;

}
function setup() {
    noteFreq = createNoteTable();
  
    volumeControl.addEventListener("change", changeVolume, false);
  
    mainGainNode = audioContext.createGain();
    mainGainNode.connect(audioContext.destination);
    mainGainNode.gain.value = volumeControl.value;
  
    // Create the keys; skip any that are sharp or flat; for
    // our purposes we don't need them. Each octave is inserted
    // into a <div> of class "octave".
  
    noteFreq.forEach((keys, idx) => {
      const keyList = Object.entries(keys);
      const octaveElem = document.createElement("div");
      octaveElem.className = "octave";
  
      keyList.forEach((key) => {
        if (key[0].length === 1) {
          octaveElem.appendChild(createKey(key[0], idx, key[1]));
        }
      });
  
      keyboard.appendChild(octaveElem);
    });
  
    document.querySelector("div[data-note='B'][data-octave='5']").scrollIntoView(false);
  
    sineTerms = new Float32Array([0, 0, 1, 0, 1]);
    cosineTerms = new Float32Array(sineTerms.length);
    customWaveform = audioContext.createPeriodicWave(cosineTerms, sineTerms);
  
    for (let i = 0; i < 9; i++) {
      oscList[i] = {};
    }
  }
  
  setup();


  function createKey(note, octave, freq) {
    const keyElement = document.createElement("div");
    const labelElement = document.createElement("div");
  
    keyElement.className = "key";
    keyElement.dataset["octave"] = octave;
    keyElement.dataset["note"] = note;
    keyElement.dataset["frequency"] = freq;
  
    labelElement.innerHTML = `${note}<sub>${octave}</sub>`;
    keyElement.appendChild(labelElement);
  
    keyElement.addEventListener("mousedown", notePressed, false);
    keyElement.addEventListener("mouseup", noteReleased, false);
    keyElement.addEventListener("mouseover", notePressed, false);
    keyElement.addEventListener("mouseleave", noteReleased, false);
  
    return keyElement;
  }
