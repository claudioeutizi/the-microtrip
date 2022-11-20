/* ===================================== NOTES Frequencies =================================================== */

function createNoteTable() {
    const noteFreq = [];
    for (let i=0; i<9; i++) {
      noteFreq[i] = [];
    }
  
    noteFreq[0]["A"] = 27.50000000000000;
    noteFreq[0]["A#"] = 29.13523509488061;
    noteFreq[0]["Bb"] = 29.13523509488061;
    noteFreq[0]["B"] = 30.86770632850775;
  
    noteFreq[1]["C"] = 32.70319566257482;
    noteFreq[1]["C#"] = 34.64782887210901;
    noteFreq[1]["Db"] = 34.64782887210901;
    noteFreq[1]["D"] = 36.70809598967594;
    noteFreq[1]["D#"] = 38.89087296526011;
    noteFreq[1]["Eb"] = 38.89087296526011;
    noteFreq[1]["E"] = 41.20344461410874;
    noteFreq[1]["F"] = 43.65352892912548;
    noteFreq[1]["F#"] = 46.24930283895429;
    noteFreq[1]["Gb"] = 46.24930283895429;
    noteFreq[1]["G"] = 48.99942949771866;
    noteFreq[1]["G#"] = 51.91308719749314;
    noteFreq[1]["Ab"] = 51.91308719749314;
    noteFreq[1]["A"] = 55.00000000000000;
    noteFreq[1]["A#"] = 58.27047018976123;
    noteFreq[1]["Bb"] = 58.27047018976123;
    noteFreq[1]["B"] = 61.73541265701551;

    for(let i=2; i<8; i++){
        noteFreq[i]["C"] = 2*noteFreq[i-1]["C"];
        noteFreq[i]["C#"] = 2*noteFreq[i-1]["C#"];
        noteFreq[i]["Db"] = 2*noteFreq[i-1]["Db"];
        noteFreq[i]["D"] = 2*noteFreq[i-1]["D"];
        noteFreq[i]["D#"] = 2*noteFreq[i-1]["D#"];
        noteFreq[i]["Eb"] = 2*noteFreq[i-1]["Eb"];
        noteFreq[i]["E"] = 2*noteFreq[i-1]["E"];
        noteFreq[i]["F"] = 2*noteFreq[i-1]["F"];
        noteFreq[i]["F#"] = 2*noteFreq[i-1]["F#"];
        noteFreq[i]["Gb"] = 2*noteFreq[i-1]["Gb"];
        noteFreq[i]["G"] = 2*noteFreq[i-1]["G"];
        noteFreq[i]["G#"] = 2*noteFreq[i-1]["G#"];
        noteFreq[i]["Ab"] = 2*noteFreq[i-1]["Ab"];
        noteFreq[i]["A"] = 2*noteFreq[i-1]["A"];
        noteFreq[i]["A#"] = 2*noteFreq[i-1]["A#"];
        noteFreq[i]["Bb"] = 2*noteFreq[i-1]["Bb"];
        noteFreq[i]["B"] = 2*noteFreq[i-1]["B"];
    }

    noteFreq[8]["C"] = 4186.009044809578154;
    return noteFreq;
}

const noteFrequenciesTable = createNoteTable();

/* ================================= PIANO =============================================================== */

const whiteKeyWidth = 80;
const pianoHeight = 400;

const naturalNotes = ["C", "D", "E", "F", "G", "A", "B"];
const naturalNotesSharps = ["C", "D", "F", "G", "A"];
const naturalNotesFlats = ["D", "E", "G", "A", "B"];
const range = ["C2", "B6"];

