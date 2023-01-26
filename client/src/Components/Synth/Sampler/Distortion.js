import OnOffSwitch from './Controls/OnOffSwitch'
import Knob from './Controls/Knob'
import { useState, useEffect, useCallback, useMemo } from "react";
import * as Tone from 'tone';

const Distortion = ({setDist}) => {


    const [distNode, setDistNode] = useState(null);
    const [distWet, setDistWet] = useState(1);
    const [distAmount, setDistAmount] = useState(0);
    const [DIST_ON, setDIST_ON] = useState(false);

    useEffect(() => {
        if(DIST_ON){
            console.log("Distortion ON")
            setDistNode(new Tone.Distortion({
                distortion: distAmount,
                wet: distWet
            }))
            setDist(distNode)
        }
        else{
            if(distNode){
            distNode.disconnect();
            setDist(null)
            }
        }
    }, [DIST_ON])

    useEffect(() => {
        if (distNode && DIST_ON) {
            distNode.set({
                distortion: distAmount
            });
            setDist(distNode);
        }
    }, [distAmount])

    useEffect(() => {
        if (distNode && DIST_ON) {
            distNode.set({
                wet: distWet
            });
            setDist(distNode);
        }
    }, [distWet])
   


    return (
        <div id="distortion-container">
            <p style={{
                gridRow: 1,
                gridColumnStart: 1,
                gridColumnEnd: "span 3",
            }}
                className="type">Distortion</p>

            <OnOffSwitch style={{
                gridRow: 2,
                gridColumn: 1
            }} id="distortion-on-off"
            setState={setDIST_ON}>
            </OnOffSwitch>

            <Knob style={{
                gridRow: 2,
                gridColumn: 2
            }}
            min={0} max={1}
            setValue={setDistAmount}
            step={0.05}
            defaultValue={0}
                id="distortion-amount" diameter={48} parameter={"Amount"}></Knob>

            <Knob style={{
                gridRow: 2,
                gridColumn: 3
            }}
            min={0} max={1}
            setValue={setDistWet}
            step={0.05}
            defaultValue={1}
                id="distortion-wet" diameter={48} parameter={"Wet"}></Knob>
        </div>
    )
}

export default Distortion