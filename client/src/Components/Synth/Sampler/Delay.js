import Knob from './Controls/Knob'
import OnOffSwitch from './Controls/OnOffSwitch'
import { useState, useEffect, useCallback } from "react";
import * as Tone from 'tone';

const Delay = ({ setDelay }) => {

    const [delayNode, setDelayNode] = useState(null);
    const [DELAY_ON, setDELAY_ON] = useState(0);
    const [delayFeedback, setDelayFeedback] = useState(0);
    const [delayTime, setDelayTime] = useState(0);
    const [delayWet, setDelayWet] = useState(0);

    const createDelay = useCallback((delayTime, feedback, wet) => {
        return new Tone.PingPongDelay({
            time: delayTime,
            feedback: feedback,
            wet: wet,
        })
    },[]);

    useEffect(() => {
        if (DELAY_ON && !delayNode) {
            console.log("Delay ON")
            setDelayNode(createDelay(delayTime, delayFeedback, delayWet));
            setDelay(delayNode);
        }
        else if(delayNode && !DELAY_ON) {
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
                feedback: delayFeedback
            });
            setDelay(delayNode);
        }
    }, [delayFeedback])
    
    useEffect(() => {
        if (delayNode && DELAY_ON) {
            delayNode.set({
                wet: delayWet
            });
            setDelay(delayNode);
        }
    }, [delayWet])


    useEffect(() => {
        const handleOnExternalHumidity = (event) => {
            const weatherData = event.detail.data;
            if(DELAY_ON && delayNode){
                console.log("delay exists: modify humidity");
                setDelayWet((weatherData.main.humidity / 100).toFixed(2));
                setDelayFeedback((weatherData.main.humidity / 100).toFixed(2)); //va settato logaritmico
            } else {
                console.log("delay does not exists: creating it and setting with hunidity");
                setDelayNode(createDelay(delayTime, delayFeedback, delayWet));
                setDelay(delayNode);
                setDelayFeedback((weatherData.main.humidity / 100).toFixed(2))
                setDelayWet((weatherData.main.humidity / 100).toFixed(2));
                setDELAY_ON(1);
            }
        }
        document.addEventListener("onexternaldata", handleOnExternalHumidity);
        return () => {
            document.removeEventListener("onexternaldata", handleOnExternalHumidity);
        }
    });


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
            }}  id="delay-on-off"
                value = {DELAY_ON}
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
                setValue={setDelayFeedback}
                value = {delayFeedback}
                step={0.05}
                defaultValue={0}
            ></Knob>
            <Knob style={{ gridRow: 2, gridColumn: 4 }} diameter={48} id="delay-wet" parameter="Wet"
                min={0} max={1}
                setValue={setDelayWet}
                step={0.05}
                defaultValue={0}
                value = {delayWet}
            ></Knob>
        </div>
    )
}

export default Delay