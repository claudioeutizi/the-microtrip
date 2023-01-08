import React, { useEffect, useState, useRef } from 'react';
import Piano from './Components/Piano/Piano';
import "./Styles/Keyboard.css"
import io from "socket.io-client"
import { Basic } from 'react-dial-knob'
import Thermometer from 'react-thermometer-component'
import TempRhSensor from './Components/Graphical/TempRhSensor';

// fetching the GET route from the Express server which matches the GET route from server.js

function App() {

  var [temperature, setTemperature] = useState({});
  var [humidity, setHumidity] = useState({});
  var [light, setLight] = useState({});
  var [knobValue, setKnobValue] = useState(0);
  
  useEffect(() => {
    const socket = io.connect("http://localhost:9000");
    socket.on("temperature-message", (data) => {
      setTemperature(data);
    })
    socket.on("humidity-message", (data) => {
      setHumidity(data);
    })
    socket.on("light-message", (data) => {
      setLight(data);
    })

    document.addEventListener("notedown", event => {
    })

    document.addEventListener("noteup", event => {
    })
  }, [])


  return (
    <div className = "App">
      <Piano keyCount = {61} keyboardLayout = {"C"}/>
      <Basic diameter={200} min={0} max={100} step={1} value={knobValue}
        theme={{
            donutColor: 'blue'
        }} onValueChange={setKnobValue} ariaLabelledBy={'knob'}>
        <label id={'knob'}>Knob Label</label>
    </Basic>
    <TempRhSensor temp = {Math.round(temperature.value * 10) / 10} hum = {Math.round(humidity.value * 10) / 10}/>
  </div>
  )
}

export default App;