import React, { useState } from 'react'
import { WebAudioKnob, WebAudioSwitch } from 'webaudio-controls-react-typescript'
import knobImg from 'webaudio-controls-react-typescript/dist/images/images/MS20_def.png'
import onOffSwitchImg from 'webaudio-controls-react-typescript/dist/images/images/Power_switch_mod.png'
import ledImg from 'webaudio-controls-react-typescript/dist/images/images/led.png'

const Master = () => {

    const [onOff, setOnOff] = useState(false);

    return (
        <div id="master-container">
            <div className="knob" style={{
                "gridRow": 1,
                "display": "grid",
                "gridAutoRows": "20% 60% 20%",
            }}>
                <p className="type-module">On/Off</p>
                <WebAudioSwitch className="medium-knob" defvalue={0}
                    onSwitchChange={setOnOff} id="master-on-off" style={{ "top": "5px" }} src={onOffSwitchImg}></WebAudioSwitch>
                <WebAudioSwitch id="master-led" style={{
                    alignSelf: "center",
                    justifySelf: "center"
                }} src={ledImg} value={onOff} enable={0} type="toggle"></WebAudioSwitch>
            </div>
            <p className="type" style={{ "gridRow": 2 }}>Master</p>
            <div className="knob" style={{ "gridRow": 3 }}>
                <p className="type-module">Volume</p>
                <WebAudioKnob className="medium-knob" id="master-volume" src={knobImg}></WebAudioKnob>
            </div>
        </div>
    )
}

export default Master
