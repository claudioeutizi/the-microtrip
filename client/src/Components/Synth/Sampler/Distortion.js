import OnOffSwitch from './Controls/OnOffSwitch'
import Knob from './Controls/Knob'
import { useState, useEffect, useCallback, useMemo } from "react";
import * as Tone from 'tone';

const Distortion = ({ setDist }) => {


    const [distNode, setDistNode] = useState(null);
    const [distWet, setDistWet] = useState(1);
    const [distAmount, setDistAmount] = useState(0);
    const [DIST_ON, setDIST_ON] = useState(false);
    const [temperature, setTemperature] = useState(150);
    const [humidity, setHumidity] = useState(-1);


    const createDistortion = useCallback((distAmount, distWet) => {
        return new Tone.Distortion({
            distortion: distAmount,
            wet: distWet
        })
    }, []);

    useEffect(() => {
        if (DIST_ON) {
            setDistNode(createDistortion(distAmount, distWet));
            setDist(distNode)
        }
        else {
            if (distNode && !DIST_ON) {
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

    useEffect(() => {
        const handleOnInternalTemperature = (event) => {
            setTemperature(event.detail.temperature);
        }

        const handleOnInternalHumidity = (event) => {
            setHumidity(event.detail.humidity);
        }
        document.addEventListener("oninternaltemperature", handleOnInternalTemperature);
        document.addEventListener("oninternalhumidity", handleOnInternalHumidity);
        return () => {
            document.removeEventListener("oninternaltemperature", handleOnInternalTemperature);
            document.addEventListener("oninternalhumidity", handleOnInternalHumidity);
        }
    });


    const mapValues = (value, prevMin, postMin, prevMax, postMax) => {
        return postMin + (value - prevMin) * (postMax - postMin) / (prevMax - prevMin);
    }


    useEffect(() => {
        if (temperature !== 150 && humidity !== -1) {
            let H = Math.log10(0.5 * (0.6 * humidity * Math.pow(10, 0.03 * temperature) - 10));
            
            if (DIST_ON && distNode) {
                setDistAmount(mapValues(temperature, -10, 0, 40, 1).toFixed(2));
                if (H >= -40 && H <= 18) {
                    setDistWet(mapValues(H, -40, 1, 18, 0).toFixed(2));
                }
                else if (H > 18 && H <= 27) {
                    setDistWet(0);
                }
                else if (H > 27 && H <= 50) {
                    setDistWet(mapValues(H, 27, 0, 50, 1).toFixed(2));
                }
                else setDistWet(1);
            }
            else {
                setDistNode(createDistortion(distAmount, distWet));
                setDist(distNode);
                setDistAmount(mapValues(temperature, -10, 0, 40, 1).toFixed(2));
                if (H >= -40 && H <= 18) {
                    setDistWet(mapValues(H, -40, 1, 18, 0).toFixed(2));
                }
                else if (H > 18 && H <= 27) {
                    setDistWet(0);
                }
                else if (H > 27 && H <= 50) {
                    setDistWet(mapValues(H, 27, 0, 50, 1).toFixed(2));
                }
                else setDistWet(1);
                setDIST_ON(1);
            }
        }

    }, [temperature, humidity]);




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
                value={distAmount}
                id="distortion-amount" diameter={48} parameter={"Amount"}></Knob>

            <Knob style={{
                gridRow: 2,
                gridColumn: 3
            }}
                min={0} max={1}
                setValue={setDistWet}
                step={0.05}
                defaultValue={1}
                value={distWet}
                id="distortion-wet" diameter={48} parameter={"Wet"}></Knob>
        </div>
    )
}

export default Distortion