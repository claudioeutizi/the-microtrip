
import React from 'react'
import { WebAudioKnob } from 'webaudio-controls-react-typescript'
import knobImg from 'webaudio-controls-react-typescript/dist/images/images/MS20_def.png'

const Noise = () => {

    return (
        <div id="noise-container">
            <p className="type">Noise</p>
            <div className="screen-container noise">
                <div className="screen-display noise">
                    <p className = "display-text">Noise Type</p>
                </div>
            </div>
            <div id="noise-knobs-row">
                <div className = "knob">
                    <p className="type-module">Gain</p>
                    <div className="knob-container"></div>
                    <WebAudioKnob className="medium-knob" diameter= {48} id="noise-gain" src={knobImg}></WebAudioKnob>
                </div>
                <div className = "knob">
                    <p className="type-module">Fadein</p>
                    <WebAudioKnob className="medium-knob" diameter= {48} id="noise-fadeout" src={knobImg}></WebAudioKnob>
                </div>
                <div className = "knob">
                    <p className="type-module">Fadeout</p>
                    <WebAudioKnob className="medium-knob" diameter= {48} id="noise-fadeout" src={knobImg}></WebAudioKnob>
                </div>
            </div>
        </div>
    )
}

export default Noise
