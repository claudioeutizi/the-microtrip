import React from 'react'
import { useState, useEffect } from "react"
import OnOffSwitch from './Controls/OnOffSwitch'
import Knob from './Controls/Knob'
import * as Tone from 'tone'

let lpfLfoScale, hpfLfoScale;

const Filter = ({ setFilterH, setFilterL, rolloff }) => {



    /* LPF */
    const [lpfOnOff, setLpfOnOff] = useState(false);
    const [lpfCutoff, setLpfCutoff] = useState(20000);
    const [lpfResonance, setLpfResonance] = useState(0);
    const [lpfNode, setLpfNode] = useState(null);

    /* HPF */

    const [hpfOnOff, setHpfOnOff] = useState(false);
    const [hpfCutoff, setHpfCutoff] = useState(20);
    const [hpfResonance, setHpfResonance] = useState(0);
    const [hpfNode, setHpfNode] = useState(null);


    /* LFO LPF */

    const [lpfLfo, setLpfLfo] = useState(null);
    const [lpfLfoOnOff, setLpfLfoOnOff] = useState(false);
    const [lpfLfoRate, setLpfLfoRate] = useState(0);
    const [lpfLfoDepth, setLpfLfoDepth] = useState(0);


    /* LFO HPF */

    const [hpfLfo, setHpfLfo] = useState(null)
    const [hpfLfoOnOff, setHpfLfoOnOff] = useState(false);
    const [hpfLfoRate, setHpfLfoRate] = useState(0);
    const [hpfLfoDepth, setHpfLfoDepth] = useState(0);



    /* HPF Generation */

    useEffect(() => {
        if (hpfOnOff) {
            console.log("HP generation")
            setHpfNode(new Tone.Filter({
                rolloff: rolloff,
                type: "highpass",
                Q: hpfResonance,
                frequency: hpfCutoff,
            }
            ));
            setFilterH(hpfNode);
        }
        else {

            setFilterH(null)
        }
    }, [hpfOnOff])

    /* LPF Generation */

    useEffect(() => {
        if (lpfOnOff) {
            console.log("LP generation")
            setLpfNode(new Tone.Filter({
                rolloff: rolloff,
                type: "lowpass",
                Q: lpfResonance,
                frequency: lpfCutoff,
            }
            ));
            setFilterL(lpfNode);
        }
        else {
            setFilterL(null)
        }
    }, [lpfOnOff])


    /* LFO generation */
    useState(() => {
        console.log("LFO creation")
        setLpfLfo(new Tone.LFO(lpfLfoRate, 0, 1));
        setHpfLfo(new Tone.LFO(hpfLfoRate, 0, 1));
        lpfLfoScale = new Tone.ScaleExp(Math.pow(10, Math.log10(lpfCutoff) - 1 * lpfLfoDepth), Math.pow(10, Math.log10(lpfCutoff) + 1 * lpfLfoDepth), 3);
        hpfLfoScale = new Tone.ScaleExp(Math.pow(10, Math.log10(hpfCutoff) - 1 * hpfLfoDepth), Math.pow(10, Math.log10(hpfCutoff) + 1 * hpfLfoDepth), 3);

    }, [])

    /* =================================================== PARAMS UPDATE ============================================== */

    //lpf cutoff
    useEffect(() => {
        if (lpfNode && lpfOnOff) {

            lpfNode.set({
                frequency: lpfCutoff
            });
            setFilterL(lpfNode);
        }
    }, [lpfCutoff])

    //lpf resonance
    useEffect(() => {
        if (lpfNode && lpfOnOff) {
            lpfNode.set({
                Q: lpfResonance
            });
            setFilterL(lpfNode);
        }
    }, [lpfResonance])

    //hpf cutoff
    useEffect(() => {
        if (hpfNode && hpfOnOff) {
            hpfNode.set({
                frequency: hpfCutoff
            });
            setFilterH(hpfNode);
        }
    }, [hpfCutoff])

    //hpf resonance
    useEffect(() => {
        if (hpfNode && hpfOnOff) {
            hpfNode.set({
                Q: hpfResonance
            });
            setFilterH(hpfNode);
        }
    }, [hpfResonance])

    //LFO LPF onoff
    useEffect(() => {
        if (lpfLfoOnOff && lpfLfo && lpfLfoScale) {
            lpfLfo.disconnect();
            lpfLfo.chain(lpfLfoScale, lpfNode.frequency);
            lpfLfo.start();
        }
        else if (!lpfLfoOnOff) {
            lpfLfo.stop();
        }
    }, [lpfLfoOnOff])

    //LFO HPF onoff
    useEffect(() => {
        if (hpfLfoOnOff && hpfLfo && hpfLfoScale) {
            hpfLfo.disconnect();
            hpfLfo.chain(hpfLfoScale, hpfNode.frequency);

            hpfLfo.start();
        }
        else if (!hpfLfoOnOff) {
            hpfLfo.stop();
        }
    }, [hpfLfoOnOff])

    //LFO LPF RATE
    useEffect(() => {

        if (lpfLfo) {
            console.log("rate", lpfLfoRate)

            lpfLfo.set({
                frequency: lpfLfoRate
            })
        }
    }, [lpfLfoRate])

    //LFO HPF RATE
    useEffect(() => {

        if (hpfLfo) {
            console.log("rate", hpfLfoRate)

            hpfLfo.set({
                frequency: hpfLfoRate
            })
        }
    }, [hpfLfoRate])

    useEffect(() => {
        if (lpfLfo && lpfLfoOnOff && lpfNode) {
            lpfLfoScale.disconnect();
            console.log("lfo range LPF", Math.pow(10, Math.log10(lpfCutoff) - 1 * lpfLfoDepth), Math.pow(10, Math.log10(lpfCutoff) + 1 * lpfLfoDepth))
            lpfLfoScale = new Tone.ScaleExp(Math.pow(10, Math.log10(lpfCutoff) - 1 * lpfLfoDepth), Math.pow(10, Math.log10(lpfCutoff) + 1 * lpfLfoDepth), 3);
            lpfLfo.chain(lpfLfoScale, lpfNode.frequency);
        }
    }, [lpfLfoDepth, lpfCutoff])

    useEffect(() => {
        if (hpfLfo && hpfLfoOnOff && hpfNode) {
            hpfLfoScale.disconnect();
            console.log("lfo range HPF", Math.pow(10, Math.log10(hpfCutoff) - 1 * hpfLfoDepth), Math.pow(10, Math.log10(hpfCutoff) + 1 * hpfLfoDepth))
            hpfLfoScale = new Tone.ScaleExp(Math.pow(10, Math.log10(hpfCutoff) - 1 * hpfLfoDepth), Math.pow(10, Math.log10(hpfCutoff) + 1 * hpfLfoDepth), 3);
            hpfLfo.chain(hpfLfoScale, hpfNode.frequency);
        }
    }, [hpfLfoDepth, hpfCutoff])



    const waveforms = [
        {
            id: 0,
            label: "sine"
        },
        {
            id: 1,
            label: "square"
        },
        {
            id: 2,
            label: "triangle"
        },
        {
            id: 3,
            label: "sawtooth"
        },

    ]

    return (
        <div id="filter-container">
            {/* Title */}
            <p className="type" style={{
                gridRow: 1,
                gridColumnStart: 1,
                gridColumnEnd: "span 2",
            }}>FILTER</p>

            {/* Types */}

            <p className="type" style={{
                margin: "0px",
                gridRow: 2,
                gridColumn: 1,
            }}>LPF</p>

            <p className="type" style={{
                margin: "0px",
                gridRow: 2,
                gridColumn: 2,
            }}>HPF</p>

            <OnOffSwitch id="lpf-on-off"
                style={{
                    gridRow: 3,
                    gridColumn: 1,
                }}
                setState={setLpfOnOff}>

            </OnOffSwitch>

            <OnOffSwitch
                style={{
                    gridRow: 3,
                    gridColumn: 2,
                }} id="hpf-on-off"
                setState={setHpfOnOff}>
            </OnOffSwitch>

            <Knob id="filter-lpf-cutoff"
                style={{
                    "gridRow": 4,
                    "gridColumn": 1,
                }}
                min={20} max={20000}
                setValue={setLpfCutoff}
                log={1}
                step={10}
                defaultValue={20000}
                diameter={64} parameter="Cutoff" unit="Hz"></Knob>

            <Knob id="filter-hpf-cutoff"
                style={{
                    "gridRow": 4,
                    "gridColumn": 2,
                }}
                min={20} max={20000}
                setValue={setHpfCutoff}
                log={1}
                step={10}
                defaultValue={20}
                diameter={64} parameter="Cutoff" unit="Hz"></Knob>

            <Knob id="filter-lpf-resonance" style={{
                "gridRow": 5,
                "gridColumn": 1,
            }}
                min={0} max={10}
                setValue={setLpfResonance}
                step={0.1}
                defaultValue={0}
                diameter={48} parameter="Resonance"></Knob>


            <Knob id="filter-hpf-resonance" style={{
                "gridRow": 5,
                "gridColumn": 2,
            }}
                min={0} max={10}
                setValue={setHpfResonance}
                step={0.1}
                defaultValue={0}
                diameter={48} parameter="resonance"></Knob>

            {/* LFO title */}
            <p className="type" style={{
                "gridColumnStart": 1,
                "gridColumnEnd": "span 2",
                "gridRow": 6,
                margin: "0px",
            }}>LFO</p>

            <OnOffSwitch
                style={{
                    gridRow: 7,
                    gridColumn: 2,
                }} id="lfo-lpf-on-off"
                setState={setLpfLfoOnOff}>
            </OnOffSwitch>

            <OnOffSwitch
                style={{
                    gridRow: 7,
                    gridColumn: 2,
                }} id="lfo-hpf-on-off"
                    setState={setHpfLfoOnOff}>
            </OnOffSwitch>

            <div className="screen-container lfo">
                <select id="lpf-lfo-selector" label="Waveform">
                    {waveforms.map((waveform) => {
                        return <option value={waveform.value}>{waveform.label}</option>
                    })}
                </select>

                <select id="hpf-lfo-selector" label="Waveform">
                    {waveforms.map((waveform) => {
                        return <option value={waveform.value}>{waveform.label}</option>
                    })}
                </select>
            </div>

            <Knob
                style={{
                    gridRow: 9,
                    gridColumn: 1
                }}
                diameter={48} id={"lfo-lpf-rate"} unit="Hz" parameter={"Rate"}
                min={0} max={15}
                setValue={setLpfLfoRate}
                step={0.5}
                defaultValue={0}>
            </Knob>

            <Knob
                style={{
                    gridRow: 9,
                    gridColumn: 2
                }}
                diameter={48} id={"lfo-hpf-rate"} unit="Hz" parameter={"Rate"}
                min={0} max={15}
                setValue={setHpfLfoRate}
                step={0.5}
                defaultValue={0}></Knob>

            <Knob
                style={{
                    gridRow: 10,
                    gridColumn: 1
                }}
                min={0} max={1}
                setValue={setLpfLfoDepth}
                step={0.05}
                defaultValue={0}
                diameter={48} id={"lfo-lpf-depth"} parameter={"Depth"}></Knob>

            <Knob
                style={{
                    gridRow: 10,
                    gridColumn: 2
                }}
                diameter={48} id={"lfo-hpf-depth"} parameter={"Depth"}
                min={0} max={1}
                setValue={setHpfLfoDepth}
                step={0.05}
                defaultValue={0}></Knob>
        </div>
    )
}

export default Filter