import { Box } from '@mui/material'
import { React, useState } from 'react'
import { Basic } from 'react-dial-knob'

const Room = () => {

var [knobValue, setKnobValue] = useState(0);

  return (
    <Box flex = {6} p = {2}>
        <h2>ROOM</h2>
        <Basic diameter={50} min={0} max={100} step={1} value={knobValue}
                theme={{
                    donutColor: 'blue'
                }} onValueChange={setKnobValue} ariaLabelledBy={'knob'}>
                <label id={'knob'}>Knob Label</label>
        </Basic>
    </Box> 
  )
}

export default Room;
