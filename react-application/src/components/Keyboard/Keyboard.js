import React from "react";
import WhiteKey from "./WhiteKey"
import BlackKey from "./BlackKey"

const Keyboard = ({keys}) => {
    const whiteKeyWidth = 80;
    const pianoHeight = 400;

    const naturalNotes = ["C", "D", "E", "F", "G", "A", "B"];
    const naturalNotesSharps = ["C", "D", "F", "G", "A"];
    const naturalNotesFlats = ["D", "E", "G", "A", "B"];

    const range = ["C0", "B5"];

    function getAllNaturalNotes([firstNote, lastNote]) {
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
    }

    const allNaturalNotes = getAllNaturalNotes(range);
    const pianoWidth = allNaturalNotes.length * whiteKeyWidth;

    const AllWhiteKeys = () => {
        let whiteKeyX = 0;
        let whiteKeys = [];
        allNaturalNotes.forEach((note, index, array) =>{
            whiteKeys.push(<WhiteKey key={"white"+index} noteName={note} whiteKeyXPosition = {whiteKeyX}/>);
            whiteKeyX += whiteKeyWidth;
        });
        return whiteKeys;
    }

    const AllBlackKeys = () => {
        const sharp = "♯";
        const flat = "♭";
        let blackKeyX = 60;
        let blackKeys = [];
        allNaturalNotes.forEach((note, index, array) => {
            // If last iteration of keys, do not add black key
            if (index === array.length - 1) {
                return;
            }

            for (let i = 0; i < naturalNotesSharps.length; i++) {
                let naturalSharpNoteName = naturalNotesSharps[i];
                let naturalFlatNoteName = naturalNotesFlats[i];
                
                if (naturalSharpNoteName === note[0]) {

                    blackKeys.push(<BlackKey key={"black"+index} sharpName={naturalSharpNoteName+'#'+note[1]}
                    flatName={naturalFlatNoteName+'b'+note[1]} blackKeyXPosition = {blackKeyX} 
                    flatText = {naturalFlatNoteName+flat+note[1]} sharpText = {naturalSharpNoteName+sharp+note[1]}/>);

                    // Add double spacing between D# and A#
                    if (naturalSharpNoteName === "D" || naturalSharpNoteName === "A") {
                        blackKeyX += whiteKeyWidth * 2;
                    } else {
                        blackKeyX += whiteKeyWidth;
                    }
                }
            }
        });
        return blackKeys;
    }

    const AllKeys = () => {
        return [<AllWhiteKeys/> , <AllBlackKeys/>];
    }

    return (
        <div className = "keyboard">
            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
            xmlnssvgjs="http://svgjs.dev/svgjs" width= "100%" version="1.1"
                viewBox = {`0 0 ${pianoWidth} ${pianoHeight}`}>
            <AllKeys/>
            </svg>
        </div>
      )
}

export default Keyboard