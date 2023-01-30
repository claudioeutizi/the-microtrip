import React, { useState } from 'react'
import { WebAudioSwitch } from 'webaudio-controls-react-typescript'
import "../../Synthesizer.css"

const PowerSwitch = (props) => {

    const [onOff, setOnOff] = useState(false);
    const handleOnChange = (value) => {
        setOnOff(value);
        props.setState(value)
      }

    return (
        <div className="onoff">
            <p className="type-module" style={{ marginBottom: "7%" }}>On/Off</p>

            <WebAudioSwitch className="medium-knob"
                defvalue={0}
                onSwitchChange={setOnOff}
                id={props.id}
                style={{ "top": "5px" }}
                src={"/images/knobs/Power_switch_mod.png"}>
                onSwitchChange={(value) => handleOnChange(value)}
            </WebAudioSwitch>

            <WebAudioSwitch style={{
                alignSelf: "center",
                justifySelf: "center"
            }} src={"/images/knobs/led.png"} value={onOff} enable={0} type="toggle"></WebAudioSwitch>
        </div>
    )
}

export default PowerSwitch