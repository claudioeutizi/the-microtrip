import React, { useState, useRef, useEffect } from "react";
import * as Tone from 'tone';
import {mellotron, sitar, guitar} from './Instruments';



const SamplerEngine = ({noteUp, noteDown, playTime, stopTime, velocity}) => {
    
  const instArray=[mellotron, sitar, guitar];
  const selectedInst=2;
  const [sampler, setSampler] = useState(null);


  useEffect(() => {

    setSampler(new Tone.Sampler({
        "C3" : instArray[selectedInst].C3,
        "D#3" : instArray[selectedInst].Ds3,
        "F#3" : instArray[selectedInst].Fs3,
        "A3" : instArray[selectedInst].A3,
        "C4" : instArray[selectedInst].C4,
        "D#4" : instArray[selectedInst].Ds4,
        "F#4" : instArray[selectedInst].Fs4,
        "A4" : instArray[selectedInst].A4,
        "C5" : instArray[selectedInst].C5,
        "D#5" : instArray[selectedInst].Ds5,
        "F#5" : instArray[selectedInst].Fs5,
        "A5" : instArray[selectedInst].A5,
        "C6" : instArray[selectedInst].C6,
        "D#6" : instArray[selectedInst].Ds6,
        "F#6" : instArray[selectedInst].Fs6,
        "A6" : instArray[selectedInst].A6
    }).toDestination());

    }, []);

  useEffect(() => {
    if (noteUp) {
      console.log(stopTime)
      sampler.triggerRelease(noteUp, stopTime-0.7);
    }
  }, [sampler, noteUp, stopTime]);

  useEffect(() => {
    if (noteDown) {
      console.log(playTime);
      console.log(velocity)
      sampler.triggerAttack(noteDown, playTime-0.7,velocity,);
    }
  }, [sampler,noteDown, playTime, velocity]);

  //polifonia da rivedere sostituire il trigger playtime con un contatore e velocity


    return (
       null
    );
  };
  
export default SamplerEngine;


