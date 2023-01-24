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

export default function Instrument() {
    return (
        <div className='instrument'>
            <div id="logo-container">
                <span className="logo">Synth</span>
            </div>
            <Sampler />
            <Adsr></Adsr>
            <Noise></Noise>
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