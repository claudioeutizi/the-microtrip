import { useState, useEffect, useCallback, useMemo } from "react";
import * as Tone from 'tone';
import SamplerEngine from "./Sampler";
import Filter from "./filter"



const InstrumentComponent = ({ selectedInst }) => {
  console.log("instrument")

  // const [filter, setFilter] = useState(null);
  // const [sampler, setSampler] = useState(null);
  //PARAMETERS

  //SAMPLER & ENVELOPE
  let attack = 0.5;
  let decay = 0.3;
  let sustain = 1;
  let release = 0;
  let polyphony = 7;

  //FILTER
  let highCut = 5000;
  let lowCut = 0;
  let rolloff = -24;



  return (
    <>
      <SamplerEngine selectedInst={selectedInst} attack={attack} decay={decay} sustain={sustain} release={release} polyphony={polyphony} />
      <Filter highCut={highCut} lowCut={lowCut} rolloff={rolloff} />
    </>
  )
};

export default InstrumentComponent;