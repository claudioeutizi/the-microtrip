import { useState, useEffect, useCallback, useMemo } from "react";
import * as Tone from 'tone';




const Vibrato = ({ VIBRATO_ON, wet, depth, rate, setVibrato}) => {

    const [vibratoNode, setVibratoNode] = useState(null);
   
    useState(() => {
        if(VIBRATO_ON){
            console.log("Vibrato ON")
            setVibratoNode(new Tone.Vibrato({
                frequency: rate,
                depth: depth,
                wet: wet
            }))
        }

    }, [depth, rate, wet])
   
    useEffect(() => {
        if (vibratoNode) {
            setVibrato(vibratoNode);
        }

        return () => {
            if (vibratoNode) {
                vibratoNode.dispose();
            }

        }
    }, [vibratoNode, setVibrato])



    return (
        null
    );
};

export default Vibrato;