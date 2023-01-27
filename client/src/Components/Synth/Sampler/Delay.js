import Knob from './Controls/Knob'
import OnOffSwitch from './Controls/OnOffSwitch'
import { useState, useEffect } from "react";
import * as Tone from 'tone';

const Delay = ({ setDelay }) => {

    const [delayNode, setDelayNode] = useState(null);
    const [DELAY_ON, setDELAY_ON] = useState(false);
    const [feedback, setFeedabck] = useState(0);
    const [delayTime, setDelayTime] = useState(0);
    const [delayWet, setDelayWet] = useState(1);

    useEffect(() => {
        if (DELAY_ON) {
            console.log("Delay ON")
            setDelayNode(new Tone.PingPongDelay({
                delayTime: delayTime,
                feedback: feedback,
                wet: delayWet
            }))
            setDelay(delayNode);
        }
        else {
            setDelay(null)
        }


    }, [DELAY_ON])

    useEffect(() => {
        if (delayNode && DELAY_ON) {
            delayNode.set({
                delayTime: delayTime
            });
            setDelay(delayNode);
        }
    }, [delayTime])

    useEffect(() => {
        if (delayNode && DELAY_ON) {
            delayNode.set({
                feedback: feedback
            });
            setDelay(delayNode);
        }
    }, [feedback])
    
    useEffect(() => {
        if (delayNode && DELAY_ON) {
            delayNode.set({
                wet: delayWet
            });
            setDelay(delayNode);
        }
    }, [delayWet])




    return (
        <div id="delay-container">
            <p style={{
                gridRow: 1,
                gridColumnStart: 1,
                gridColumnEnd: "span 4",
            }}
                className="type">Delay</p>

            <OnOffSwitch style={{
                gridRow: 2,
                gridColumn: 1
            }} id="delay-on-off"
                setState={setDELAY_ON}></OnOffSwitch>

            <Knob style={{ gridRow: 2, gridColumn: 2 }} diameter={48}
                id="delay-time" parameter="Time"
                min={0} max={3}
                setValue={setDelayTime}
                step={0.05}
                defaultValue={0}
            ></Knob>
            <Knob style={{ gridRow: 2, gridColumn: 3 }} diameter={48} id="delay-feedback" parameter="Feedback"
                min={0} max={0.99}
                setValue={setFeedabck}
                step={0.05}
                defaultValue={0}
            ></Knob>
            <Knob style={{ gridRow: 2, gridColumn: 4 }} diameter={48} id="delay-wet" parameter="Wet"
                min={0} max={1}
                setValue={setDelayWet}
                step={0.05}
                defaultValue={1}
            ></Knob>
        </div>
    )
}

export default Delay