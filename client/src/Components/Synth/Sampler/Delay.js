import React, { useState } from 'react'
import { WebAudioKnob, WebAudioSwitch } from 'webaudio-controls-react-typescript'
import knobImg from 'webaudio-controls-react-typescript/dist/images/images/MS20_def.png'
import onOffSwitchImg from 'webaudio-controls-react-typescript/dist/images/images/switch_toggle.png'
import ledImg from 'webaudio-controls-react-typescript/dist/images/images/led.png'
import Knob from './Controls/Knob'
import OnOffSwitch from './Controls/OnOffSwitch'

const Delay = () => {

    return (
        <div id="delay-container">
            <p style={{
                gridRow: 1,
                gridColumnStart: 1,
                gridColumnEnd: "span 4",
            }}
                className="type">Delay</p>

            <OnOffSwitch style={{
                gridRow: 2,
                gridColumn: 1
            }} id="delay-on-off"></OnOffSwitch>

            <Knob style={{ gridRow: 2, gridColumn: 2 }} diameter={48} id="delay-time" parameter="Time"></Knob>
            <Knob style={{ gridRow: 2, gridColumn: 3 }} diameter={48} id="delay-feedback" parameter="Feedback"></Knob>
            <Knob style={{ gridRow: 2, gridColumn: 4 }} diameter={48} id="delay-wet" parameter="Wet"></Knob>
        </div>
    )
}

export default Delay