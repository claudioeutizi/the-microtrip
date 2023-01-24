import React from 'react'
import OnOffSwitch from './Controls/OnOffSwitch'
import Knob from './Controls/Knob'

const Filter = () => {

    const waveforms = [
        {
            id: 0,
            label: "sine"
        },
        {
            id: 1,
            label: "square"
        },
        {
            id: 2,
            label: "triangle"
        },
        {
            id: 3,
            label: "sawtooth"
        },

    ]

    return (
        <div id="filter-container">
            {/* Title */}
            <p className="type" style={{
                gridRow: 1,
                gridColumnStart: 1,
                gridColumnEnd: "span 2",
            }}>FILTER</p>

            {/* Types */}

            <p className="type" style={{
                margin: "0px",
                gridRow: 2,
                gridColumn: 1,
            }}>LPF</p>

            <p className="type" style={{
                margin: "0px",
                gridRow: 2,
                gridColumn: 2,
            }}>HPF</p>

            <OnOffSwitch id="lpf-on-off"
                style={{
                    gridRow: 3,
                    gridColumn: 1,
                }}>
            </OnOffSwitch>

            <OnOffSwitch
                style={{
                    gridRow: 3,
                    gridColumn: 2,
                }} id="hpf-on-off">
            </OnOffSwitch>

            <Knob id="filter-lpf-cutoff"
                style={{
                    "gridRow": 4,
                    "gridColumn": 1,
                }}
                diameter={64} parameter="Cutoff" unit = "Hz"></Knob>

            <Knob id="filter-hpf-cutoff"
                style={{
                    "gridRow": 4,
                    "gridColumn": 2,
                }}
                diameter={64} parameter="Cutoff" unit = "Hz"></Knob>

            <Knob id="filter-lpf-resonance" style={{
                "gridRow": 5,
                "gridColumn": 1,
            }} diameter={48} parameter="Resonance"></Knob>


            <Knob id="filter-hpf-resonance" style={{
                "gridRow": 5,
                "gridColumn": 2,
            }} diameter={48} parameter="resonance"></Knob>

            {/* LFO title */}
            <p className="type" style={{
                "gridColumnStart": 1,
                "gridColumnEnd": "span 2",
                "gridRow": 6,
                margin: "0px",
            }}>LFO</p>

            <OnOffSwitch
                style={{
                    gridRow: 7,
                    gridColumn: 2,
                }} id="lfo-lpf-on-off">
            </OnOffSwitch>

            <OnOffSwitch
                style={{
                    gridRow: 7,
                    gridColumn: 2,
                }} id="lfo-hpf-on-off">
            </OnOffSwitch>

            <div className="screen-container lfo">
                <select label="Waveform">
                    {waveforms.map((waveform) => {
                        return <option value={waveform.value}>{waveform.label}</option>
                    })}
                </select>
            </div>

            <Knob
                style={{
                    gridRow: 9,
                    gridColumn: 1
                }}
                diameter={48} id={"lfo-lpf-rate"} unit = "Hz" parameter={"Rate"}></Knob>

            <Knob
                style={{
                    gridRow: 9,
                    gridColumn: 2
                }}
                diameter={48} id={"lfo-hpf-rate"} unit = "Hz" parameter={"Rate"}></Knob>

            <Knob
                style={{
                    gridRow: 10,
                    gridColumn: 1
                }}
                diameter={48} id={"lfo-lpf-depth"} parameter={"Depth"}></Knob>

            <Knob
                style={{
                    gridRow: 10,
                    gridColumn: 2
                }}
                diameter={48} id={"lfo-hpf-depth"} parameter={"Depth"}></Knob>
        </div>
    )
}

export default Filter
