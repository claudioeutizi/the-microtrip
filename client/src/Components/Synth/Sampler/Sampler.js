
import React, { useEffect, useCallback, useState } from 'react'
import instruments from '../../../audio/Instruments';
import Knob from './Controls/Knob'
import * as Tone from 'tone'
import Noise from './Noise';
import Adsr from './Adsr';
import { dbToGain, gainToDb } from 'tone';

const envelopeArray = [];
const samplerArray = [];
const noiseArray = [];
const samplerNode = new Tone.Gain();
let noise, pitchShifter, pitchShifterKnob;

const Sampler = ({ setSampler, setPitchShifter, setFineTune, selectedInst, polyphony }) => {

    const polyArray = Array(polyphony).fill(0);
    let polyNumberPlay;
    let prevIndex;
    let toBeCleared;
    let polyNumberStop = [];

    const [instrument, setInstrument] = useState(selectedInst);
    const [samplerGain, setSamplerGain] = useState(Tone.dbToGain(0));

    const [envelopeAttack, setEnvelopeAttack] = useState(0);
    const [envelopeDecay, setEnvelopeDecay] = useState(0);
    const [envelopeSustain, setEnvelopeSustain] = useState(1);
    const [envelopeRelease, setEnvelopeRelease] = useState(0);

    const [pitch, setPitch] = useState(0);
    const [pitchKnob, setPitchKnob] = useState(0);

    const [noiseGain, setNoiseGain] = useState(Tone.dbToGain(-60));
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
                releaseCurve: "linear"
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

    function createNoise(noiseGain, fadeIn, fadeOut, noiseType) {
        noise = new Tone.Noise({
            volume: noiseGain,
            fadeIn: fadeIn,
            fadeOut: fadeOut,
            type: noiseType
        });
        return noise
    }


    function assignPolyphony(note, polyArray, method) {
        if (method) {

            for (let i = 0; i < polyphony; i++)
                if (polyArray[i] === 0) {
                    polyArray[i] = note;
                    return i;
                }
        }
        else {
            let stopIndex = polyArray.indexOf(note)
            // prevIndex=stopIndex;
            return stopIndex;
        }

    }

    //PITCH SHIFTER
    useState(() => {
        pitchShifter = new Tone.PitchShift({
            pitch: pitch,
            windowSize: 0.05
        });
        pitchShifterKnob = new Tone.PitchShift({
            pitch: pitchKnob,
            windowSize: 0.1
        });

    }, [])



    //------------------------------------------//


    //SAMPLER GENERATION
    useEffect(() => {

        for (let i = 0; i < polyphony; i++) {
            samplerArray[i] = createSampler(instrument);
            noiseArray[i] = createNoise(noiseGain, fadeIn, fadeOut, noiseType);
        }

        for (let i = 0; i < polyphony; i++) {
            envelopeArray[i] = createEnvelope(envelopeAttack, envelopeDecay, envelopeSustain, envelopeRelease)
            samplerArray[i].chain(envelopeArray[i], samplerNode)
            noiseArray[i].disconnect();
            noiseArray[i].chain(envelopeArray[i], samplerNode)
        }


        return () => {
            for (let i = 0; i < polyphony; i++) {
                samplerArray[i] = null;
                noiseArray[i] = null;
            }
        }

    }, [instrument]);


    useEffect(() => {
        if (samplerNode) {
            setSampler(samplerNode);
            setPitchShifter(pitchShifter);
            setFineTune(pitchShifterKnob);
        }

        return () => {
            samplerNode.dispose();
        }
    }, [setSampler])


    //---------------------PARAMETERS UPDATE-------------------------//
    useEffect(() => {
        samplerArray.map(sampler => sampler.volume.value = Tone.gainToDb(samplerGain));
    }, [samplerGain])

    useEffect(() => {
        if (envelopeArray[polyphony - 1]) {
            for (let i = 0; i < polyphony; i++) {
                envelopeArray[i].attack = envelopeAttack;
                envelopeArray[i].decay = envelopeDecay;
                envelopeArray[i].sustain = envelopeSustain;
                envelopeArray[i].release = envelopeRelease;
            }
        }
    }, [envelopeAttack, envelopeDecay, envelopeSustain, envelopeRelease])


    useEffect(() => {
        if (noiseArray) {
            for (let i = 0; i < polyphony; i++) {
                console.log("noise gain", noiseGain)
                noiseArray[i].set({
                    volume: gainToDb(noiseGain)
                });
            }
        }

    }, [noiseGain, instrument])


    useEffect(() => {
        if (noiseArray) {
            for (let i = 0; i < polyphony; i++) {
                noiseArray[i].set({
                    fadeIn: fadeIn,
                    fadeOut: fadeOut
                });
            }
        }
    }, [fadeIn, fadeOut])

    useEffect(() => {
        if (noiseArray) {
            for (let i = 0; i < polyphony; i++) {
                noiseArray[i].set({
                    type: noiseType
                });
            }
        }
    }, [noiseType])

    useEffect(() => {
        if (pitchShifter) {
            pitchShifter.set({
                pitch: pitch
            });
        }
    }, [pitch])

    useEffect(() => {
        if (pitchShifterKnob) {
            console.log("pitch change", pitchKnob)
            pitchShifterKnob.set({
                pitch: pitchKnob
            });
        }
    }, [pitchKnob])


    const mapValuesExp = (value, prevMin, postMin, prevMax, postMax) => {
        return Math.pow(10, Math.log10(postMin) + (value - prevMin) * (Math.log10(postMax) - Math.log10(postMin)) / (prevMax - prevMin));
    }

    useEffect(() => {
        const handleOnRainWind = (event) => {
            
            if(noiseArray){
                const weatherData = event.detail.data;
                console.log("mapping wind:", weatherData.wind.speed, "with gain", mapValuesExp(weatherData.wind.speed, 0, 0.01, 10, 1 ))
                setNoiseType("brown");
                setNoiseGain(mapValuesExp(weatherData.wind.speed, 0, 0.05, 10, 1));

                if(weatherData.rain)
                {
                    console.log("mapping rain", weatherData.rain["1h"], "with gain", mapValuesExp(weatherData.wind.speed, 0, 0.001, 15, 1 ))
                    setNoiseType("white");
                    setNoiseGain(mapValuesExp(weatherData.rain["1h"], 0, 0.001, 15, 1));
                }
            }

            }

        document.addEventListener("onexternaldata", handleOnRainWind);
        return () => {
            document.removeEventListener("onexternaldata", handleOnRainWind);
        }
    });

    //-----------------------HANDLERS-----------------------------//
    const handleNoteUp = useCallback((event) => {
        if (samplerArray) {
            console.log("note up: " + event.detail.note);
            polyNumberStop.push(assignPolyphony(event.detail.note, polyArray, 0));
            console.log("polynumber array", polyNumberStop)
            let last = polyNumberStop[polyNumberStop.length - 1];
            envelopeArray[last].triggerRelease(Tone.now());
            // toBeCleared=polyNumberStop
            setTimeout(() => {
                let first = polyNumberStop[0]
                samplerArray[first].triggerRelease(event.detail.note, Tone.now());
                noiseArray[first].stop(Tone.now())
                console.log("clearing array:", polyNumberStop[0], "which contains the note", polyArray[polyNumberStop[0]]);
                polyArray[first] = 0
                polyNumberStop.shift();
            }, envelopeArray[0].release * 950)


        }
    }, [samplerArray]);


    const handleNoteDown = useCallback((event) => {
        if (samplerArray) {
            console.log("note down: " + event.detail.note);
            if (Tone.now() > 0.8) {
                polyNumberPlay = assignPolyphony(event.detail.note, polyArray, 1);
                console.log("polyarray",polyArray);
                console.log("sampler to play", polyNumberPlay);
                samplerArray[polyNumberPlay].triggerAttack(event.detail.note, Tone.now() - 0.8, event.detail.velocity);
                noiseArray[polyNumberPlay].start(Tone.now() - 0.8)
                envelopeArray[polyNumberPlay].triggerAttack(Tone.now() - 0.1);
                console.log(polyArray);
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
                    <select label="Instrument" value={instrument} onChange={handleInstrumentSelection}>
                        {instruments.map((instrument) => {
                            return <option key={instrument.id} value={instrument.id}>{instrument.name}</option>
                        })}
                    </select>
                </div>

                <div id="sampler-knobs-row">
                    <Knob
                        min={dbToGain(-30)}
                        max={dbToGain(3)}
                        setValue={setSamplerGain}
                        id={"sampler-gain"}
                        value={samplerGain}
                        diameter={64}
                        log={1}
                        step={0.001}
                        unit="dB"
                        conv="(20*Math.log10(x)).toFixed(2)"
                        defaultValue={Tone.dbToGain(0)}
                        parameter={"Gain"}>
                    </Knob>
                    <Knob diameter={64} id={"sampler-finetune"}
                        value={pitchKnob}
                        defaultValue={0}
                        min={-12}
                        max={12}
                        step={1}
                        setValue={setPitchKnob}
                        parameter={"Fine Tune"}></Knob>
                </div>
            </div>
            <Adsr
                setAttack={setEnvelopeAttack}
                setDecay={setEnvelopeDecay}
                setSustain={setEnvelopeSustain}
                setRelease={setEnvelopeRelease}>
            </Adsr>
            <Noise
                gain = {noiseGain}
                type = {noiseType}
                setNoiseGain={setNoiseGain}
                setFadeOut={setFadeOut}
                setFadeIn={setFadeIn}
                setNoiseType={setNoiseType}>
            </Noise>
        </div>
    )
}

export default Sampler

