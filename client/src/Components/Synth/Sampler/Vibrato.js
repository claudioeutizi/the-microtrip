import React from 'react'
import OnOffSwitch from './Controls/OnOffSwitch'
import Knob from './Controls/Knob'

const Vibrato = () => {
    return (
        <div id="vibrato-container">
            <p style={{
                gridRow: 1,
                gridColumnStart: 1,
                gridColumnEnd: "span 4",
            }}
                className="type">Vibrato</p>

            <OnOffSwitch id={"vibrato-on-off"}></OnOffSwitch>
            <Knob diameter={48} id={"vibrato-depth"} parameter={"Depth"}></Knob>
            <Knob diameter={48} id={"vibrato-Rate"} parameter={"Rate"}></Knob>
            <Knob diameter={48} id={"vibrato-wet"} parameter={"Wet"}></Knob>
        </div>
    )
}

export default Vibrato