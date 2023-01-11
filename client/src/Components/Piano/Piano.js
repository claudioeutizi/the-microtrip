import React from "react";
import {useRef, useEffect} from "react";
import NaturalKey from "./NaturalKey";
import SharpKey from "./SharpKey";

function Piano(props) {

  const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  const keys = "zsxdcvgbhnjmq2w3er5t6y7ui9o0p";
  const divRef = useRef();
  const click = useRef(false);

  /* ========================================== MIDI ================================================================ */


  /* ========================================== KEYBOARD RENDER ====================================================== */

  const keySelector = (note, octave) => `[dataNote="${note}"][dataOctave="${octave}"]`;
  
  function* noteGenerator(startNote) {

    const pivot = notes.indexOf(startNote);
    const layout = [...notes.slice(pivot, notes.length), ...notes.slice(0, pivot)];
    let octave = 3;           //INITIAL OCTAVE
    let first = true;
  
    while (true) {
        for (let i = 0; i < layout.length; i++) {
            const note = layout[i];
            if (note === "C" && !first) {
                octave = octave + 1;
            }
            yield { name: note, octave: octave };
            first = false;
        }
    }
  }

    const config = {
      keyCount: parseInt(props.keyCount || "88"), 
      keyboardLayout: props.keyboardLayout || "A", 
  }

  useEffect(() => {

    const piano = divRef.current;
    const handleClick = (event, downOrMove) => {
  
      const target = event.target;
      if (target.tagName === "rect") {
        const note = event.target.getAttribute("datanote");
        const octave = parseInt(event.target.getAttribute("dataoctave"));
        if (downOrMove && click.current) {
            setNoteDown(note, octave);
        }
        else {
          if (target.classList.contains("active")) {
            setNoteUp(note, octave);
            }
          }
        }
      }

      const setNoteDown = (note, octave) => {
        const elem = piano.querySelector(keySelector(note, octave));
        elem.classList.add("active");
        elem.setAttribute("active", true);
        document.dispatchEvent(new CustomEvent("notedown",
            {
              detail: {
                note: note + octave.toString()
              }
            }))
      }
  
      const setNoteUp = (note, octave) =>  {
        const elem = piano.querySelector(keySelector(note, octave));
        elem.classList.remove("active");
        elem.removeAttribute("dataactive");
        document.dispatchEvent(new CustomEvent("noteup",
            {
                detail: {
                  note: note + octave.toString()
                }
            }))
      } 

    piano.addEventListener("mouseover", event => {
      handleClick(event, true);
      event.preventDefault();
    }); 
      
    piano.addEventListener("mousedown", event => {
      click.current = true;
      handleClick(event, true);
      event.preventDefault();
    });
    
    piano.addEventListener("mouseup", event => {
      handleClick(event, false);
      click.current = false;
      event.preventDefault()
    });
    
    piano.addEventListener("mouseout", event => {
      handleClick(event, false);
      event.preventDefault()
    });

    //what i need from midi when i've a connection success
    const midiSuccess = (midiAccess) => {
      midiAccess.addEventListener('statechange', updateMidiDevices);
      const inputs = midiAccess.inputs;
      
    //we wanna catch the midi information when a midi source sends to the browser a midi message
      inputs.forEach((input) => {
          input.addEventListener('midimessage', handleMidiInput);
      })
    }

    const midiFailure = () =>{
      console.log("Could not connect MIDI!");
    }

    const midiRequest = () => {
      if(navigator.requestMIDIAccess){
          navigator.requestMIDIAccess().then(midiSuccess, midiFailure); //do we have access to midi from browser?
      }
    }
  
  midiRequest();
  
  const handleMidiInput = (input) => {
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
          default: break;
      }
  }
  
  const midiNoteOn = (noteNumber) => {

      const octave = Math.floor(noteNumber/12) + 2;
      const note = notes[noteNumber % 12];
      setNoteDown(note, octave);
  }
  
  const midiNoteOff = (noteNumber) => {
      const octave = Math.floor(noteNumber / 12) + 2;
      const note = notes[noteNumber % 12];
      setNoteUp(note, octave);
  }
  
  function updateMidiDevices(event){
  }

  /* ====================================================== KEYBOARD EVENTS =================================================== */

  document.body.onkeydown = function(event) {
    if (event.repeat) return;

    // noteToPlay = noteMap[event.key];
    // noteToPlay=notes[noteNumber];
    // console.log(noteToPlay);
    const noteNumber = keys.indexOf(event.key);
    const octave = Math.floor(noteNumber/12) + 4;
    //const noteToPlay = notes[noteNumber % 12] + octave.toString();
    
    // noteP=noteToPlay.charAt(0);
    // if(noteToPlay.includes("#")){
    //     noteP+="#";
    // }
    // piano.setNoteDown(noteP, noteToPlay.slice(-1));
    setNoteDown(notes[noteNumber % 12], octave);
}

document.body.onkeyup = function(event) {
    // noteToStop = noteMap[event.key];
    const noteNumber = keys.indexOf(event.key);
    const octave = Math.floor(noteNumber/12) + 4;
    //const noteToStop = notes[noteNumber % 12] + octave.toString();

    // noteS=noteToStop.charAt(0);
    // if(noteToStop.includes("#")){
    //     noteS+="#";
    // }
    // piano.setNoteUp(noteS, noteToStop.slice(-1));
    setNoteUp(notes[noteNumber % 12], octave);
}

  });

  const getNoteSvg = () => {
    const noteCount = config.keyCount;
    const generator = noteGenerator(config.keyboardLayout);
    const notes = new Array(noteCount).fill(1).map(() => generator.next().value);
    const naturalKeys = notes.filter(note => !note.name.includes("#")).length;
    const lastKeySharp = notes[notes.length - 1].name.includes("#");
    const totalWidth = naturalKeys * props.NaturalWidth + (lastKeySharp ? props.SharpWidth / 2 : 0) + 2;
    const viewBox = "0 0 "+totalWidth+" 52";
    return <svg viewBox= {viewBox} version="1.1" xmlns="http://www.w3.org/2000/svg">{getKeysForNotes(notes)}
        <defs>
        <linearGradient id="black-key-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
                <stop offset="0" stopColor="#383838"></stop>
                <stop offset="0.025"></stop>
                <stop offset="0.039" stopColor="#121212"></stop>
                <stop offset="0.094" stopColor="#272727"></stop>
                <stop offset="0.852" stopColor="#585858"></stop>
                <stop offset="0.877" stopColor="#141414"></stop>
                <stop offset="0.887" stopColor="#343434"></stop>
                <stop offset="0.921" stopColor="#2b2b2b"></stop>
                <stop offset="1"></stop>
        </linearGradient>

        <linearGradient id="black-key-gradient-active" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
            <stop offset="0" stopColor="rgb(70, 70, 70)"></stop>
            <stop offset="0.852" stopColor="#hsl(227, 0%, 22%)"></stop>
              <stop offset="0.877" stopColor="#141414"></stop>
              <stop offset="0.887" stopColor="#343434"></stop>
              <stop offset="0.921" stopColor="#2b2b2b"></stop>
        </linearGradient>

        <linearGradient id="black-key-hover" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
            <stop offset="0" stopColor="#383838"></stop>
            <stop offset="0.025"></stop>
            <stop offset="0.039" stopColor="#121212"></stop>
            <stop offset="0.133" stopColor="#272727"></stop>
            <stop offset="0.852" stopColor="#343434"></stop>
            <stop offset="0.877" stopColor="#141414"></stop>
            <stop offset="0.887" stopColor="#343434"></stop>
            <stop offset="0.916" stopColor="#2b2b2b"></stop>
            <stop offset="100%" stopColor="hsl(227, 0%, 22%)"></stop>
        </linearGradient>

        <linearGradient id="white-key-gradient" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0" stopColor="#b5b5b5"></stop>
            <stop offset="0.015" stopColor="#fff"></stop>
            <stop offset="0.892" stopColor="#fff"></stop>
            <stop offset="0.913" stopColor="#f4f4f4"></stop>
            <stop offset="0.922" stopColor="#e0e0e0"></stop>
            <stop offset="0.965" stopColor="#faf8f8"></stop>
            <stop offset="0.974" stopColor="#fff"></stop>
            <stop offset="1" stopColor="hsl(227, 0%, 42%)"></stop>
        </linearGradient>

        <linearGradient id="white-key-hover" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
            <stop offset="0" stopColor="#b5b5b5"></stop>
            <stop offset="0.015" stopColor="#fff"></stop>
            <stop offset="0.892" stopColor="#dbdbdb"></stop>
            <stop offset="0.913" stopColor="#f4f4f4"></stop>
            <stop offset="0.922" stopColor="#e0e0e0"></stop>
            <stop offset="0.965" stopColor="#faf8f8"></stop>
            <stop offset="0.974" stopColor="#ffffff"></stop>
            <stop offset="1" stopColor="hsl(227, 0%, 42%)"></stop>
        </linearGradient>

        <linearGradient id="white-key-gradient-active" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0" stopColor="rgb(145, 145, 145)"></stop>
            <stop offset="0.892" stopColor="#bfbfbf"></stop>
            <stop offset="0.913" stopColor="#cccccc"></stop>
            <stop offset="0.922" stopColor="#d9d9d9"></stop>
            <stop offset="0.965" stopColor="#e6e6e6"></stop>
            <stop offset="0.974" stopColor="#f2f2f2"></stop>
            <stop offset="1" stopColor="hsl(227, 0%, 42%)"></stop>
        </linearGradient>
        </defs>
      </svg>
  }

  const getKeysForNotes = (notes) => {
    let totalOffset = -props.NaturalWidth + 1;
    let thisOffset = 0;
    const offsets = notes.map(note => {
        const isSharp = note.name.includes("#");
        if (isSharp) {
            thisOffset = totalOffset + 7;
        }
        else {
            totalOffset = totalOffset + props.NaturalWidth;
            thisOffset = totalOffset;
        }
        return {
            note: note.name, 
            octave: note.octave, 
            offset: thisOffset
        }
    });

    const naturalOffsets = offsets.filter(pos => ! pos.note.includes("#"));

    const sharpOffsets = offsets.filter(pos => pos.note.includes("#"));

    const naturalKeys = naturalOffsets.map(pos => 
      <NaturalKey dataNote={pos.note} dataOctave={pos.octave} x={pos.offset}/>);

    const sharpKeys = sharpOffsets.map(pos =>
      <SharpKey dataNote={pos.note} dataOctave={pos.octave} x={pos.offset}/>);

    return <g>{naturalKeys}{sharpKeys}</g>
  }

  const pianoSVG = getNoteSvg();

  return (
      <div className = "Piano" ref = {divRef}>
      {pianoSVG}
      </div>
    );
}


Piano.defaultProps = {
  NaturalWidth: 10,
  SharpWidth: 6,
  keyboardLayout: "A",
  observedAttributes: ["keycount", "keyboardlayout"],
}

export default Piano;