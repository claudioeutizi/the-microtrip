import { useState, useEffect, useCallback, useMemo } from "react";
import InstrumentComponent from './InstrumentComponent';
import * as Tone from 'tone';

const Filter = ({highCut, lowCut, rolloff}) => {
   console.log("filter")
//    const HPF=new Tone.Filter(lowCut,"highpass",rolloff)

   const LPF=new Tone.Filter(highCut,"lowpass",rolloff)

   
   
   
  
  
  
    return (
            null
      );
  };
  
  export default Filter;