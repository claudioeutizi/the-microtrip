import React, { useState, useRef, useEffect } from "react";
import * as Tone from 'tone';
import instruments from './Instruments';



const SamplerEngine = ({ noteUp, noteDown, playTime, stopTime, velocity, selectedInst}) => {
  console.log("sampler engine",selectedInst)
  const [sampler, setSampler] = useState(null);


  const envelope = new Tone.AmplitudeEnvelope(
    // console.log("envelope generated"),
    {
    attack: 1,
    decay: 0.1,
    sustain: 1,
    release: 1
  })


  useEffect(() => {
    console.log("inside sampler")
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
    }));


  }, [selectedInst]);
    if(sampler){
      console.log("connettiti cazzo")
      sampler.chain(envelope, Tone.Destination);
    }
 

  useEffect(() => {
    if (noteUp) {
      // console.log("Stop time", stopTime)
     
      sampler.triggerRelease(noteUp, stopTime-0.8);
      envelope.triggerRelease();
    }
  }, [noteUp, stopTime]);

  useEffect(() => {
    if (noteDown) {
      // console.log("Playtime", playTime);
      
      console.log("inside note down")
      sampler.triggerAttack(noteDown, playTime-0.8, velocity);
      envelope.triggerAttack();
    }
  }, [noteDown, playTime, velocity]);
  // 
  
  return (
    null
  );
  
};

export default SamplerEngine;

  //polifonia da rivedere sostituire il trigger playtime con un contatore e velocity