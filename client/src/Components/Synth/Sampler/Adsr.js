import React from 'react'
import Knob from './Controls/Knob'
const Adsr = () => {

    return (
        <div id="adsr-container">
            <p className="type">ADSR</p>
            <Knob diameter = {64} id="envelope-attack" parameter = {"Attack"}></Knob>
            <Knob diameter = {64} id="envelope-decay" parameter = {"Decay"}></Knob>
            <Knob diameter = {64} id="envelope-sustain" parameter = {"Sustain"}></Knob>
            <Knob diameter = {64} id="envelope-release" parameter = {"Release"}></Knob>
        </div>
    )
}

export default Adsr
