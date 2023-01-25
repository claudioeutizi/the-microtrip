import React, { useState } from 'react'
import { WebAudioKnob, WebAudioParam } from 'webaudio-controls-react-typescript'
import knobImg from 'webaudio-controls-react-typescript/dist/images/images/MS20_def.png'
import "../../Synthesizer.css"

const Knob = (props) => {

  const [knobValue, setKnobValue] = useState(props.defaultValue);


  const handleKnobValueChange = (event) => {
    setKnobValue(parseFloat(event.target.value));
    props.setValue(parseFloat(event.target.value))
  }


  return (
    <div className="knob">
      <p className="type-module">{props.parameter}</p>
      <div>
        <div className="indicator half"></div>

        <WebAudioKnob
          defvalue={props.defaultValue}
          value={knobValue}
          className="medium-knob"
          tooltip={props.parameter + ": %s" + ((props.unit) ? props.unit : "")}
          diameter={props.diameter}
          id={props.id}
          step={props.step}
          src={knobImg}
          conv={props.conv}
          log={props.log}
          onKnobEvent={(event) => handleKnobValueChange(event)}
          min={props.min} max={props.max}>

        </WebAudioKnob>

        <div className="indicator left"></div>
        <div className="indicator right"></div>
        <div style={{ display: "grid", gridTemplateRows: "50% 50%", alignItems: "center", justifyContent: "center" }}>

          <WebAudioParam colors={"#D6D8DD"} width={20} height={10} link={props.id} src=""></WebAudioParam>

          {props.unit}
        </div>
      </div>
    </div>
  )
}

Knob.defaultProps = {
  unit: "",
  conv: "",
  min: 0,
  max: 100,
  defaultValue: 50,
  step: 1,
  diameter: 64,
  parameter: "",
  log: 0,
}

export default Knob

