import { useState, useEffect, useCallback, useMemo } from "react";
import InstrumentComponent from './InstrumentComponent';
import * as Tone from 'tone';



const Filter = ({ HP_ON, LP_ON, LFO_H_ON, depthH, rateH, resonanceH, typeH, LFO_L_ON, depthL, rateL, resonanceL, typeL, setFilterH, setFilterL, highCut, lowCut, rolloff }) => {

    const [filterNodeH, setFilterNodeH] = useState(null);
    const [filterNodeL, setFilterNodeL] = useState(null);
    // let depthLog= Math.Pow(10,depth);
    let LPF, HPF, lfoH, minFreq_LFO_H, maxFreq_LFO_H, scaleExpH, lfoL, minFreq_LFO_L, maxFreq_LFO_L, scaleExpL;

    useState(() => {
        if (HP_ON) {
            console.log("enters the HP")
            HPF = new Tone.Filter({
                rolloff: rolloff,
                type: "highpass",
                Q: resonanceH,
                frequency: lowCut,
            }
            );

            if (LFO_H_ON) {
                minFreq_LFO_H = Math.pow(10, Math.log10(lowCut) - 1 * depthH);
                maxFreq_LFO_H = Math.pow(10, Math.log10(lowCut) + 1 * depthH);
                console.log("depth range HPF", minFreq_LFO_H, maxFreq_LFO_H)
                lfoH = new Tone.LFO(rateH, 0, 1);
                scaleExpH = new Tone.ScaleExp(minFreq_LFO_H, maxFreq_LFO_H, 3);
                lfoH.type = typeH;
                lfoH.chain(scaleExpH, HPF.frequency);
                lfoH.start();
            }
            else if (lfoH) {
                lfoH.disconnect(HPF.frequency);
            }

            setFilterNodeH(HPF);
        }
        if (LP_ON) {
            console.log("enters the LP")
            LPF = new Tone.Filter({
                rolloff: rolloff,
                type: "lowpass",
                Q: resonanceL,
                frequency: highCut,
            }
            );

            if (LFO_L_ON) {
                minFreq_LFO_L = Math.pow(10, Math.log10(highCut) - 1 * depthL);
                maxFreq_LFO_L = Math.pow(10, Math.log10(highCut) + 1 * depthL);
                console.log("depth range LPF", minFreq_LFO_L, maxFreq_LFO_L)
                lfoL = new Tone.LFO(rateL, 0, 1);
                scaleExpL = new Tone.ScaleExp(minFreq_LFO_L, maxFreq_LFO_L, 3);
                lfoL.type = typeL;
                lfoL.chain(scaleExpL, LPF.frequency);
                lfoL.start();
            }
            else if (lfoL) {
                lfoL.disconnect(LPF.frequency);
            }
            setFilterNodeL(LPF);
        }
    }, [HP_ON, LP_ON])
    //GENERATION
    useEffect(() => {
        if (filterNodeH) {
            setFilterH(filterNodeH);
        }
        if (filterNodeL) {
            setFilterL(filterNodeL);
        }

        return () => {
            if (filterNodeH) {
                filterNodeH.dispose();
            }
            if (filterNodeL) {
                filterNodeL.dispose();
            }

        }
    }, [filterNodeH, filterNodeL, setFilterH, setFilterL])





    return (
        null
    );
};

export default Filter;