
import React, { useEffect, useCallback, useState } from 'react'
import instruments from '../../../audio/Instruments';
import Knob from './Controls/Knob'
import * as Tone from 'tone'
import Noise from './Noise';
import Adsr from './Adsr';
import { dbToGain } from 'tone';

const envelopeArray = [];
const samplerArray = [];
const samplerNode = new Tone.Gain();
let noise;

const Sampler = ({ setSampler, selectedInst, polyphony }) => {

    const polyArray = Array(polyphony).fill(0);
    let stopIndex;
    let polyNumberPlay;
    let polyNumberStop;

    const [instrument, setInstrument] = useState(selectedInst);

    const [samplerGain, setSamplerGain] = useState(1);
    const [envelopeAttack, setEnvelopeAttack] = useState(0);
    const [envelopeDecay, setEnvelopeDecay] = useState(0);
    const [envelopeSustain, setEnvelopeSustain] = useState(1);
    const [envelopeRelease, setEnvelopeRelease] = useState(0);

    // const [noise, setNoise] = useState(null)
    const [noiseGain, setNoiseGain] = useState(1);
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
            for (let i = 0; i < polyphony; i++)
                if (polyArray[i] === 0) {
                    polyArray[i] = note;
                    return i;
                }

        }
        else {
            stopIndex = polyArray.indexOf(note)
            polyArray[stopIndex] = 0;
            return stopIndex;
        }

    }

    // NOISE


    //------------------------------------------//

    //SAMPLER GENERATION
    useEffect(() => {

        noise = (new Tone.Noise({
            volume: noiseGain,
            fadeIn: fadeIn,
            fadeOut: fadeOut,
            type: noiseType
        }))

        for (let i = 0; i < polyphony; i++) {
            samplerArray[i] = createSampler(selectedInst);
        }

        console.log("envelope generation and connection")
        for (let i = 0; i < polyphony; i++) {
            envelopeArray[i] = createEnvelope(envelopeAttack, envelopeDecay, envelopeSustain, envelopeRelease)
            samplerArray[i].chain(envelopeArray[i], samplerNode)
        }
        if(noise){
            console.log("noise connected")
            noise.chain(envelopeArray[0], samplerNode)
        }


        return () => {
            for (let i = 0; i < polyphony; i++) {
                samplerArray[i] = null;
            }
            noise.dispose();
        }

    }, [selectedInst]);


    useEffect(() => {
        if (samplerNode) {
            setSampler(samplerNode);
        }

        return () => {
            samplerNode.dispose();
        }
    }, [setSampler])


    //PARAMETERS UPDATE
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
        if (noise){
            console.log(noiseGain)
            noise.set({
                volume: noiseGain
            });
        }
    }, [noiseGain])

    //-----------HANDLERS--------------//
    const handleNoteUp = useCallback((event) => {
        if (samplerArray) {
            console.log("note up: " + event.detail.note);
            polyNumberStop = assignPolyphony(event.detail.note, polyArray, 0);
            console.log("sampler to stop", polyNumberStop);
            envelopeArray[polyNumberStop].triggerRelease();
            samplerArray[polyNumberStop].triggerRelease(event.detail.note, Tone.now() - 0.8);
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
                // if(noise){
                //     noise.start(Tone.now() - 0.8)
                // }
                
                envelopeArray[polyNumberPlay].triggerAttack(Tone.now() - 0.1)
            }
        }
    }, [samplerArray]);


    /* ==================================== ENVELOPE ================================================= */

    //LISTENERS
    useEffect(() => {
        document.addEventListener("notedown", handleNoteDown);
        document.addEventListener("noteup", handleNoteUp);

        return () => {
            document.removeEventListener('notedown', handleNoteDown);
            document.removeEventListener('noteup', handleNoteUp);
        }
    }, [handleNoteDown, handleNoteUp]);


    const handleInstrumentSelection = (event) => {
        setInstrument(event.value)
    }

    return (
        <div id="sampler-group">
            <div id="sampler-container">
                <p className="type">Sampler</p>
                <div className="screen-container sampler">
                    <select label="Instrument" onChange={handleInstrumentSelection}>
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

