import React from 'react'
import { useState, useEffect, useCallback, useMemo } from "react"
import OnOffSwitch from './Controls/OnOffSwitch'
import Knob from './Controls/Knob'
import * as Tone from 'tone'

const Filter = ({ LFO_H_ON, depthH, rateH, typeH, typeL, setFilterH, setFilterL, rolloff }) => {
    const [highCut, setCutoffLPF] = useState(20000);
    const [resonanceL, setResonanceLPF] = useState(0);
    const [lowCut, setCutoffHPF] = useState(20);
    const [resonanceH, setResonanceHPF] = useState(0);
    const [LP_ON, setLP_ON] = useState(false);
    const [HP_ON, setHP_ON] = useState(false);
    const [filterNodeH, setFilterNodeH] = useState(null);
    const [filterNodeL, setFilterNodeL] = useState(null);

    const [LFO_L_ON, setLFO_L_ON] = useState(false);
    const [lfoL, setlfoL]=useState(null)
    // const [scaleExpL, setScaleExpL]=useState(null)
    const [rateL, setRateL]=useState(5)
    const [depthL, setDepthL]=useState(1)
    
    let LPF, HPF, lfoH, minFreq_LFO_H, maxFreq_LFO_H, scaleExpH, scaleExpL;

    useEffect(() => {
        if (HP_ON) {
            console.log("HP generation")
            setFilterNodeH(new Tone.Filter({
                rolloff: rolloff,
                type: "highpass",
                Q: resonanceH,
                frequency: lowCut,
            }
            ));

            // if (LFO_H_ON) {
            //     minFreq_LFO_H = Math.pow(10, Math.log10(lowCut) - 1 * depthH);
            //     maxFreq_LFO_H = Math.pow(10, Math.log10(lowCut) + 1 * depthH);

            //     console.log("depth range HPF", minFreq_LFO_H, maxFreq_LFO_H)
            //     lfoH = new Tone.LFO(rateH, 0, 1);
            //     scaleExpH = new Tone.ScaleExp(minFreq_LFO_H, maxFreq_LFO_H, 3);
            //     lfoH.type = typeH;
            //     lfoH.chain(scaleExpH, HPF.frequency);
            //     lfoH.start();
            // }
            // else if (lfoH) {
            //     lfoH.disconnect(HPF.frequency);
            // }
            setFilterH(filterNodeH);
        }
        else {

            setFilterH(null)
        }
    }, [HP_ON])

    useEffect(() => {
        if (LP_ON) {
            console.log("LP generation")
            setFilterNodeL(new Tone.Filter({
                rolloff: rolloff,
                type: "lowpass",
                Q: resonanceL,
                frequency: highCut,
            }
            ));
            setFilterL(filterNodeL);
        }
        else {
            setFilterL(null)
        }
    }, [LP_ON])



    useEffect(() => {
        if (LFO_L_ON&&filterNodeL) {
            console.log("LFO L creation", rateL)
            setlfoL(new Tone.LFO(rateL, 0, 1));
            
            // lfolp.type = typeL;
            
            
            
            // setFilterL(filterNodeL)
        }
    
        else if (lfoL) {
            lfoL.disconnect(filterNodeL.frequency);
        }
    
    }, [LFO_L_ON])

    //PARAMS UPDATE
    useEffect(() => {
        if (filterNodeL && LP_ON) {
            filterNodeL.set({
                frequency: highCut
            });
            setFilterL(filterNodeL);
        }
    }, [highCut])

    useEffect(() => {
        if (filterNodeL && LP_ON) {
            filterNodeL.set({
                Q: resonanceL
            });
            setFilterL(filterNodeL);
        }
    }, [resonanceL])

    useEffect(() => {
        if (filterNodeH && HP_ON) {
            filterNodeH.set({
                frequency: lowCut
            });
            setFilterH(filterNodeH);
        }
    }, [lowCut])

    useEffect(() => {
        if (filterNodeH && HP_ON) {
            filterNodeH.set({
                Q: resonanceH
            });
            setFilterH(filterNodeH);
        }
    }, [resonanceH])


    useEffect(() => {
        
        if(lfoL && LFO_L_ON){
            lfoL.disconnect(scaleExpL);
            console.log("rate update", rateL)
            // scaleExpL=new Tone.ScaleExp(Math.pow(10, Math.log10(highCut) - 1 * depthL),Math.pow(10, Math.log10(highCut) + 1 * depthL), 3)
            lfoL.rate=rateL;
            scaleExpL=new Tone.ScaleExp(Math.pow(10, Math.log10(highCut) - 1 * depthL), Math.pow(10, Math.log10(highCut) + 1 * depthL));
            lfoL.chain(scaleExpL, filterNodeL.frequency);
            lfoL.start();
            // lfoL.chain(scaleExpL, filterNodeL.frequency);
        }

    }, [rateL, depthL])
    //GENERATION
    // useEffect(() => {
    //     if (filterNodeH) {
    //         setFilterH(filterNodeH);
    //     }
    //     if (filterNodeL) {
    //         setFilterL(filterNodeL);
    //     }

    //     return () => {
    //         if (filterNodeH) {
    //             filterNodeH.dispose();
    //         }
    //         if (filterNodeL) {
    //             filterNodeL.dispose();
    //         }

    //     }
    // }, [filterNodeH, filterNodeL, setFilterH, setFilterL])


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
                setState={setLP_ON}>

            </OnOffSwitch>

            <OnOffSwitch
                style={{
                    gridRow: 3,
                    gridColumn: 2,
                }} id="hpf-on-off"
                setState={setHP_ON}>
            </OnOffSwitch>

            <Knob id="filter-lpf-cutoff"
                style={{
                    "gridRow": 4,
                    "gridColumn": 1,
                }}
                min={20} max={20000}
                setValue={setCutoffLPF}
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
                setValue={setCutoffHPF}
                log={1}
                step={10}
                defaultValue={20}
                diameter={64} parameter="Cutoff" unit="Hz"></Knob>

            <Knob id="filter-lpf-resonance" style={{
                "gridRow": 5,
                "gridColumn": 1,
            }}
                min={0} max={10}
                setValue={setResonanceLPF}
                step={0.1}
                defaultValue={0}
                diameter={48} parameter="Resonance"></Knob>


            <Knob id="filter-hpf-resonance" style={{
                "gridRow": 5,
                "gridColumn": 2,
            }}
                min={0} max={10}
                setValue={setResonanceHPF}
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
                setState={setLFO_L_ON}>
            </OnOffSwitch>

            <OnOffSwitch
                style={{
                    gridRow: 7,
                    gridColumn: 2,
                }} id="lfo-hpf-on-off">
            </OnOffSwitch>

            <div className="screen-container lfo">
                <select label="Waveform">
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
                setValue={setRateL}
                step={0.5}
                defaultValue={0}>
                </Knob>

            <Knob
                style={{
                    gridRow: 9,
                    gridColumn: 2
                }}

                diameter={48} id={"lfo-hpf-rate"} unit="Hz" parameter={"Rate"}></Knob>

            <Knob
                style={{
                    gridRow: 10,
                    gridColumn: 1
                }}
                min={0} max={1}
                setValue={setDepthL}
                step={0.05}
                defaultValue={0}
                diameter={48} id={"lfo-lpf-depth"} parameter={"Depth"}></Knob>

            <Knob
                style={{
                    gridRow: 10,
                    gridColumn: 2
                }}
                diameter={48} id={"lfo-hpf-depth"} parameter={"Depth"}></Knob>
        </div>
    )
}

export default Filter