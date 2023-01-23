import { useState, useEffect, useCallback, useMemo } from "react";
import * as Tone from 'tone';
import SamplerEngine from "./Sampler";
import Filter from "./filter"
import Distortion from "./distortion"
import Reverb from "./reverb"
import Delay from "./delay"
import Vibrato from "./vibrato"


const InstrumentComponent = ({ selectedInst }) => {
  console.log("instrument")
  const [DELAY_ON, setDelayOn] = useState(false)
  const [DIST_ON, setDistOn] = useState(false)
  const [sampler, setSampler] = useState(null);
  const [filterH, setFilterH] = useState(null);
  const [filterL, setFilterL] = useState(null);
  const [dist, setDist] = useState(null);
  const [reverb, setReverb] = useState(null);
  const [delay, setDelay] = useState(null);
  const [vibrato, setVibrato] = useState(null);
  //PARAMETERS

  //SAMPLER & ENVELOPE (aggiungere curva?)
  let attack = 0.001;
  let decay = 0.3;
  let sustain = 1;
  let release = 0;        //problema interazione release
  let polyphony = 7;
  let samplerGain = 0;

  //Noise
  let NOISE_ON = 0;
  let noiseType = "white"
  let fadeIn = 0;
  let fadeOut = 0;
  let noiseGain = -20;

  //FILTER
  let highCut = 4000;
  let lowCut = 2000;
  let rolloff = -24;   //-12, -24, -48, -96
  let HP_ON = 0;
  let LP_ON = 0;
  let resonanceL = 4;
  let resonanceH = 2;

  //LFO
  let LFO_H_ON = 0;
  let rateH = 7;
  let lfoTypeH = "sine";
  let depthH = 0;
  //aggiungere offset

  let LFO_L_ON = 0;
  let rateL = 5;
  let lfoTypeL = "sine";
  let depthL = 0.25;


  //EFFECTS

  //Dist
  // let DIST_ON = 0;
  let distAmount = 1;
  let distWet = 1;
  //Reverb
  let REVERB_ON = 0;
  let revDecay = 2;
  let preDelay = 0.2;
  let revWet = 1;
  //Delay
  // let DELAY_ON=0;
  let feedback = 0.5;
  let delayTime = 0.2;
  let delayWet = 0.5;
  //Vibrato
  let VIBRATO_ON = 0;
  let vibratoDepth = 1;
  let vibratoRate = 10;
  let vibratoWet = 1;
  

  useEffect(() => {
      
      let routingArray=[sampler, filterH, filterL, dist, vibrato, delay, reverb]

      console.log(DELAY_ON)
      console.log(routingArray)

      if(sampler){
  
        let currentNode;
        let nextNode = Tone.Destination;
        let length = routingArray.length;
        for (let i = length-1; i >= 0; i--) {
          if (routingArray[i]!==null) {
            currentNode = routingArray[i].connect(nextNode);
            nextNode = currentNode;
          }
        }
      }
 
    

  }, [sampler, DIST_ON, VIBRATO_ON, DELAY_ON, REVERB_ON, HP_ON, LP_ON])

  return (

    <div>
      <button onClick={() => setDelayOn(!DELAY_ON)}>Toggle delay</button>
      <button onClick={() => setDistOn(!DIST_ON)}>Toggle dist</button>
      <SamplerEngine setSampler={setSampler} selectedInst={selectedInst} attack={attack} decay={decay} sustain={sustain} release={release} polyphony={polyphony}
        type={noiseType} fadeIn={fadeIn} fadeOut={fadeOut} gain={noiseGain} samplerGain={samplerGain} NOISE_ON={NOISE_ON} />
      <Filter LP_ON={LP_ON} HP_ON={HP_ON} setFilterH={setFilterH} setFilterL={setFilterL} highCut={highCut} lowCut={lowCut} rolloff={rolloff}
        LFO_H_ON={LFO_H_ON} rateH={rateH} resonanceH={resonanceH} typeH={lfoTypeH} depthH={depthH}
        LFO_L_ON={LFO_L_ON} rateL={rateL} resonanceL={resonanceL} typeL={lfoTypeL} depthL={depthL} />
      <Distortion setDist={setDist} amount={distAmount} DIST_ON={DIST_ON} wet={distWet} />
      <Reverb REVERB_ON={REVERB_ON} decay={revDecay} preDelay={preDelay} wet={revWet} setReverb={setReverb} />
      <Delay DELAY_ON={DELAY_ON} wet={delayWet} delayTime={delayTime} feedback={feedback} setDelay={setDelay} />
      <Vibrato VIBRATO_ON={VIBRATO_ON} wet={vibratoWet} depth={vibratoDepth} rate={vibratoRate} setVibrato={setVibrato} />
    </div>
  )
};

export default InstrumentComponent;