const whiteKeyWidth = 80;
const pianoHeight = 400;

const naturalNotes = ["C", "D", "E", "F", "G", "A", "B"];
const naturalNotesSharps = ["C", "D", "F", "G", "A"];
const naturalNotesFlats = ["D", "E", "G", "A", "B"];

const range = ["A5", "C7"];

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
                "filter": "url(#white-key-filter)",
                "rx": "6",
                "ry": "6"
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
                        "filter": "url(#black-key-filter)",
                        "rx": "2",
                        "ry": "2"
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
        let defs = document.createElementNS("http://www.w3.org/2000/svg","defs");
        defs.innerHTML = 
                `<radialGradient id="black-key-gradient">
                    <stop offset="0%" stop-color="hsl(315, 0%, 0%)"></stop>
                    <stop offset="100%" stop-color="hsl(227, 0%, 0%)"></stop>
                </radialGradient>
                <filter id="black-key-filter" x="-0%" y="-0%" width="100%" height="100%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feTurbulence type="fractalNoise" baseFrequency="0.004 0.001" numOctaves="2" seed="158" stitchTiles="stitch" x="0%" y="0%" width="100%" height="100%" result="turbulence"></feTurbulence>
                    <feGaussianBlur stdDeviation="19 0" x="0%" y="0%" width="100%" height="100%" in="turbulence" edgeMode="duplicate" result="blur"></feGaussianBlur>
                    <feBlend mode="color" x="0%" y="0%" width="100%" height="100%" in="SourceGraphic" in2="blur" result="blend"></feBlend>
                    <feColorMatrix type="saturate" values="3" x="0%" y="0%" width="100%" height="100%" in="blend" result="colormatrix"></feColorMatrix>
                </filter>
            
                <linearGradient gradientTransform="rotate(248, 0.5, 0.5)" x1="50%" y1="0%" x2="50%" y2="100%" id="white-key-gradient">
                    <stop stop-color="hsl(315, 0%, 100%)" stop-opacity="1" offset="0%"></stop>
                    <stop stop-color="#d0d0d0" stop-opacity="1" offset="100%"></stop>
                </linearGradient>
                <filter id="white-key-filter" x="0%" y="0%" width="100%" height="100%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feTurbulence type="fractalNoise" baseFrequency="0.002 0.006" numOctaves="2" seed="2" stitchTiles="stitch" x="0%" y="0%" width="100%" height="100%" result="turbulence"></feTurbulence>
                    <feGaussianBlur stdDeviation="100 100" x="0%" y="0%" width="100%" height="100%" in="turbulence" edgeMode="duplicate" result="blur"></feGaussianBlur>
                    <feBlend mode="color-dodge" x="0%" y="0%" width="100%" height="100%" in="SourceGraphic" in2="blur" result="blend"></feBlend>
                </filter>
                
                <linearGradient gradientTransform="rotate(185, 0.5, 0.5)" x1="50%" y1="0%" x2="50%" y2="100%" id="playing-white-key-gradient">
                <stop stop-color="rgb(189, 189, 189)" stop-opacity="1" offset="0%"></stop>
                <stop stop-color="hsl(227, 0%, 42%)" stop-opacity="1" offset="100%"></stop></linearGradient>
                <filter id="playing-white-key-filter" x="0%" y="0%" width="100%" height="100%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.001 0.001" numOctaves="1" seed="2" stitchTiles="stitch" x="0%" y="0%" width="100%" height="100%" result="turbulence"></feTurbulence>
            <feGaussianBlur stdDeviation="100 100" x="0%" y="0%" width="100%" height="100%" in="turbulence" edgeMode="duplicate" result="blur"></feGaussianBlur>
            <feBlend mode="color-dodge" x="0%" y="0%" width="100%" height="100%" in="SourceGraphic" in2="blur" result="blend"></feBlend>
            <feColorMatrix type="saturate" values="3" x="0%" y="0%" width="100%" height="100%" in="blend" result="colormatrix"></feColorMatrix>
          </filter>
          <radialGradient id="playing-black-key-gradient">
          <stop offset="0%" stop-color="rgb(51, 51, 51)"></stop>
          <stop offset="100%" stop-color="hsl(227, 0%, 22%)"></stop>
        </radialGradient>
        <filter id="playing-black-key-filter" x="0%" y="0%" width="100%" height="100%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency="0.004 0.002" numOctaves="1" seed="2" stitchTiles="stitch" x="0%" y="0%" width="100%" height="100%" result="turbulence"></feTurbulence>
        <feGaussianBlur stdDeviation="0 0" x="0%" y="0%" width="100%" height="100%" in="turbulence" edgeMode="duplicate" result="blur"></feGaussianBlur>
        <feBlend mode="color" x="0%" y="0%" width="100%" height="100%" in="SourceGraphic" in2="blur" result="blend"></feBlend>
        <feColorMatrix type="saturate" values="3" x="0%" y="0%" width="100%" height="100%" in="blend" result="colormatrix"></feColorMatrix>
            </filter>`;
      svg.appendChild(defs);
        return svg;
    },

    displayPlayingNotes(e) {
        const mouseNote = e.target.getAttribute("data-note-name")
        const pianoKeys = document.querySelectorAll(".key");
        utils.removeClassFromNodeCollection(pianoKeys, "playing");
            pianoKeys.forEach(key => {
                const naturalName = key.dataset.noteName;
                const sharpName = key.dataset.sharpName;
                const flatName = key.dataset.flatName;
                if(mouseNote == naturalName || mouseNote == sharpName || mouseNote == flatName){
                    key.classList.add("playing");
                }
        });
    },
    displayNoteOnMousePassage(note){
        object.addEventListener("mouseover", myScript);
        const pianoKeys = document.querySelectorAll(".key");
        utils.removeClassFromNodeCollection(pianoKeys, "mouse-highlighted");            
        pianoKeys.forEach(key => {
            const naturalName = key.dataset.noteName;
            const sharpName = key.dataset.sharpName;
            const flatName = key.dataset.flatName;

            if (naturalName === noteName || sharpName === noteName || flatName === noteName) {
                key.classList.add("mouse-highlighted");
            }
        });
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
    key.addEventListener("click", (e) => {keyboardApp.displayPlayingNotes(e)});
});
