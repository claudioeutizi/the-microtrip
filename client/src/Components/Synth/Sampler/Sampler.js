
import React, { useEffect, useRef, useState } from 'react'
import { WebAudioKnob } from 'webaudio-controls-react-typescript'
import knobImg from 'webaudio-controls-react-typescript/dist/images/images/MS20_def.png'
import Knob from './Controls/Knob'

const Sampler = () => {

    const [knobValue, setKnobValue] = useState(0);
    const [showInput, setShowInput] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        const handleMouseUp = (event) => {
            if (event.target !== inputRef.current) setShowInput(false);
        }
        document.addEventListener("mouseup", handleMouseUp);
        return () => {
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [inputRef, setShowInput]);

    const instruments = [
        {
            value: 0,
            label: 'Classic Guitar'
        },
        {
            value: 1,
            label: 'Sitar'
        },
        {
            value: 2,
            label: 'Mellotron'
        },
    ];

    return (
        <div id="sampler-container">
            <p className="type">Sampler</p>
            <div className="screen-container sampler">
                <select label="Instrument">
                    {instruments.map((instrument) => {
                        return <option value={instrument.value}>{instrument.label}</option>
                    })}
                </select>
            </div>
            <div id="sampler-knobs-row">
                <Knob diameter = {64} id={"sampler-gain"} defValue = {0} parameter = {"Gain"}></Knob>
                <Knob diameter = {64} id={"sampler-finetune"} defValue = {0} parameter = {"Fine Tune"}></Knob>
            </div>
        </div>
    )
}

export default Sampler

