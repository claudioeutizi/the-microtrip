import React, { useState } from 'react'
import { WebAudioKnob, WebAudioParam } from 'webaudio-controls-react-typescript'
import knobImg from 'webaudio-controls-react-typescript/dist/images/images/MS20_def.png'
import "../../Synthesizer.css"

const Knob = (props) => {

  const [knobValue, setKnobValue] = useState(0);

  return (
    <div className="knob">
      <p className="type-module">{props.parameter}</p>
      <div className="indicator half"></div>
      <WebAudioKnob
        defvalue={props.defValue}
        value={knobValue}
        className="medium-knob"
        tooltip={props.parameter + ": %s" + ((props.unit) ? props.unit : "")}
        diameter={props.diameter}
        id={props.id}
        src={knobImg}
        onKnobEvent={(event) => setKnobValue(parseFloat(event.target.value))}>
      </WebAudioKnob>
      <div className="indicator left"></div>
      <div className="indicator right"></div>
      <div style={{ display: "grid", gridTemplateRows: "50% 50%", alignItems: "center", justifyContent: "center" }}>
        <WebAudioParam colors={"#D6D8DD"} width={20} height={10} link={props.id} src=""></WebAudioParam>
        {props.unit}
      </div>
    </div>
  )
}
export default Knob

