import React from 'react'
import PowerSwitch from './Controls/PowerSwitch'
import Knob from './Controls/Knob'
import { useCallback, useEffect, useState } from 'react';
import * as Tone from 'tone'
import { dbToGain, gainToDb } from 'tone';

const Master = ({setMaster}) => {

    const [POWER_ON, setPOWER_ON] = useState(1);
    const [masterNode, setMasterNode] = useState(null);
    const [masterGain, setMasterGain] = useState(Tone.dbToGain(0));


    useState(() => {
            setMasterNode(new Tone.Channel({
                volume: masterGain,
                mute: POWER_ON
            }));
            setMaster(masterNode)
    }, [])

    useEffect(() => {
        if (masterNode) {
            masterNode.set({
                volume: gainToDb(masterGain)
            });
        }
    }, [masterGain])

    useEffect(() => {
        if (masterNode) {
            masterNode.set({
                mute: !POWER_ON
            });
            setMaster(masterNode);
        }
    }, [POWER_ON])

    return (
        <div id="master-container">
            <PowerSwitch id={"master-on-off"}
            setState={setPOWER_ON}>
            </PowerSwitch>

            <p className="type" style={{ "gridRow": 2 }}>Master</p>
            <Knob style={{ gridRow: 3 }} diameter={64} id="master-volume" parameter="Volume"
            min={dbToGain(-30)} max={dbToGain(3)} 
            setValue={setMasterGain}
            value = {masterGain}
            log={1}
            step={0.001}
            unit="dB"
            conv="(20*Math.log10(x)).toFixed(2)"
            defaultValue={Tone.dbToGain(0)}
            ></Knob>
        </div>
    )
}

export default Master
