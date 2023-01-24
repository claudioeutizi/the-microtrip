import React from 'react'
import Knob from './Controls/Knob'
import OnOffSwitch from './Controls/OnOffSwitch'

const Reverb = () => {

    return (
        <div id="reverb-container">
            <p style={{
                gridRow: 1,
                gridColumnStart: 1,
                gridColumnEnd: "span 4",
            }}
                className="type">Reverb</p>
            <OnOffSwitch id={"reverb-on-off"}></OnOffSwitch>
            <Knob diameter={48} id={"reverb-decay"} parameter={"Decay"}></Knob>
            <Knob diameter={48} id={"reverb-predelay"} parameter={"Predelay"}></Knob>
            <Knob diameter={48} id={"reverb-wet"} parameter={"Wet"}></Knob>
        </div>
    )
}

export default Reverb