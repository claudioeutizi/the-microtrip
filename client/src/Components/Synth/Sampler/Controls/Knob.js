import React, { useState } from 'react'
import { WebAudioKnob, WebAudioParam } from 'webaudio-controls-react-typescript'
import knobImg from 'webaudio-controls-react-typescript/dist/images/images/MS20_def.png'
import "../../Synthesizer.css"

const Knob = ({ parameter, diameter, id, unit, setValue, defaultValue, min, max, log, step }) => {

  const [knobValue, setKnobValue] = useState(0);

  const handleKnobValueChange = (event) => {
    setKnobValue(parseFloat(event.target.value));
    setValue(parseFloat(event.target.value))
  }

  return (
    <div className="knob">
      <p className="type-module">{parameter}</p>
      <div className="indicator half"></div>

      <WebAudioKnob
        defvalue={defaultValue}
        value={knobValue}
        className="medium-knob"
        tooltip={parameter + ": %s" + ((unit) ? unit : "")}
        diameter={diameter}
        id={id}
        step = {step}
        src={knobImg}
        log={log}
        onKnobEvent={(event) => handleKnobValueChange(event)}
        min={min} max={max}>
          
      </WebAudioKnob>

      <div className="indicator left"></div>
      <div className="indicator right"></div>
      <div style={{ display: "grid", gridTemplateRows: "50% 50%", alignItems: "center", justifyContent: "center" }}>
        <WebAudioParam colors={"#D6D8DD"} width={20} height={10} link={id} src=""></WebAudioParam>
        {unit}
      </div>
    </div>
  )
}
export default Knob

