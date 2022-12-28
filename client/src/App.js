import React, { useEffect, useState } from 'react';
import Piano from './Components/Piano/Piano';
import { Display } from "react-7-segment-display";
import "./Styles/Keyboard.css"
import io from "socket.io-client"

// fetching the GET route from the Express server which matches the GET route from server.js

function App () {

  var [temperature, setTemperature] = useState(-50);
  var [humidity, setHumidity] = useState(-1);
  var [light, setLight] = useState(-1);
  var [connected, setConnected] = useState('');

  const label = { inputProps: { 'aria-label': 'Connected' } };
  
  useEffect(() => {
    const socket = io.connect("http://localhost:9000");
    socket.on("connect", () => {
      setConnected('checked');
    })
  })

  return (
    <div className = "App">
      <Display value = {27} color = "black" count = {3} skew = {7}/>
      <Piano keycount = {61} keyboardlayout = {"C"}/>
    </div>
  )
}

export default App;