import React from 'react'
import Knob from './Controls/Knob'
const Adsr = (props) => {

    return (
        <div id="adsr-container">
            <p className="type">ADSR</p>

            <Knob setValue={props.setAttack}
                value = {0}
                min={0}
                max={2}
                step={0.01}
                defaultValue={0}
                diameter={64} id="envelope-attack"
                parameter={"Attack"}>
            </Knob>

            <Knob setValue={props.setDecay}
                value = {0.01}
                min={0.01}
                max={2}
                step={0.01}
                defaultValue={0.01}
                diameter={64} id="envelope-decay"
                parameter={"Decay"}>
            </Knob>

            <Knob setValue={props.setSustain}
                value = {1}
                min={0}
                max={1}
                step={0.01}
                defaultValue = {1}
                diameter={64} id="envelope-sustain"
                parameter={"Sustain"}>
            </Knob>

            <Knob setValue={props.setRelease}
                value = {0}
                min={0}
                max={3}
                step={0.1}
                defaultValue={0}
                diameter={64} id="envelope-release"
                parameter={"Release"}>
            </Knob>
        </div>
    )
}

export default Adsr
