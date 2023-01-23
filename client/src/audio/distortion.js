import { useState, useEffect, useCallback, useMemo } from "react";
import InstrumentComponent from './InstrumentComponent';
import * as Tone from 'tone';



const Distortion = ({ amount, setDist, wet, DIST_ON}) => {

    const [distNode, setDistNode] = useState(null);
   
    useEffect(() => {
        if(DIST_ON){
            console.log("Distortion ON")
            setDistNode(new Tone.Distortion({
                distortion: amount,
                wet: wet
            }))
            setDist(distNode)
        }
        else{
            setDist(null)
        }
    }, [amount, DIST_ON, wet])
   
    useEffect(() => {
        if (distNode) {
            setDist(distNode);
        }

        return () => {
            if (distNode) {
                distNode.dispose();
            }

        }
    }, [distNode, setDist])



    return (
        null
    );
};

export default Distortion;