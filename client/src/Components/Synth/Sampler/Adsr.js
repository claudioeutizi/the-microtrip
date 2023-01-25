import React from 'react'
import Knob from './Controls/Knob'
const Adsr = (props) => {

    return (
        <div id="adsr-container">
            <p className="type">ADSR</p>

            <Knob setValue={props.setAttack}
                min={0.01}
                max={2}
                step={0.01}
                diameter={64} id="envelope-attack"
                parameter={"Attack"}>
            </Knob>

            <Knob setValue={props.setDecay}
                min={0.01}
                max={2}
                step={0.01}
                diameter={64} id="envelope-decay"
                parameter={"Decay"}>
            </Knob>

            <Knob setValue={props.setSustain}
                min={0}
                max={1}
                step={0.01}
                diameter={64} id="envelope-sustain"
                parameter={"Sustain"}>
            </Knob>

            <Knob setValue={props.setRelease}
                min={0}
                max={5}
                step={0.1}
                diameter={64} id="envelope-release"
                parameter={"Release"}>
            </Knob>
        </div>
    )
}

export default Adsr
