import { Box } from '@mui/material'
import { React, useState } from 'react'
import { Basic } from 'react-dial-knob'
import { WebAudioKnob } from 'webaudio-controls-react-typescript'
import aqua from "client\\src\\Components\\images\\Carbon.png";
const Room = () => {

  return (
    <Box flex = {6} p = {2}>
        <h2>ROOM</h2>
        <WebAudioKnob src={"client\\src\\Components\\images\\Carbon.png"} sprites={60} />;
        <img src={""} alt="Aqua"/>
    </Box> 
  )
}

export default Room;
