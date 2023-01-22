import { useState, useEffect, useCallback, useMemo } from "react";
import * as Tone from 'tone';
import SamplerEngine from "./Sampler";
import Filter from "./filter"




const InstrumentComponent = ({ selectedInst }) => {
  console.log("instrument")
  const [sampler, setSampler] = useState(null);
  const [filterH, setFilterH] = useState(null);
  const [filterL, setFilterL] = useState(null);

  //PARAMETERS

  //SAMPLER & ENVELOPE (aggiungere curva?)
  let attack = 0.01;
  let decay = 0.3;
  let sustain = 1;
  let release = 0;
  let polyphony = 7;

  //FILTER
  let highCut =4000;
  let lowCut = 500;
  let rolloff = -24;   //-12, -24, -48, -96
  let HP_ON = 0;
  let LP_ON = 0;
  //LFO
  let LFO_H_ON = 0;
  let rateH=7;
  let lfoTypeH="sine";
  let depthH=0.25;
  let resonanceH=2;

  let LFO_L_ON = 0;
  let rateL=5;
  let lfoTypeL="sine";
  let depthL=0.25;
  let resonanceL=4;



//COLLEGAMENTI INGUARDABILI PENSARE MODO PIU' INTELLIGENTE
  useEffect(() => {
    if(sampler){
      if (LP_ON && HP_ON) {
        console.log("sampler&both")
        sampler.chain(filterL, filterH, Tone.Destination);
      }
      else if (HP_ON) {
        console.log("sampler& HPfilter")
        sampler.chain(filterH, Tone.Destination);
      }
      else if (LP_ON) {
        console.log("sampler& LP filter")
        sampler.chain(filterL, Tone.Destination);
      }
      else{
        console.log("sampler only")
        sampler.chain(Tone.Destination);
      }
    }


  
    
  }, [sampler, filterH, filterL, HP_ON, LP_ON])

  return (
    
    <div>
      {/* <button onClick={() => setHPFSTATE(1)}>Toggle HPF</button> */}
      <SamplerEngine setSampler={setSampler} selectedInst={selectedInst} attack={attack} decay={decay} sustain={sustain} release={release} polyphony={polyphony} />
      <Filter LP_ON={LP_ON} HP_ON={HP_ON} setFilterH={setFilterH} setFilterL={setFilterL} highCut={highCut} lowCut={lowCut} rolloff={rolloff} 
      LFO_H_ON={LFO_H_ON} rateH={rateH} resonanceH={resonanceH} typeH={lfoTypeH} depthH={depthH}
      LFO_L_ON={LFO_L_ON} rateL={rateL} resonanceL={resonanceL} typeL={lfoTypeL} depthL={depthL}/>
    </div>        
  ) 
};

export default InstrumentComponent;