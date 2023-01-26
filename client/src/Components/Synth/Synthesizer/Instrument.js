import Sampler from '../Sampler/Sampler';
import Adsr from '../Sampler/Adsr';
import '../Synthesizer.css'
import Noise from '../Sampler/Noise';
import Filter from '../Sampler/Filter';
import Master from '../Sampler/Master';
import Distortion from '../Sampler/Distortion';
import Reverb from '../Sampler/Reverb';
import Vibrato from '../Sampler/Vibrato';
import Delay from '../Sampler/Delay';
import { useCallback, useEffect, useState } from 'react';
import * as Tone from 'tone'


//BUG FIX
//compensare gain distorsione
//Fix filtri che non si staccano tra di loro
//gain node che controlla tutti i sampler
//se mouse entra in nota suonata la interrompe


export default function Instrument({ selectedInstrument }) {


    const [sampler, setSampler] = useState(null);
    const [filterL, setFilterL] = useState(null);
    const [filterH, setFilterH] = useState(null);
    const [dist, setDist] = useState(null);
    const [vibrato, setVibrato] = useState(null);
    const [delay, setDelay] = useState(null);
    const [reverb, setreverb] = useState(null);



    useEffect(() => {
        console.log("chain creation")
        let routingArray = [sampler, filterL, filterH, dist, vibrato, delay, reverb]

        console.log(routingArray)

        if (sampler) {
            sampler.dispose();
            let currentNode;
            let nextNode = Tone.Destination;
            let length = routingArray.length;
            for (let i = length - 1; i >= 0; i--) {
                if (routingArray[i]!==null) {
                    currentNode = routingArray[i].connect(nextNode);
                    nextNode = currentNode;
                }
            }
        }

    }, [sampler, filterL, filterH, dist, vibrato])

    return (
        <div className='instrument'>
            <div id="logo-container">
                <span className="logo">Synth</span>
            </div>
            <Sampler setSampler={setSampler} selectedInst={selectedInstrument} polyphony={7} />
            <Filter setFilterL={setFilterL} rolloff={-24} setFilterH={setFilterH}
                LFO_H_ON={0} rateH={0} typeH={"sine"} depthH={0}
                 typeL={"sine"}  />
            <Distortion setDist={setDist}/>
            <Vibrato setVibrato={setVibrato}/>
            <Delay></Delay>
            <Reverb></Reverb>
            <Master></Master>
            <div id="instrument-row-3"></div>
            <div id="instrument-row-4"></div>
        </div>
    );
}