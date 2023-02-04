
import React, { useEffect, useCallback, useState } from 'react'
import instruments from '../../../audio/Instruments';
import Knob from './Controls/Knob'
import * as Tone from 'tone'
import Noise from './Noise';
import Adsr from './Adsr';
import { dbToGain, gainToDb } from 'tone';

const envelopeArray = [];
const samplerArray = [];
let freeVoices = [];
const busyVoices = {};
const samplerNode = new Tone.Gain();
let noise, pitchShifter;

const Sampler = ({ setSampler, setPitchShifter, selectedInst, polyphony }) => {

    const polyArray = Array(polyphony).fill(0);
    // let stopIndex;
    let polyNumberPlay;
    let polyNumberStop;

    const [instrument, setInstrument] = useState(selectedInst);

    const [samplerGain, setSamplerGain] = useState(1);
    const [envelopeAttack, setEnvelopeAttack] = useState(0);
    const [envelopeDecay, setEnvelopeDecay] = useState(0);
    const [envelopeSustain, setEnvelopeSustain] = useState(1);
    const [envelopeRelease, setEnvelopeRelease] = useState(0);
    const [pitch, setPitch] = useState(0);

    const [noiseGain, setNoiseGain] = useState(0.001);
    const [fadeIn, setFadeIn] = useState(0);
    const [fadeOut, setFadeOut] = useState(0);
    const [noiseType, setNoiseType] = useState("white");

    //---------------GENERATORS----------------//
    function createEnvelope(attack, decay, sustain, release) {

        const envelope = new Tone.AmplitudeEnvelope(
            {
                attack: attack,
                decay: decay,
                sustain: sustain,
                release: release,
            });
        return envelope;
    }

    useEffect(() => {
        setInstrument(selectedInst);
    }, [selectedInst]);

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
            "C7": instruments[selectedInst].samples.C7,
            "D#7": instruments[selectedInst].samples.Ds7,
            "F#7": instruments[selectedInst].samples.Fs7,
            "A7": instruments[selectedInst].samples.A7,
            "C8": instruments[selectedInst].samples.C8,
        });
        return sampler;
    }


    //correggere interazione con la release, non viene considerata e viene liberato uno slot per una nota che sta ancora suonando
    function assignPolyphony(note, polyArray, method) {
        if (method) {
            console.log(polyArray)
            for (let i = 0; i < polyphony; i++)
                if (polyArray[i] === 0) {
                    polyArray[i] = note;
                    return i;
                }


        }
        else {
            let stopIndex = polyArray.indexOf(note)
            polyArray[stopIndex] = 0
            // setTimeout(() => {
            //     console.log("ciao")
                
            // }, 2000)

            return stopIndex;
        }

    }

    // NOISE
    useState(() => {
        noise = new Tone.Noise({
            volume: noiseGain,
            fadeIn: fadeIn,
            fadeOut: fadeOut,
            type: noiseType
        });
    }, [])

    //PITCH SHIFTER
    useState(() => {
        pitchShifter = new Tone.PitchShift({
            pitch:pitch,
            windowSize:0.09
        });
       
    }, [])



    //------------------------------------------//


    //SAMPLER GENERATION
    useEffect(() => {



        // freeVoices=[];
        // for (let i = 0; i < polyphony; i++) {
        //     samplerArray[i] = createSampler(instrument);
        //     envelopeArray[i] = createEnvelope(envelopeAttack, envelopeDecay, envelopeSustain, envelopeRelease)
        //     samplerArray[i].chain(envelopeArray[i], pitchShifter, samplerNode)
        //     freeVoices.push({ sampler: samplerArray[i], envelope: envelopeArray[i] })
        // }
        for (let i = 0; i < polyphony; i++) {
            samplerArray[i] = createSampler(selectedInst);
        }


        console.log("envelope generation and connection")
        for (let i = 0; i < polyphony; i++) {
            envelopeArray[i] = createEnvelope(envelopeAttack, envelopeDecay, envelopeSustain, envelopeRelease)
            samplerArray[i].chain(envelopeArray[i], samplerNode)
        }
        if (noise) {
            noise.disconnect();
            console.log("noise connected")
            noise.chain(envelopeArray[0], samplerNode)
        }


        return () => {
            for (let i = 0; i < polyphony; i++) {
                samplerArray[i] = null;
            }
            // freeVoices = null
            // for (let key in busyVoices){
            //     delete busyVoices[key]
            // }
        }

    }, [instrument]);


    useEffect(() => {
        if (samplerNode) {
            setSampler(samplerNode);
            setPitchShifter(pitchShifter);
        }

        return () => {
            samplerNode.dispose();
        }
    }, [setSampler])


    //---------------------PARAMETERS UPDATE-------------------------//
    useEffect(() => {
        samplerArray.map(sampler => sampler.volume.value = (20 * Math.log10(samplerGain)));
    }, [samplerGain])

    useEffect(() => {
        if (envelopeArray[polyphony - 1]) {
            console.log("envelope update", envelopeAttack, envelopeDecay, envelopeSustain, envelopeRelease)
            for (let i = 0; i < polyphony; i++) {
                envelopeArray[i].attack = envelopeAttack;
                envelopeArray[i].decay = envelopeDecay;
                envelopeArray[i].sustain = envelopeSustain;
                envelopeArray[i].release = envelopeRelease;
            }
        }
    }, [envelopeAttack, envelopeDecay, envelopeSustain, envelopeRelease])


    useEffect(() => {
        if (noise) {
            noise.set({
                volume: gainToDb(noiseGain)
            });
        }
    }, [noiseGain])


    useEffect(() => {
        if (noise) {
            noise.set({
                fadeIn: fadeIn,
                fadeOut: fadeOut
            });
        }
    }, [fadeIn, fadeOut])

    useEffect(() => {
        if (pitchShifter) {
            console.log("pitch change", pitch)
            pitchShifter.set({
                pitch: pitch
            });
        }
    }, [pitch])

    //-----------------------HANDLERS-----------------------------//
    const handleNoteUp = useCallback((event) => {
        if (samplerArray) {
            console.log("note up: " + event.detail.note);
            polyNumberStop = assignPolyphony(event.detail.note, polyArray, 0);
            console.log("sampler to stop", polyNumberStop);
            envelopeArray[polyNumberStop].triggerRelease(Tone.now());
            console.log("timeout", envelopeRelease)
            setTimeout(()=>{
                
                samplerArray[polyNumberStop].triggerRelease(event.detail.note, Tone.now());
            }, envelopeRelease*1000)
            
            // busyVoices[event.detail.note].envelope.triggerRelease(Tone.now());
            // setTimeout(()=>{
            //     busyVoices[event.detail.note].sampler.triggerRelease(event.detail.note, Tone.now());
            //     freeVoices.push(busyVoices[event.detail.note])
            //     console.log("free voices post ", freeVoices, busyVoices, event.detail.note)
            //     // delete busyVoices[event.detail.note]

            // }, busyVoices[event.detail.note].envelope.release*1000)
            
            noise.stop(Tone.now() - 0.8)
        }
    }, [samplerArray]);


    const handleNoteDown = useCallback((event) => {
        if (samplerArray) {
            console.log("note down: " + event.detail.note);
            if (Tone.now() > 0.8) {
                polyNumberPlay = assignPolyphony(event.detail.note, polyArray, 1);
                console.log("sampler to play", polyNumberPlay);
                samplerArray[polyNumberPlay].triggerAttack(event.detail.note, Tone.now() - 0.8, event.detail.velocity);
                envelopeArray[polyNumberPlay].triggerAttack(Tone.now() - 0.1)
                // let tempVoice = freeVoices.shift()
                // tempVoice.sampler.triggerAttack(event.detail.note, Tone.now() - 0.5, event.detail.velocity);
                // tempVoice.envelope.triggerAttack(Tone.now()-0.2)
                // busyVoices[event.detail.note] = tempVoice;
                // console.log(busyVoices)
                noise.start(Tone.now() - 0.8)

            }
        }
    }, [samplerArray]);

    const handlePitchChange = (event) => {
        setPitch(event.detail.pitch)
        }
    

    /* ==================================== ENVELOPE ================================================= */

    //LISTENERS
    useEffect(() => {
        document.addEventListener("notedown", handleNoteDown);
        document.addEventListener("noteup", handleNoteUp);
        document.addEventListener("onpitchchange", handlePitchChange)

        return () => {
            document.removeEventListener('notedown', handleNoteDown);
            document.removeEventListener('noteup', handleNoteUp);
        }
    }, [handleNoteDown, handleNoteUp]);


    const handleInstrumentSelection = (event) => {
        setInstrument(event.target.value);
    }

    return (
        <div id="sampler-group">
            <div id="sampler-container">
                <p className="type">Sampler</p>
                <div className="screen-container sampler">
                    <select label="Instrument" value = {instrument} onChange={handleInstrumentSelection}>
                        {instruments.map((instrument) => {
                            return <option key={instrument.id} value={instrument.id}>{instrument.name}</option>
                        })}
                    </select>
                </div>

                <div id="sampler-knobs-row">
                    <Knob min={dbToGain(-30)} max={dbToGain(3)} setValue={setSamplerGain}
                        id={"sampler-gain"}
                        diameter={64}
                        log={1}
                        step={0.001}
                        unit="dB"
                        conv="(20*Math.log10(x)).toFixed(2)"
                        defaultValue={1} parameter={"Gain"}>
                    </Knob>
                    <Knob diameter={64} id={"sampler-finetune"} defValue={0} parameter={"Fine Tune"}></Knob>
                </div>
            </div>
            <Adsr setAttack={setEnvelopeAttack}
                setDecay={setEnvelopeDecay}
                setSustain={setEnvelopeSustain}
                setRelease={setEnvelopeRelease}>
            </Adsr>
            <Noise
                setNoiseGain={setNoiseGain}
                setFadeOut={setFadeOut}
                setFadeIn={setFadeIn}
                setNoiseType={setNoiseType}>
            </Noise>
        </div>
    )
}

export default Sampler

