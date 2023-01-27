import './Light.css';
import React, { useEffect, useRef, useState } from 'react';
const Light = () => {
    const svgRef = useRef(null);
    const rectRef = useRef(null);
    const [lightX, setLightX] = useState();
    const [lightY, setLightY] = useState();

    useEffect(() => {
            const bulbNode = document.getElementById("bulb");
            const { left, top, width, height } = bulbNode.getBoundingClientRect();
            const centerX = left + width / 2;
            const centerY = top + height / 2;
            setLightX(centerX);
            setLightY(centerY);
    },[])

    useEffect(() => {
        const handleResize = () => {
            const bulbNode = document.getElementById("bulb");
            const { left, top, width, height } = bulbNode.getBoundingClientRect()
            const centerX = left + width / 2;
            const centerY = top + height / 2;

            setLightX(centerX);
            setLightY(centerY);
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);


    return (
        <svg ref={svgRef} version="1.1" xmlns="http://www.w3.org/2000/svg" id="layer">
            <defs>
                <filter id="spotlight">
                    <feGaussianBlur stdDeviation="3" result="blur3" />
                    <feSpecularLighting result="spec3" in="blur3" specularConstant="2" specularExponent="-2" lightingColor="yellow">
                        <feSpotLight x={lightX} y = {lightY} z="0" limitingConeAngle="60" pointsAtX="500" pointsAtY="4000" pointsAtZ="0" />
                    </feSpecularLighting>
                </filter>
            </defs>
            <rect id="rectangle" ref={rectRef} />
        </svg>
    );
}

export default Light;
