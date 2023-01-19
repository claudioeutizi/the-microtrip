import React, { useState, useRef, useEffect } from "react";
import * as Tone from 'tone';
import instruments from './Instruments';



const SamplerEngine = ({ noteUp, noteDown, playTime, stopTime, velocity, selectedInst}) => {
  // let selectedInstPrev;
  console.log("sampler engine",selectedInst)
  const [sampler, setSampler] = useState(null);
  

  useEffect(() => {
    setSampler(new Tone.Sampler({
      'A2': instruments[selectedInst].samples.A2,
      "C3": instruments[selectedInst].samples.C3,
      "D#3":instruments[selectedInst].samples.Ds3,
      "F#3":instruments[selectedInst].samples.Fs3,
      "A3": instruments[selectedInst].samples.A3,
      "C4": instruments[selectedInst].samples.C4,
      "D#4":instruments[selectedInst].samples.Ds4,
      "F#4":instruments[selectedInst].samples.Fs4,
      "A4": instruments[selectedInst].samples.A4,
      "C5": instruments[selectedInst].samples.C5,
      "D#5":instruments[selectedInst].samples.Ds5,
      "F#5":instruments[selectedInst].samples.Fs5,
      "A5": instruments[selectedInst].samples.A5,
      "C6": instruments[selectedInst].samples.C6,
      "D#6":instruments[selectedInst].samples.Ds6,
      "F#6":instruments[selectedInst].samples.Fs6,
      "A6": instruments[selectedInst].samples.A6
    }).toDestination());

  }, [selectedInst]);

  useEffect(() => {
    if (noteUp) {
      console.log("Stop time", stopTime)
      sampler.triggerRelease(noteUp, stopTime-0.8);
    }
  }, [noteUp, stopTime]);

  useEffect(() => {
    if (noteDown) {
      console.log("Playtime", playTime);
      sampler.triggerAttack(noteDown, playTime-0.8, velocity);
    }
  }, [noteDown, playTime, velocity]);


  return (
    null
  );
};


export default SamplerEngine;


//---Risolto il problema che dava togliendo una dependacy
//---Ora tone viene avviato automaticamente quando si clicca una città sulla mappa
//---Aggiunto un check in modo che se tone non è ancora avviato non si distrugge il sito ogni volta, 
//---semplicemente non suona

  //polifonia da rivedere sostituire il trigger playtime con un contatore e velocity