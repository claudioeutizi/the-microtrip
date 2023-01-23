
import React from 'react'
import { WebAudioKnob } from 'webaudio-controls-react-typescript'
import knobImg from 'webaudio-controls-react-typescript/dist/images/images/MS20_def.png'
const Sampler = () => {

    const instruments = [
        {
            value: 0,
            label: 'Classic Guitar'
        },
        {
            value: 1,
            label: 'Sitar'
        },
        {
            value: 2,
            label: 'Mellotron'
        },
    ];

    return (
        <div id="sampler-container">
            <p className="type">Sampler</p>
            <div className="screen-container sampler">
                <select label="Instrument">
                    {instruments.map((instrument) => {
                        return <option value = {instrument.value}>{instrument.label}</option>
                    })}
                </select>

                {/* <div className="screen-display sampler">
                    <p>Instrument</p>
                </div> */}
            </div>
            <div id="sampler-knobs-row">
                <div className="knob">
                    <p className="type-module">Gain</p>
                    <div className="knob-container"></div>
                    <WebAudioKnob className="medium-knob" id="sampler-gain" src={knobImg}></WebAudioKnob>
                </div>
                <div className="knob">
                    <p className="type-module">Fine Tune</p>
                    <WebAudioKnob className="medium-knob" id="sampler-finetune" src={knobImg}></WebAudioKnob>
                </div>
            </div>
        </div>
    )
}

export default Sampler

