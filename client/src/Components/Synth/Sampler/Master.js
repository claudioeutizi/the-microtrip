import React from 'react'
import PowerSwitch from './Controls/PowerSwitch'
import Knob from './Controls/Knob'

const Master = () => {

    return (
        <div id="master-container">
            <PowerSwitch id={"master-on-off"}></PowerSwitch>
            <p className="type" style={{ "gridRow": 2 }}>Master</p>
            <Knob style={{ gridRow: 3 }} diameter={64} id="master-volume" parameter="Volume"></Knob>
        </div>
    )
}

export default Master
