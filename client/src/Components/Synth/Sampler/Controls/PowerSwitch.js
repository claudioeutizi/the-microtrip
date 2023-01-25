import React, { useState } from 'react'
import { WebAudioSwitch } from 'webaudio-controls-react-typescript'
import onOffSwitchImg from 'webaudio-controls-react-typescript/dist/images/images/Power_switch_mod.png'
import ledImg from 'webaudio-controls-react-typescript/dist/images/images/led.png'
import "../../Synthesizer.css"

const PowerSwitch = (props) => {

    const [onOff, setOnOff] = useState(false);

    return (
        <div className="onoff">
            <p className="type-module" style={{ marginBottom: "7%" }}>On/Off</p>

            <WebAudioSwitch className="medium-knob" defvalue={0}
                onSwitchChange={setOnOff} id={props.id} style={{ "top": "5px" }} src={onOffSwitchImg}>
            </WebAudioSwitch>

            <WebAudioSwitch style={{
                alignSelf: "center",
                justifySelf: "center"
            }} src={ledImg} value={onOff} enable={0} type="toggle"></WebAudioSwitch>
        </div>
    )
}

export default PowerSwitch