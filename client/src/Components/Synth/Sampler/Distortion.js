import React, { useState } from 'react'
import { WebAudioKnob, WebAudioSwitch } from 'webaudio-controls-react-typescript'
import knobImg from 'webaudio-controls-react-typescript/dist/images/images/MS20_def.png'
import onOffSwitchImg from 'webaudio-controls-react-typescript/dist/images/images/switch_toggle.png'
import ledImg from 'webaudio-controls-react-typescript/dist/images/images/led.png'

const Distortion = () => {

    const [onOff, setOnOff] = useState(false);

    return (
        <div id="distortion-container">
            <p style={{
                gridRow: 1,
                gridColumnStart: 1,
                gridColumnEnd: "span 3",
            }}
                className="type">Distortion</p>

            <div className="onoff" style={{
                    gridRow: 2,
                    gridColumn: 1
                }}>
                <p className="type-module" style = {{marginBottom:"7%"}}>On/Off</p>
                <WebAudioSwitch className="medium-knob" defvalue={0}
                    onSwitchChange={setOnOff} id="distortion-on-off" invert={1} style={{ "top": "5px" }} src={onOffSwitchImg}></WebAudioSwitch>
                <WebAudioSwitch id="distortion-led" style={{
                    alignSelf: "center",
                    justifySelf: "center"
                }} src={ledImg} value={onOff} enable={0} type="toggle"></WebAudioSwitch>
            </div>

            <div className="knob" style={{
                    gridRow: 2,
                    gridColumn: 2
                }}>
                <p className="type-module">Amount</p>
                <div className="knob-container"></div>
                <WebAudioKnob className="medium-knob" diameter = {48} id="distortion-amount" src={knobImg}></WebAudioKnob>
            </div>
            <div className="knob" style={{
                    gridRow: 2,
                    gridColumn: 3
                }}>
                <p className="type-module">Wet</p>
                <WebAudioKnob className="medium-knob" diameter = {48} id="distortion-wet" src={knobImg}></WebAudioKnob>
            </div>
        </div>
    )
}

export default Distortion