const keyboardApp = {
    setupPiano() {
        const piano = document.querySelector("#piano");
        const allNaturalNotes = this.getAllNaturalNotes(range);
        const pianoWidth = allNaturalNotes.length * whiteKeyWidth;

        const SVG = this.createMainSVG(pianoWidth, pianoHeight);
       
        // Add white keys
        let whiteKeyPositionX = 0;

        allNaturalNotes.forEach((noteName) => {
            const whiteKeyAndTextGroup = utils.createSVGElement("g");
            const whiteKey = this.createKey({ className: "white-key", width: whiteKeyWidth, height: pianoHeight });
            const text = utils.createSVGElement("text");
            
            utils.addTextContent(text, noteName);
            utils.setAttributes(whiteKeyAndTextGroup, {
                "width": whiteKeyWidth,
                "height": pianoHeight
            });
            utils.setAttributes(text, {
                "x": whiteKeyPositionX + whiteKeyWidth / 2,
                "y": 380,
                "text-anchor": "middle",
            });
            utils.setAttributes(whiteKey, {
                "x": whiteKeyPositionX,
                "data-note-name": noteName,
                "fill": "url(#white-key-gradient)",
                "rx": "8",
                "ry": "8"
            });

            text.classList.add("white-key-text");
            whiteKeyAndTextGroup.appendChild(whiteKey);
            whiteKeyAndTextGroup.appendChild(text);
            SVG.appendChild(whiteKeyAndTextGroup);
            
            // Increment spacing between keys
            whiteKeyPositionX += whiteKeyWidth;
        });

        // Add black keys
        let blackKeyPositionX = 60;
        allNaturalNotes.forEach((naturalNote, index, array) => {
            // If last iteration of keys, do not add black key
            if (index === array.length - 1) {
                return;
            }

            const blackKeyTextGroup = utils.createSVGElement("g");
            const blackKey = this.createKey( { className : "black-key", width: whiteKeyWidth / 2, height: pianoHeight / 1.6 });
            const flatNameText = utils.createSVGElement("text");
            const sharpNameText = utils.createSVGElement("text");

            utils.setAttributes(blackKeyTextGroup, { "width": whiteKeyWidth / 2});


            for (let i = 0; i < naturalNotesSharps.length; i++) {
                let naturalSharpNoteName = naturalNotesSharps[i];
                let naturalFlatNoteName = naturalNotesFlats[i];
                
                if (naturalSharpNoteName === naturalNote[0]) {
                    
                    utils.setAttributes(blackKey, {
                        "x": blackKeyPositionX,
                        "data-sharp-name": `${ naturalSharpNoteName }#${ naturalNote[1]}`,
                        "data-flat-name": `${ naturalFlatNoteName }b${ naturalNote[1]}`,
                        "fill": "url(#black-key-gradient)",
                        "rx": "3",
                        "ry": "3"
                    });

                    utils.setAttributes(sharpNameText, {
                        "text-anchor": "middle",
                        'y': 215,
                        "x": blackKeyPositionX + (whiteKeyWidth / 4)
                    });

                    utils.setAttributes(flatNameText, {
                        "text-anchor": "middle",
                        'y': 235,
                        "x": blackKeyPositionX + (whiteKeyWidth / 4)
                    });

                    utils.addTextContent(sharpNameText, `${ naturalSharpNoteName}♯`);
                    utils.addTextContent(flatNameText, `${ naturalFlatNoteName}♭`);

                    flatNameText.classList.add("black-key-text");
                    sharpNameText.classList.add("black-key-text");

                    // Add double spacing between D# and A#
                    if (naturalSharpNoteName === "D" || naturalSharpNoteName === "A") {
                        blackKeyPositionX += whiteKeyWidth * 2;
                    } else {
                        blackKeyPositionX += whiteKeyWidth;
                    }
                    
                    blackKeyTextGroup.appendChild(blackKey);
                    blackKeyTextGroup.appendChild(flatNameText);
                    blackKeyTextGroup.appendChild(sharpNameText);
                }
                
            }
            SVG.appendChild(blackKeyTextGroup);
        });
         // Add main SVG to piano div

         piano.appendChild(SVG);
    },
    // createOctave(octaveNumber) {
    //     const octave = utils.createSVGElement("g");
    //     octave.classList.add("octave");
    //     octave.setAttribute("transform", `translate(${octaveNumber}, 0)`);
    //     return octave;
    // },

    createKey({ className, width, height }) {
        const key = utils.createSVGElement("rect");
        key.classList.add(className, "key");
        utils.setAttributes(key, {
            "width": width,
            "height": height,
        });

        return key;
    },
    getAllNaturalNotes([firstNote, lastNote]) {
        // Assign octave number, notes and positions to variables
        const firstNoteName = firstNote[0];
        const firstOctaveNumber = parseInt(firstNote[1]);

        const lastNoteName = lastNote[0];
        const lastOctaveNumber = parseInt(lastNote[1]);

        const firstNotePosition = naturalNotes.indexOf(firstNoteName);
        const lastNotePosition = naturalNotes.indexOf(lastNoteName);

        const allNaturalNotes = [];

        for (let octaveNumber = firstOctaveNumber; octaveNumber <= lastOctaveNumber; octaveNumber++) {
            // Handle first octave
            if (octaveNumber === firstOctaveNumber) {
                naturalNotes.slice(firstNotePosition).forEach((noteName) => {
                    allNaturalNotes.push(noteName + octaveNumber);
                });

                // Handle last octave
            } else if (octaveNumber === lastOctaveNumber) {
                naturalNotes.slice(0, lastNotePosition + 1).forEach((noteName) => {
                    allNaturalNotes.push(noteName + octaveNumber);
                });

            } else {
                naturalNotes.forEach((noteName) => {
                    allNaturalNotes.push(noteName + octaveNumber);
                });
            }
        }
        return allNaturalNotes;
    },
    createMainSVG(pianoWidth, pianoHeight) {
        const svg = utils.createSVGElement("svg");

        utils.setAttributes(svg, {
            "width": "100%",
            "version": "1.1",
            "xmlns": "http://www.w3.org/2000/svg",
            "xmlns:xlink": "http://www.w3.org/1999/xlink",
            "xmlns:svgjs": "http://svgjs.dev/svgjs",
            "viewBox": `0 0 ${pianoWidth} ${pianoHeight}`
        });
        return svg;
    }
}

