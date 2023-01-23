import { useState, useEffect, useCallback, useMemo } from "react";
import * as Tone from 'tone';



const Reverb = ({ REVERB_ON, wet, decay, preDelay, setReverb}) => {

    const [reverbNode, setReverbNode] = useState(null);
   
    useState(() => {
        if(REVERB_ON){
            console.log("Reverb ON")
            setReverbNode(new Tone.Reverb({
                decay: decay,
                preDelay: preDelay,
                wet: wet
            }))
        }

    }, [decay, preDelay, wet])
   
    useEffect(() => {
        if (reverbNode) {
            setReverb(reverbNode);
        }

        return () => {
            if (reverbNode) {
                reverbNode.dispose();
            }

        }
    }, [reverbNode, setReverb])



    return (
        null
    );
};

export default Reverb;