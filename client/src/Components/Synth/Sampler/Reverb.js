import React from 'react'
import Knob from './Controls/Knob'
import OnOffSwitch from './Controls/OnOffSwitch'
import { useState, useEffect, useCallback, useMemo } from "react";
import * as Tone from 'tone';

const Reverb = ({setReverb}) => {
    
    const [reverbNode, setReverbNode] = useState(null);
    const [REVERB_ON, setREVERB_ON] = useState(false);
    const [reverbWet, setReverbWet] = useState(1);
    const [reverbDecay, setReverbDecay] = useState(0);
    const [preDelay, setPreDelay] = useState(0);
   
    useEffect(() => {
        if(REVERB_ON){
            console.log("Reverb ON")
            setReverbNode(new Tone.Reverb({
                decay: reverbDecay,
                preDelay: preDelay,
                wet: reverbWet
            }))
        setReverb(reverbNode)
    }
    else{
        if(reverbNode){
        reverbNode.disconnect();
        setReverb(null)
        }
    }

    }, [REVERB_ON])

    useEffect(() => {
        if (reverbNode && REVERB_ON) {
            reverbNode.set({
                wet: reverbWet
            });
            setReverb(reverbNode);
        }
    }, [reverbWet])

    useEffect(() => {
        if (reverbNode && REVERB_ON) {
            reverbNode.set({
                preDelay: preDelay
            });
            setReverb(reverbNode);
        }
    }, [preDelay])

    useEffect(() => {
        if (reverbNode && REVERB_ON) {
            reverbNode.set({
                decay: reverbDecay
            });
            setReverb(reverbNode);
        }
    }, [reverbDecay])



    return (
        <div id="reverb-container">
            <p style={{
                gridRow: 1,
                gridColumnStart: 1,
                gridColumnEnd: "span 4",
            }}
                className="type">Reverb</p>
            <OnOffSwitch id={"reverb-on-off"}
            setState={setREVERB_ON}
            ></OnOffSwitch>
            <Knob diameter={48} id={"reverb-decay"} parameter={"Decay"}
                            min={0} max={20}
                            setValue={setReverbDecay}
                            step={0.5}
                            defaultValue={0}
            ></Knob>
            <Knob diameter={48} id={"reverb-predelay"} parameter={"Predelay"}
                                        min={0} max={0.5}
                                        setValue={setPreDelay}
                                        step={0.01}
                                        defaultValue={0}
            ></Knob>
            <Knob diameter={48} id={"reverb-wet"} parameter={"Wet"}
                                        min={0} max={1}
                                        setValue={setReverbWet}
                                        step={0.05}
                                        defaultValue={1}
            ></Knob>
        </div>
    )
}

export default Reverb