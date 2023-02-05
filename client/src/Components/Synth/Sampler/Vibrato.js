import React from 'react'
import OnOffSwitch from './Controls/OnOffSwitch'
import Knob from './Controls/Knob'
import { useCallback, useEffect, useState } from 'react';
import * as Tone from 'tone'

const Vibrato = ({ setVibrato }) => {

    const [vibratoNode, setVibratoNode] = useState(null);
    const [VIBRATO_ON, setVIBRATO_ON] = useState(false);
    const [vibratoRate, setVibratoRate] = useState(0);
    const [vibratoDepth, setVibratoDepth] = useState(0);
    const [vibratoWet, setVibratoWet] = useState(1);

    const createVibrato= useCallback((vibratoRate, vibratoDepth, vibratoWet) => {
        return new Tone.Vibrato({
            frequency: vibratoRate,
            depth: vibratoDepth,
            wet: vibratoWet
        })
    },[]);


    useEffect(() => {
        if (VIBRATO_ON && !vibratoNode) {
            setVibratoNode(createVibrato(vibratoRate, vibratoDepth, vibratoWet));
            setVibrato(vibratoNode)
        }
        else {
            if (vibratoNode && !VIBRATO_ON) {
                vibratoNode.disconnect();
                setVibrato(null)
            }
        }
    }, [VIBRATO_ON])

    useEffect(() => {
        if (vibratoNode && VIBRATO_ON) {
            vibratoNode.set({
                frequency: vibratoRate
            });
            setVibrato(vibratoNode);
        }
    }, [vibratoRate])

    useEffect(() => {
        if (vibratoNode && VIBRATO_ON) {
            vibratoNode.set({
                depth: vibratoDepth
            });
            setVibrato(vibratoNode);
        }
    }, [vibratoDepth])

    useEffect(() => {
        if (vibratoNode && VIBRATO_ON) {
            vibratoNode.set({
                wet: vibratoWet
            });
            setVibrato(vibratoNode);
        }
    }, [vibratoWet])


    useEffect(() => {
        const handleOnExternalTemperature = (event) => {
            const weatherData = event.detail.data;
            if(VIBRATO_ON && vibratoNode){
                console.log("vibrato exists: modify humidity");
                setVibratoWet(1);
                setVibratoDepth(1);
                setVibratoRate(5);
            } else {
                console.log("vibrato does not exists: creating it and setting with hunidity");
                setVibratoNode(createVibrato(vibratoRate, vibratoDepth, vibratoWet));
                setVibrato(vibratoNode);
                setVibratoDepth(1)
                setVibratoWet(1);
                setVibratoRate(5);
                setVIBRATO_ON(1);
            }
        }
        document.addEventListener("onexternaldata", handleOnExternalTemperature);
        return () => {
            document.removeEventListener("onexternaldata", handleOnExternalTemperature);
        }
    });




    return (
        <div id="vibrato-container">
            <p style={{
                gridRow: 1,
                gridColumnStart: 1,
                gridColumnEnd: "span 4",
            }}
                className="type">Vibrato</p>

            <OnOffSwitch
                id={"vibrato-on-off"}
                setState={setVIBRATO_ON}
                value = {VIBRATO_ON}>
            </OnOffSwitch>
            <Knob diameter={48} id={"vibrato-depth"} parameter={"Depth"}
                min={0} max={1}
                setValue={setVibratoDepth}
                step={0.05}
                value = {vibratoDepth}
                defaultValue={0}
            ></Knob>
            <Knob diameter={48} id={"vibrato-Rate"} parameter={"Rate"}
                min={0} max={20}
                setValue={setVibratoRate}
                value = {vibratoRate}
                step={0.1}
                defaultValue={0}
            >
            </Knob>
            <Knob diameter={48} id={"vibrato-wet"} parameter={"Wet"}
                min={0} max={1}
                setValue={setVibratoWet}
                value = {vibratoWet}
                step={0.05}
                defaultValue={1}
            ></Knob>
        </div>
    )
}

export default Vibrato