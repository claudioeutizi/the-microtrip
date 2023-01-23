import { useState, useEffect, useCallback, useMemo } from "react";
import * as Tone from 'tone';



const Delay = ({ DELAY_ON, wet, delayTime, feedback, setDelay}) => {

    const [delayNode, setDelayNode] = useState(null);
   
    useEffect(() => {
        if(DELAY_ON){
            console.log("Delay ON")
            setDelayNode(new Tone.PingPongDelay({
                delayTime: delayTime,
                feedback: feedback,
                wet: wet
            }))
            setDelay(delayNode);
        }
        else{
            setDelay(null)
        }

    }, [feedback, delayTime, wet, DELAY_ON])
   
    useEffect(() => {
        if (delayNode) {
            setDelay(delayNode);
        }

        return () => {
            if (delayNode) {
                delayNode.dispose();
            }
        }
    }, [delayNode, setDelay])



    return (
        null
    );
};

export default Delay;