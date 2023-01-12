import React, { useEffect, useState } from 'react';
import Piano from './Components/Piano/Piano';
import "./Styles/Piano.css"
import "./Styles/Footer.css"
import io from "socket.io-client"
import TempRhSensor from './Components/Graphical/TempRhSensor';
import Footer from './Components/Graphical/Footer';
import Room from './Components/Graphical/Room';
import Grid from '@mui/material/Unstable_Grid2';
import LocalWeather from './Components/Graphical/LocalWeather';
import * as cities from './cities';

// fetching the GET route from the Express server which matches the GET route from server.js

function App() {

  const [latitude, setLatitude] = useState([]);
  const [longitude, setLongitude] = useState([]);
  const [currentPositionAccess, setCurrentPositionAccess] = useState(false);
  const [city, setCity] = useState(2);
  const [localWeatherData, setLocalWeatherData] = useState([]);
  const [temperature, setTemperature] = useState({});
  const [humidity, setHumidity] = useState({});
  const [light, setLight] = useState({});

  const toggleCurrentPosition = (toggle) => {
    setCurrentPositionAccess(toggle);
    console.log(currentPositionAccess)
  }
  
  useEffect(() => {

    /* MESSAGES FROM MICRO:BIT */
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

    /* MESSAGES FROM PIANO KEYBOARD IN ORDER TO PRODUCE SOUND */
    document.addEventListener("notedown", event => {
      console.log("note down: "+event.detail.note)
    })

    document.addEventListener("noteup", event => {
      console.log("note up: "+event.detail.note)
    })

  }, []);

  useEffect(() => {
  
    /* MESSAGES FROM WEATHER API: GEOLOCALIZATION AND CITIES */
    const fetchWeatherData = async (currentPosition, cityChoice) => {
      if(currentPosition){
          navigator.geolocation.getCurrentPosition(function(position) {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
          });
        } else {
          setLatitude(cities.default[cityChoice].latitude);
          setLongitude(cities.default[cityChoice].longitude);
        }
        
        (typeof latitude !== 'undefined' && typeof longitude !== 'undefined') ? (await fetch(`${process.env.REACT_APP_API_URL}/weather/?lat=${latitude}&lon=${longitude}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
          .then(res => res.json())
          .then(result => {
            setLocalWeatherData(result);
        })) : (setLocalWeatherData([]))
    }

    fetchWeatherData(currentPositionAccess, city);
  }, [latitude, longitude, currentPositionAccess, city]);


  return (
    <div className = "App">
      <Grid container spacing = {4}>
        <Grid xs={10}>
          <Room/>
        </Grid>
        <Grid>
          {(typeof localWeatherData.main != 'undefined') ? (
            <LocalWeather toggleCurrentPosition = {toggleCurrentPosition} continent = {cities.default[city].continent} 
            city = {(currentPositionAccess === false)?(cities.default[city].name):(localWeatherData.name)} weatherData={localWeatherData}/>
        ): (
          <div></div>
        )}
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