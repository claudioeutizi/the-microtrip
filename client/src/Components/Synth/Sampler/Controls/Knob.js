import React, { useEffect, useState } from 'react'
import { WebAudioKnob, WebAudioParam } from 'webaudio-controls-react-typescript'
import "../../Instrument/Instrument.css"

const Knob = (props) => {

  const [knobValue, setKnobValue] = useState(props.defaultValue);

  useEffect(() => {
    setKnobValue(props.value);
  }, [props.value])

  const handleKnobValueChange = (event) => {
    setKnobValue(parseFloat(event.target.value));
    props.setValue(parseFloat(event.target.value));
  }

  return (
    <div className="knob">
      <p className="type-module">{props.parameter}</p>
      <div>
        <WebAudioKnob
          defvalue={props.defaultValue}
          value={knobValue}
          className="medium-knob"
          tooltip={props.parameter + ": %s" + ((props.unit) ? props.unit : "")}
          diameter={props.diameter}
          id={props.id}
          step={props.step}
          src={"/images/knobs/MS20_def.png"}
          conv={props.conv}
          log={props.log}
          onKnobEvent={(event) => handleKnobValueChange(event)}
          min={props.min} max={props.max}>

        </WebAudioKnob>
        <div style={{ display: "grid", gridTemplateRows: "50% 50%", alignItems: "center", justifyContent: "center" }}>
          <WebAudioParam value = {knobValue} onChange = {(event) => setKnobValue(event.target.value)} colors={"#D6D8DD"} width={30} height={10} link={props.id} src=""></WebAudioParam>
          <span className="unit">{props.unit}</span>

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

