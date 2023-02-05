import React, { useEffect, useState } from 'react'
import { WebAudioSwitch } from 'webaudio-controls-react-typescript'
import "../../Instrument/Instrument.css"

const OnOffSwitch = (props) => {

    const [onOff, setOnOff] = useState(false);

    const handleOnChange = (value) => {
        setOnOff(value);
        props.setState(value);
      }

    useEffect(() => {
        setOnOff(props.value);
        console.log(props.value)
      }, [props.value])

    return (
        <div className="onoff">
            <p className="type-module" style={{ marginBottom: "7%" }}>On/Off</p>

            <WebAudioSwitch className="medium-knob" defvalue={0}
                onSwitchChange={(value) => handleOnChange(value)} 
                value = {onOff}
                id={props.id} 
                invert={1} 
                style={{ "top": "5px" }}
                src={"/images/knobs/switch_toggle.png"}>
            </WebAudioSwitch>

            <WebAudioSwitch style={{
                alignSelf: "center",
                justifySelf: "center"
            }} src={"/images/knobs/led.png"} value={onOff} enable={0} type="toggle"></WebAudioSwitch>
        </div>
    )
}

export default OnOffSwitch