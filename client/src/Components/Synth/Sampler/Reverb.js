import React, { useState } from 'react'
import { WebAudioKnob, WebAudioSwitch } from 'webaudio-controls-react-typescript'
import knobImg from 'webaudio-controls-react-typescript/dist/images/images/MS20_def.png'
import onOffSwitchImg from 'webaudio-controls-react-typescript/dist/images/images/switch_toggle.png'
import ledImg from 'webaudio-controls-react-typescript/dist/images/images/led.png'

const Reverb = () => {

    const [onOff, setOnOff] = useState(false);

    return (
        <div id="reverb-container">
            <p style={{
                gridRow: 1,
                gridColumnStart: 1,
                gridColumnEnd: "span 4",
            }}
                className="type">Reverb</p>

            <div className="onoff" style={{
                    gridRow: 2,
                    gridColumn: 1
                }}>
                <p className="type-module" style = {{marginBottom:"7%"}}>On/Off</p>
                <WebAudioSwitch className="medium-knob" defvalue={0}
                    onSwitchChange={setOnOff} id="reverb-on-off" invert={1} style={{ "top": "5px" }} src={onOffSwitchImg}></WebAudioSwitch>
                <WebAudioSwitch id="reverb-led" style={{
                    alignSelf: "center",
                    justifySelf: "center"
                }} src={ledImg} value={onOff} enable={0} type="toggle"></WebAudioSwitch>
            </div>

            <div className="knob" style={{
                    gridRow: 2,
                    gridColumn: 2
                }}>
                <p className="type-module">Decay</p>
                <div className="knob-container"></div>
                <WebAudioKnob className="medium-knob" diameter = {48} id="reverb-decay" src={knobImg}></WebAudioKnob>
            </div>
            <div className="knob" style={{
                    gridRow: 2,
                    gridColumn: 3
                }}>
                <p className="type-module">Predelay</p>
                <WebAudioKnob className="medium-knob" diameter = {48} id="reverb-predelay" src={knobImg}></WebAudioKnob>
            </div>
            <div className="knob" style={{
                    gridRow: 2,
                    gridColumn: 4
                }}>
                <p className="type-module">Wet</p>
                <WebAudioKnob className="medium-knob" diameter = {48} id="reverb-wet" src={knobImg}></WebAudioKnob>
            </div>
        </div>
    )
}

export default Reverb