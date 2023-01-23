import { useState, useEffect, useCallback, useMemo } from "react";
import * as Tone from 'tone';
import instruments from './Instruments';


console.log("outside")
const envelopeArray = [];
const samplerArray = [];
const samplerNode = new Tone.Gain();

const SamplerEngine = ({ samplerGain, setSampler, selectedInst, polyphony, attack, decay, sustain, release, type, fadeIn, fadeOut, gain, NOISE_ON }) => {

  const polyArray = Array(polyphony).fill(0);
  let stopIndex;
  let polyNumberPlay;
  let polyNumberStop;
  let noise;
  //---------------GENERATORS----------------//
  function createEnvelope(A, D, S, R) {

    const envelope = new Tone.AmplitudeEnvelope(
      {
        attack: A,
        decay: D,
        sustain: S,
        release: R
      });
    return envelope;
  }


  function createSampler(selectedInst) {
    const sampler = new Tone.Sampler({
      'A2': instruments[selectedInst].samples.A2,
      "C3": instruments[selectedInst].samples.C3,
      "D#3": instruments[selectedInst].samples.Ds3,
      "F#3": instruments[selectedInst].samples.Fs3,
      "A3": instruments[selectedInst].samples.A3,
      "C4": instruments[selectedInst].samples.C4,
      "D#4": instruments[selectedInst].samples.Ds4,
      "F#4": instruments[selectedInst].samples.Fs4,
      "A4": instruments[selectedInst].samples.A4,
      "C5": instruments[selectedInst].samples.C5,
      "D#5": instruments[selectedInst].samples.Ds5,
      "F#5": instruments[selectedInst].samples.Fs5,
      "A5": instruments[selectedInst].samples.A5,
      "C6": instruments[selectedInst].samples.C6,
      "D#6": instruments[selectedInst].samples.Ds6,
      "F#6": instruments[selectedInst].samples.Fs6,
      "A6": instruments[selectedInst].samples.A6,
    });
    return sampler;
  }


  //correggere interazione con la release, non viene considerata e viene liberato uno slot per una nota che sta ancora suonando
  function assignPolyphony(note, polyArray, method) {
    if (method) {
      for (let i = 0; i < polyphony; i++)
        if (polyArray[i] === 0) {
          polyArray[i] = note;
          return i;
        }

    }
    else {
      stopIndex = polyArray.indexOf(note)
      polyArray[stopIndex] = 0;
      return stopIndex
    }

  }

  //NOISE
  if (NOISE_ON) {
    console.log("Noise ON")
    noise = new Tone.Noise({
      fadeIn: fadeIn,
      fadeOut: fadeOut,
      type: type
    })
    noise.volume.value=gain;
    noise.connect(samplerNode)
  }
  else if (noise) {
    noise.dispose();
  }
  //------------------------------------------//
  useEffect(() => {

    for (let i = 0; i < polyphony; i++) {
      samplerArray[i] = createSampler(selectedInst);
      samplerArray[i].volume.value=samplerGain;
    }

    return () => {
      for (let i = 0; i < polyphony; i++) {
        samplerArray[i] = null;
      }
    }

  }, [selectedInst]);



  //Connections and generation
  if (samplerArray[polyphony - 1]) {
    for (let i = 0; i < polyphony; i++) {
      envelopeArray[i] = createEnvelope(attack, decay, sustain, release)
      samplerArray[i].chain(envelopeArray[i], samplerNode)
    }

  }

  useEffect(() => {
    for (let i = 0; i < polyphony; i++) {
      samplerArray[i].volume.value=samplerGain;
    }
    if (samplerNode) {
      setSampler(samplerNode);
    }

    return () => {
      samplerNode.dispose();
    }
  }, [setSampler])

  //-----------HANDLERS--------------//
  const handleNoteUp = useCallback((event) => {
    if (samplerArray) {
      console.log("note up: " + event.detail.note);
      polyNumberStop = assignPolyphony(event.detail.note, polyArray, 0);
      console.log("sampler to stop", polyNumberStop);
      // envelopeArray[polyNumberStop].triggerRelease();
      samplerArray[polyNumberStop].triggerRelease(event.detail.note, Tone.now() - 0.8, 1, 0, envelopeArray[polyNumberStop].triggerRelease(Tone.now() - 0.1));
      if(NOISE_ON){
        noise.stop(Tone.now() - 0.8)
      }
    }
  }, [samplerArray]);


  const handleNoteDown = useCallback((event) => {
    if (samplerArray) {
      console.log("note down: " + event.detail.note);
      if (Tone.now() > 0.8) {
        polyNumberPlay = assignPolyphony(event.detail.note, polyArray, 1);
        console.log("sampler to play", polyNumberPlay);
        samplerArray[polyNumberPlay].triggerAttack(event.detail.note, Tone.now() - 0.8, event.detail.velocity, 0, envelopeArray[polyNumberPlay].triggerAttack(Tone.now() - 0.1));
        if(NOISE_ON){
          noise.start(Tone.now() - 0.8)
        }
      }
    }
  }, [samplerArray]);


  //LISTENERS
  useEffect(() => {
    document.addEventListener("notedown", handleNoteDown);
    document.addEventListener("noteup", handleNoteUp);

    return () => {
      document.removeEventListener('notedown', handleNoteDown);
      document.removeEventListener('noteup', handleNoteUp);
    }
  }, [handleNoteDown, handleNoteUp]);


  return (
    null
  );

};

export default SamplerEngine;

