import Sampler from '../Sampler/Sampler';
import '../Synthesizer.css'
import Filter from '../Sampler/Filter';
import Master from '../Sampler/Master';
import Distortion from '../Sampler/Distortion';
import Reverb from '../Sampler/Reverb';
import Vibrato from '../Sampler/Vibrato';
import Delay from '../Sampler/Delay';
import { useEffect, useState } from 'react';
import * as Tone from 'tone'


//BUG FIX
//gain node che controlla tutti i sampler
//se mouse entra in nota suonata la interrompe
// curve attack
// pitch wheel
// tastiera a scomparsa
//meter
//limiter o anti clip
//i have a dream:knob del cutoff che si muove con lfo


export default function Instrument({ selectedInstrument }) {


    const [sampler, setSampler] = useState(null);
    const [filterL, setFilterL] = useState(null);
    const [filterH, setFilterH] = useState(null);
    const [dist, setDist] = useState(null);
    const [vibrato, setVibrato] = useState(null);
    const [delay, setDelay] = useState(null);
    const [reverb, setReverb] = useState(null);
    const [master, setMaster] = useState(null)



    useEffect(() => {
        console.log("chain creation")
        let routingArray = [sampler, filterL, filterH, dist, vibrato, delay, reverb, master]

        console.log(routingArray)

        if (sampler) {
            sampler.dispose();
            let currentNode;
            let nextNode = Tone.Destination;
            let length = routingArray.length;
            for (let i = length - 1; i >= 0; i--) {
                if (routingArray[i]!==null) {
                    currentNode = routingArray[i].disconnect();
                    currentNode = routingArray[i].connect(nextNode);
                    nextNode = currentNode;
                }
            }
        }

    }, [sampler, filterL, filterH, dist, vibrato, delay, reverb, master])

    return (
        <div className='instrument'>
            <div id="logo-container">
                <span className="logo">Synth</span>
            </div>
            <Sampler setSampler={setSampler} selectedInst={selectedInstrument} polyphony={10} />
            <Filter setFilterL={setFilterL} rolloff={-24} setFilterH={setFilterH} typeH={"sine"} typeL={"sine"}  />
            <Distortion setDist={setDist}/>
            <Vibrato setVibrato={setVibrato}/>
            <Delay setDelay={setDelay}/>
            <Reverb setReverb={setReverb}/>
            <Master setMaster={setMaster}/>
            <div id="instrument-row-3"></div>
            <div id="instrument-row-4"></div>
        </div>
    );
}