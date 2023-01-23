import React from 'react'
import { WebAudioKnob } from 'webaudio-controls-react-typescript'
import knobImg from 'webaudio-controls-react-typescript/dist/images/images/MS20_def.png'

const Adsr = () => {

    return (
        <div id="adsr-container">
            <p className="type">ADSR</p>
            <div className="knob">
                <p className="type-module">Attack</p>
                <WebAudioKnob className="medium-knob" diameter= {48} id="envelope-attack" src={knobImg}></WebAudioKnob>
            </div>
            <div className="knob">
                <p className="type-module">Decay</p>
                <WebAudioKnob className="medium-knob" diameter= {48} id="envelope-decay" src={knobImg}></WebAudioKnob>
            </div>
            <div className="knob">
                <p className="type-module">Sustain</p>
                <WebAudioKnob className="medium-knob" diameter= {48} id="envelope-sustain" src={knobImg}></WebAudioKnob>
            </div>
            <div className="knob">
                <p className="type-module">Release</p>
                <WebAudioKnob className="medium-knob" diameter= {48} id="envelope-release" src={knobImg}></WebAudioKnob>
            </div>
        </div>
    )
}

export default Adsr
