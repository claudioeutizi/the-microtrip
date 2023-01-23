import React, { useState } from 'react'
import { WebAudioKnob, WebAudioSwitch } from 'webaudio-controls-react-typescript'
import knobImg from 'webaudio-controls-react-typescript/dist/images/images/MS20_def.png'
import onOffSwitchImg from 'webaudio-controls-react-typescript/dist/images/images/switch_toggle.png'
import ledImg from 'webaudio-controls-react-typescript/dist/images/images/led.png'

const Filter = () => {

    const [onOffHpf, setOnOffHpf] = useState(false);
    const [onOffLpf, setOnOffLpf] = useState(false);
    const [onOffLfoHpf, setOnOffLfoHpf] = useState(false);
    const [onOffLfoLpf, setOnOffLfoLpf] = useState(false);

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
                "gridRow": 1,
                "gridColumnStart": 1,
                "gridColumnEnd": "span 2",
            }}>FILTER</p>

            {/* Types */}

            <p className="type" style={{
                margin: "0px",
                "gridRow": 2,
                "gridColumn": 1,
            }}>LPF</p>

            <p className="type" style={{
                margin: "0px",
                "gridRow": 2,
                "gridColumn": 2,
            }}>HPF</p>

            {/* on/off */}
            <div className="onoff" style={{
                "gridRow": 3,
                "gridColumn": 1,
            }}>
                <p className="type-module">On/Off</p>
                <WebAudioSwitch className="medium-knob" defvalue={0}
                    onSwitchChange={setOnOffLpf} id="lpf-on-off" invert={1} style={{ "top": "5px" }} src={onOffSwitchImg}></WebAudioSwitch>
                <WebAudioSwitch id="hpf-led" style={{
                    alignSelf: "center",
                    justifySelf: "center"
                }} src={ledImg} value={onOffLpf} enable={0} type="toggle"></WebAudioSwitch>
            </div>

            <div className="onoff" style={{
                "gridRow": 3,
                "gridColumn": 2,
            }}>
                <p className="type-module">On/Off</p>
                <WebAudioSwitch className="medium-knob" defvalue={0}
                    onSwitchChange={setOnOffHpf} id="hpf-on-off" invert={1} style={{ "top": "5px" }} src={onOffSwitchImg}></WebAudioSwitch>
                <WebAudioSwitch id="hpf-led" style={{
                    alignSelf: "center",
                    justifySelf: "center"
                }} src={ledImg} value={onOffHpf} enable={0} type="toggle"></WebAudioSwitch>
            </div>

            {/* Cutoff-resonance */}

            <div className="knob" style={{
                "gridRow": 4,
                "gridColumn": 1,
            }}>
                <p className="type-module">Cutoff</p>
                <WebAudioKnob className="medium-knob" id="filter-lpf-cutoff" src={knobImg}></WebAudioKnob>
            </div>


            <div className="knob" style={{
                "gridRow": 5,
                "gridColumn": 1,
            }}>
                <p className="type-module">Resonance</p>
                <WebAudioKnob className="medium-knob" diameter={48} id="filter-lpf-resonance" src={knobImg}></WebAudioKnob>
            </div>

            <div className="knob" style={{
                "gridRow": 4,
                "gridColumn": 2,
            }}>
                <p className="type-module">Cutoff</p>
                <WebAudioKnob className="medium-knob" id="filter-hpf-cutoff" src={knobImg}></WebAudioKnob>
            </div>

            <div className="knob" style={{
                "gridRow": 5,
                "gridColumn": 2,
            }}>
                <p className="type-module">Resonance</p>
                <WebAudioKnob className="medium-knob" diameter={48} id="filter-hpf-resonance" src={knobImg}></WebAudioKnob>
            </div>

            {/* LFO title */}
            <p className="type" style={{
                "gridColumnStart": 1,
                "gridColumnEnd": "span 2",
                "gridRow": 6,
                margin: "0px",
            }}>LFO</p>

            {/* on/off */}
            <div className="onoff" style={{
                "gridRow": 7,
                "gridColumn": 1,
            }}>
                <p className="type-module">On/Off</p>
                <WebAudioSwitch className="medium-knob" defvalue={0}
                    onSwitchChange={setOnOffLfoLpf} invert={1} id="lfo-lpf-on-off" style={{ "top": "5px" }} src={onOffSwitchImg}></WebAudioSwitch>
                <WebAudioSwitch id="lfo-hpf-led" style={{
                    alignSelf: "center",
                    justifySelf: "center"
                }} src={ledImg} value={onOffLfoLpf} enable={0} type="toggle"></WebAudioSwitch>
            </div>

            <div className="onoff" style={{
                "gridRow": 7,
                "gridColumn": 2,
            }}>
                <p className="type-module">On/Off</p>
                <WebAudioSwitch className="medium-knob" defvalue={0}
                    onSwitchChange={setOnOffLfoHpf} invert={1} id="lfo-hpf-on-off" style={{ "top": "5px" }} src={onOffSwitchImg}></WebAudioSwitch>
                <WebAudioSwitch id="lfo-hpf-led" style={{
                    alignSelf: "center",
                    justifySelf: "center"
                }} src={ledImg} value={onOffLfoHpf} enable={0} type="toggle"></WebAudioSwitch>
            </div>

            <div className="screen-container lfo">
                <select label="Waveform">
                    {waveforms.map((waveform) => {
                        return <option value = {waveform.value}>{waveform.label}</option>
                    })}
                </select>
            </div>

            <div className="knob" id="lfo-lpf-rate" style={{
                "gridRow": 9,
                "gridColumn": 1
            }}>
                <p className="type-module">Rate</p>
                <WebAudioKnob className="medium-knob" diameter={48} src={knobImg}></WebAudioKnob>
            </div>
            <div className="knob" id="lfo-lpf-depth"
                style={{
                    "gridRow": 10,
                    "gridColumn": 1
                }}>
                <p className="type-module">Depth</p>
                <WebAudioKnob className="medium-knob" diameter={48} src={knobImg}></WebAudioKnob>
            </div>

            <div className="knob" id="lfo-hpf-rate" style={{
                "gridRow": 9,
                "gridColumn": 2
            }}>
                <p className="type-module">Rate</p>
                <WebAudioKnob className="medium-knob" diameter={48} src={knobImg}></WebAudioKnob>
            </div>
            <div className="knob" id="lfo-hpf-depth"
                style={{
                    "gridRow": 10,
                    "gridColumn": 2
                }}>
                <p className="type-module">Depth</p>
                <WebAudioKnob className="medium-knob" diameter={48} src={knobImg}></WebAudioKnob>
            </div>
        </div>
    )
}

export default Filter
