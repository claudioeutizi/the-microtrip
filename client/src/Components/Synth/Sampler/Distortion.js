import OnOffSwitch from './Controls/OnOffSwitch'
import Knob from './Controls/Knob'
import { useState, useEffect, useCallback, useMemo } from "react";
import * as Tone from 'tone';

const Distortion = ({setDist}) => {


    const [distNode, setDistNode] = useState(null);
    const [distWet, setDistWet] = useState(1);
    const [distAmount, setDistAmount] = useState(0);
    const [DIST_ON, setDIST_ON] = useState(false);

    const createDistortion = useCallback((distAmount, distWet) => {
        return new Tone.Distortion({
            distortion: distAmount,
            wet: distWet
        })
    },[]);

    useEffect(() => {
        if(DIST_ON && !distNode){
            setDistNode(createDistortion(distAmount, distWet));
            setDist(distNode)
        }
        else{
            if(distNode && !DIST_ON){
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

    // useEffect(() => {
    //     const handleOnInternalTemperature = (event) => {
    //         if(DIST_ON && distNode){
    //             console.log("dist exists: modify humidity");
    //             setDistAmount()
    //         } else {
    //             console.log("dist does not exists: creating it and setting with hunidity");
    //             setDistNode(createDistortion());
    //             setDist(distNode);
    //             setDistAmount();
    //             setDIST_ON(1);
    //         }
    //     }
    //     document.addEventListener("oninternaltemperature", handleOnInternalTemperature);
    //     return () => {
    //         document.removeEventListener("oninternaltemperature", handleOnInternalTemperature);
    //     }
    // });

   


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
            setState={setDIST_ON}
            value={DIST_ON}>
                
            </OnOffSwitch>

            <Knob style={{
                gridRow: 2,
                gridColumn: 2
            }}
            min={0} max={1}
            setValue={setDistAmount}
            step={0.05}
            defaultValue={0}
            value = {distAmount}
                id="distortion-amount" diameter={48} parameter={"Amount"}></Knob>

            <Knob style={{
                gridRow: 2,
                gridColumn: 3
            }}
            min={0} max={1}
            setValue={setDistWet}
            step={0.05}
            defaultValue={1}
            value = {distWet}
                id="distortion-wet" diameter={48} parameter={"Wet"}></Knob>
        </div>
    )
}

export default Distortion