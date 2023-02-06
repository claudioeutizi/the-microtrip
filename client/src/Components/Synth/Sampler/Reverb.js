import React, { useCallback } from 'react'
import Knob from './Controls/Knob'
import OnOffSwitch from './Controls/OnOffSwitch'
import { useState, useEffect } from "react";
import * as Tone from 'tone';

const Reverb = ({ setReverb }) => {

    const [reverbNode, setReverbNode] = useState(null);
    const [REVERB_ON, setREVERB_ON] = useState(0);
    const [reverbWet, setReverbWet] = useState(0.5);
    const [reverbDecay, setReverbDecay] = useState(0);
    const [reverbPreDelay, setReverbPreDelay] = useState(0);

    const createReverb = useCallback((decay, preDelay, wet) => {
        return new Tone.Reverb({
            decay: decay,
            preDelay: preDelay,
            wet: wet
        })
    },[]);

    useEffect(() => {
        if (REVERB_ON && !reverbNode) {
            setReverbNode(createReverb(reverbDecay, reverbPreDelay, reverbWet));
            setReverb(reverbNode);
            }
        else {
            if (reverbNode && !REVERB_ON) {
                reverbNode.disconnect();
                setReverb(null);
            }
        }
    }, [REVERB_ON])

    useEffect(() => {
        if (reverbNode && REVERB_ON) {
            console.log(reverbWet)
            reverbNode.set({
                wet: reverbWet
            });
            setReverb(reverbNode);
        }
    }, [reverbWet])

    useEffect(() => {
        const handleOnInternalHumidity = (event) => {
            if(REVERB_ON && reverbNode){
                console.log("reverb exists: modify humidity");
                setReverbWet((event.detail.humidity / 100).toFixed(2));
                setReverbDecay((event.detail.humidity / 100 * 20).toFixed(2));
            } else {
                console.log("reverb does not exists: creating it and setting with hunidity");
                setReverbNode(createReverb(reverbDecay, reverbPreDelay, reverbWet));
                setReverb(reverbNode);
                setReverbDecay((event.detail.humidity / 100 * 20).toFixed(2));
                setReverbWet((event.detail.humidity / 100).toFixed(2));
                setREVERB_ON(1);
            }
        }
        document.addEventListener("oninternalhumidity", handleOnInternalHumidity);
        return () => {
            document.removeEventListener("oninternalhumidity", handleOnInternalHumidity);
        }
    });

    useEffect(() => {
        if (reverbNode && REVERB_ON) {
            reverbNode.set({
                preDelay: reverbPreDelay
            });
            setReverb(reverbNode);
        }
    }, [reverbPreDelay])

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
                value={REVERB_ON}
            ></OnOffSwitch>
            <Knob diameter={48} id={"reverb-decay"} parameter={"Decay"}
                min={0.001} max={20}
                setValue={setReverbDecay}
                step={0.5}
                defaultValue={0.001}
                value = {reverbDecay}
            ></Knob>
            <Knob diameter={48} id={"reverb-predelay"} parameter={"Predelay"}
                min={0} max={0.5}
                setValue={setReverbPreDelay}
                step={0.01}
                defaultValue={0}
            ></Knob>
            <Knob diameter={48} id={"reverb-wet"} parameter={"Wet"}
                min={0} max={1}
                setValue={setReverbWet}
                step={0.05}
                defaultValue={0.5}
                value = {reverbWet}
            ></Knob>
        </div>
    )
}

export default Reverb