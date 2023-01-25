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
import { useEffect, useState } from 'react';

export default function Instrument({selectedInstrument}) {

    const [sampler, setSampler] = useState(null);

    useEffect(() => {
        if(sampler){
            sampler.toDestination();
        return () => {
            sampler.dispose();
        }
    }
    }, [sampler])

    return (
        <div className='instrument'>
            <div id="logo-container">
                <span className="logo">Synth</span>
            </div>
            <Sampler setSampler = {setSampler} selectedInst = {selectedInstrument} polyphony={7}/>
            <Filter></Filter>
            <Distortion></Distortion>
            <Vibrato></Vibrato>
            <Delay></Delay>
            <Reverb></Reverb>
            <Master></Master>
            <div id="instrument-row-3"></div>
            <div id="instrument-row-4"></div>
        </div>
    );
}