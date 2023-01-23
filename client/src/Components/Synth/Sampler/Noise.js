
import React from 'react'
import { WebAudioKnob } from 'webaudio-controls-react-typescript'
import knobImg from 'webaudio-controls-react-typescript/dist/images/images/MS20_def.png'

const Noise = () => {

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
                        return <option value={type.value}>{type.label}</option>
                    })}
                </select>
            </div>
            <div id="noise-knobs-row">
                <div className="knob">
                    <p className="type-module">Gain</p>
                    <div className="knob-container"></div>
                    <WebAudioKnob className="medium-knob" diameter={48} id="noise-gain" src={knobImg}></WebAudioKnob>
                </div>
                <div className="knob">
                    <p className="type-module">Fadein</p>
                    <WebAudioKnob className="medium-knob" diameter={48} id="noise-fadeout" src={knobImg}></WebAudioKnob>
                </div>
                <div className="knob">
                    <p className="type-module">Fadeout</p>
                    <WebAudioKnob className="medium-knob" diameter={48} id="noise-fadeout" src={knobImg}></WebAudioKnob>
                </div>
            </div>
        </div>
    )
}

export default Noise