const utils = {
    createSVGElement(el) {
        const element = document.createElementNS("http://www.w3.org/2000/svg", el);
        return element;
    },
    setAttributes(el, attrs) {
        for (let key in attrs) {
            el.setAttribute(key, attrs[key]);
        }
    },
    addTextContent(el, content) {
        el.textContent = content;
    },
    removeClassFromNodeCollection(nodeCollection, classToRemove) {
        nodeCollection.forEach(node => {
            if (node.classList.contains(classToRemove)) {
                node.classList.remove(classToRemove);
            }
        });
    }
}

keyboardApp.setupPiano();
/* ===================================== KEYS ================================================================= */
const pianoKeys = document.querySelectorAll(".key");

pianoKeys.forEach(key => {
    //mouse down: playing the clicked note
    key.addEventListener("mousedown", (e) => {
        let mouseNote = e.target.getAttribute("data-note-name");
        if(mouseNote == null){
            mouseNote = e.target.getAttribute("data-sharp-name");
        }  
        utils.removeClassFromNodeCollection(pianoKeys, "active");
            const naturalName = key.dataset.noteName;
            const sharpName = key.dataset.sharpName;
            const flatName = key.dataset.flatName;
            if(mouseNote == naturalName || mouseNote == sharpName || mouseNote == flatName){
                key.classList.toggle("active");
            }
        });

    //mouse up: release the note
    key.addEventListener("mouseup", (e) => {
        if(e.target.classList.contains("active")){
            e.target.classList.remove("active");
        }
    });
});

/* ============================== CONNECTING FREQUENCIES TO NOTE NAMES ======================================= */
pianoKeys.forEach(key => {
    nName = key.dataset.noteName;
    if(nName != null){
        key.setAttribute("frequency", noteFrequenciesTable[parseInt(nName[1])][nName[0]]);
    }
    else {
        nName = key.dataset.sharpName;
        key.setAttribute("frequency", noteFrequenciesTable[parseInt(nName[2])][(nName[0]+nName[1])]);
    }
});

/* ===================================== MIDI ================================================================ */

/* MIDI */
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
    console.log(midiAccess);
    midiAccess.addEventListener('statechange', updateMidiDevices);
    const inputs = midiAccess.inputs;
    
    //we wanna catch the midi information when a midi source sends to the browser a midi message
    inputs.forEach((input) => {
        input.addEventListener('midimessage', handleMidiInput);
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
    const midiFreq = midi2Frequency(note).toFixed(4);
    pianoKeys.forEach(key => {
        const keyFreq = parseFloat(key.getAttribute("frequency")).toFixed(4);
        if(keyFreq === midiFreq){
            key.classList.add("active");
            console.log(key.getAttribute("data-note-name"));
        }
    });
}

function midiNoteOff(note){
    const midiFreq = midi2Frequency(note).toFixed(4);
    pianoKeys.forEach(key => {
        const keyFreq = parseFloat(key.getAttribute("frequency")).toFixed(4);
        if(keyFreq == midiFreq){
           if(key.classList.contains("active")){
                key.classList.remove("active");
            }
        }
    });
}

function updateMidiDevices(event){
}

function midi2Frequency(number){
    const a = 440.0;
    return (a/32) * (2 ** ((number - 9) / 12));
}
/* =============================================NODE====================================================== */
/* =============================================TEST====================================================== */
