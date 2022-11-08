/* ===================================== MIDI ================================================================ */

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
}

function midiNoteOff(note){
}

function updateMidiDevices(event){
}

function midiToFrequency(number){
    const a = 440;
    return (a /32) * (2 ** ((number - 9) / 12));
}


/* ================================= PIANO =============================================================== */

const whiteKeyWidth = 80;
const pianoHeight = 400;

const naturalNotes = ["C", "D", "E", "F", "G", "A", "B"];
const naturalNotesSharps = ["C", "D", "F", "G", "A"];
const naturalNotesFlats = ["D", "E", "G", "A", "B"];

const range = ["A0", "C5"];

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
    createOctave(octaveNumber) {
        const octave = utils.createSVGElement("g");
        octave.classList.add("octave");
        octave.setAttribute("transform", `translate(${octaveNumber * octaveWidth}, 0)`);
        return octave;
    },
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

const pianoKeys = document.querySelectorAll(".key");
pianoKeys.forEach(key => {
    //mouse down: playing the clicked note
    key.addEventListener("mousedown", (e) => {
        const mouseNote = e.target.getAttribute("data-note-name")
        utils.removeClassFromNodeCollection(pianoKeys, "active");
            const naturalName = key.dataset.noteName;
            const sharpName = key.dataset.sharpName;
            const flatName = key.dataset.flatName;
            if(mouseNote == naturalName || mouseNote == sharpName || mouseNote == flatName){
                key.classList.add("active");
            }
        });

    //mouse up: release the note
    key.addEventListener("mouseup", (e) => {
        utils.removeClassFromNodeCollection(pianoKeys, "active");
    });
});


/* ========================================================================================================== */



