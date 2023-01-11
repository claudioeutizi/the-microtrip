import React, { useEffect, useState } from 'react';
import Piano from './Components/Piano/Piano';
import "./Styles/Piano.css"
import "./Styles/Footer.css"
import io from "socket.io-client"
import { Basic } from 'react-dial-knob'
import TempRhSensor from './Components/Graphical/TempRhSensor';
import Footer from './Components/Graphical/Footer';
import Room from './Components/Graphical/Room';
import Grid from '@mui/material/Unstable_Grid2';

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
      console.log("note down: "+event.detail.note)
    })

    document.addEventListener("noteup", event => {
      console.log("note up: "+event.detail.note)
    })
  }, [])


  return (
    <div className = "App">
      <Grid container spacing = {2}>
        <Grid xs={10}>
          <Room />
        </Grid>
        <Grid xs = {2}>
          <TempRhSensor light = {light.value} 
          temp = {Math.round(temperature.value * 10) / 10}
           hum = {Math.round(humidity.value * 10) / 10}/>
        </Grid>
        <Grid xs = {12}>
          <Piano keyCount = {61} keyboardLayout = {"C"}/>
        </Grid>
        <Grid>
          <Footer/>
        </Grid>
      </Grid>

      
  </div>
  )
}

export default App;