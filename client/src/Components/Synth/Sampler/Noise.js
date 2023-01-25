
import React from 'react'
import Knob from './Controls/Knob'

const Noise = () => {

    const types = [
        {
            value: 0,
            label: "white"
        },
        {
            value: 1,
            label: "pink"
        },
        {
            value: 2,
            label: "brown"
        },
    ]

    return (
        <div id="noise-container">
            <p className="type">Noise</p>
            <div className="screen-container noise">
                <select label="Type">
                    {types.map((type) => {
                        return <option key={type.value} value={type.value}>{type.label}</option>
                    })}
                </select>
            </div>
            <div id="noise-knobs-row">
                <Knob id = "noise-gain" diameter = {48} parameter = {"Gain"}></Knob>
                <Knob id = "noise-fadein" diameter = {48} parameter = {"Fadein"}></Knob>
                <Knob id = "noise-fadeout" diameter = {48} parameter = {"Fadeout"}></Knob>
            </div>
        </div>
    )
}

export default Noise
