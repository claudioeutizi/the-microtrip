import { useState, useEffect, useCallback } from "react";
import * as Tone from 'tone';
import instruments from './Instruments';
import { Envelope } from "tone";

const SamplerEngine = ({ selectedInst }) => {
  const [sampler, setSampler] = useState(null);
  // const [noteUp, setNoteUp] = useState(null);
  // const [noteDown, setNoteDown] = useState(null);
  // const [velocity, setVelocity] = useState(null);
  // const [playTime, setPlay] = useState(0);
  // const [stopTime, setStop] = useState(0);

  useEffect(() => {
    console.log("instrument changes")
    const envelope = new Envelope(
      {
        attack: 1,
        decay: 0.1,
        sustain: 1,
        release: 1
      });

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
    }).toDestination()

    setSampler(sampler);

    return () => {
      setSampler(null);
    }

  }, [selectedInst]);


  const handleNoteUp = useCallback((event) => {
    if (sampler) {
      console.log("note up: " + event.detail.note);
      sampler.triggerRelease(event.detail.note, Tone.now() - 0.8);
    }
  }, [sampler]);


  const handleNoteDown = useCallback((event) => {
    if (sampler) {
      console.log("note down: " + event.detail.note);
      if (Tone.now() > 0.8) {
        sampler.triggerAttack(event.detail.note, Tone.now() - 0.8, event.detail.velocity);
      }
    }
  }, [sampler]);

  useEffect(() => {
    console.log("events")
    /* MESSAGES FROM PIANO KEYBOARD IN ORDER TO PRODUCE SOUND */
    document.addEventListener("notedown", handleNoteDown);
    document.addEventListener("noteup", handleNoteUp);

    return () => {
      document.removeEventListener('notedown', handleNoteDown);
      document.removeEventListener('noteup', handleNoteUp);
    }
  }, [handleNoteDown, handleNoteUp]);

  // const handleNoteUp = () => {
  //   if (noteUp) {
  //     sampler.triggerRelease(noteUp, stopTime - 0.8);
  //     // envelope.triggerRelease();
  //   }

  // }
  // const handleNoteDown = () => {
  //   if (noteDown) {
  //     // console.log("Playtime", playTime);
  //     console.log("inside note down")
  //     sampler.triggerAttack(noteDown, playTime - 0.8, velocity);
  //     // envelope.triggerAttack();
  //   }
  // }

  // if (sampler) {
  //   console.log("connettiti cazzo")
  //   sampler.chain(envelope, Tone.Destination);
  // }


  // useEffect(() => {
  //   if (noteUp) {
  //     // console.log("Stop time", stopTime)

  //     sampler.triggerRelease(noteUp, stopTime - 0.8);
  //     envelope.triggerRelease();
  //   }
  // }, [noteUp, stopTime]);

  // useEffect(() => {
  //   if (noteDown) {
  //     // console.log("Playtime", playTime);

  //     console.log("inside note down")
  //     sampler.triggerAttack(noteDown, playTime - 0.8, velocity);
  //     envelope.triggerAttack();
  //   }
  // }, [noteDown, playTime, velocity]);
  // 

  return (
    null
  );

};

export default SamplerEngine;

  //polifonia da rivedere sostituire il trigger playtime con un contatore e velocity