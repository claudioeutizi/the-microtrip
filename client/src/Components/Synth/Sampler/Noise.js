import React from 'react'
import Knob from './Controls/Knob'
import * as Tone from 'tone'


const Noise = (props) => {

    const types = [
        {
            value: 0,
            label: "white"
        },
        {
            value: 1,
            label: "pink"
        },
        {
            value: 2,
            label: "brown"
        },
    ]

    return (
        <div id="noise-container">
            <p className="type">Noise</p>
            <div className="screen-container noise">
                <select label="Type">
                    {types.map((type) => {
                        return <option key={type.value} value={type.value}>{type.label}</option>
                    })}
                </select>
            </div>
            <div id="noise-knobs-row">
                <Knob id="noise-gain" diameter={48} parameter={"Gain"}
                    min={Tone.dbToGain(-60)} max={Tone.dbToGain(0)}
                    log={1}
                    step={0.001}
                    setValue={props.setNoiseGain}
                    unit="dB"
                    conv="Math.round(20*Math.log10(x)).toFixed(2)"
                    defaultValue={Tone.dbToGain(-60)}
                ></Knob>
                <Knob id="noise-fadein" diameter={48} parameter={"Fadein"}
                    min={0} max={2}
                    setValue={props.setFadeIn}
                    step={0.05}
                    defaultValue={0}
                ></Knob>
                <Knob id="noise-fadeout" diameter={48} parameter={"Fadeout"}
                    min={0} max={2}
                    setValue={props.setFadeIn}
                    step={0.05}
                    defaultValue={0}
                ></Knob>
            </div>
        </div>
    )
}

export default Noise
