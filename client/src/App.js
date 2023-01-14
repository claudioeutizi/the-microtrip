import React, { useCallback, useEffect, useState } from 'react';
import Piano from './Components/Piano/Piano';
import "./Components/styles/Piano.css"
import "./Components/styles/Footer.css"
import Footer from './Components/Footer';
import Room from './Components/Room';
import Grid from '@mui/material/Unstable_Grid2';
import Display from './Components/Display';
import * as cities from './cities';
import { WEATHER_API_KEY, WEATHER_API_URL } from './utility/api';
import Cities from './Components/Cities';
import { useSocket } from './utility/useSocket';

// fetching the GET route from the Express server which matches the GET route from server.js

function App() {

  //Socket from where to get real-time data from micro:bit
  const socket = useSocket('http://localhost:9000');

  const [currentWeather, setCurrentWeather] = useState(null);
  const [internalHumidity, setInternalHumidity] = useState('-');
  const [internalTemperature, setInternalTemperature] = useState('-');
  const [internalLight, setInternalLight] = useState('-');

  // const toggleCurrentPosition = (toggle) => {
  //   setCurrentPositionAccess(toggle);
  //   console.log(currentPositionAccess)
  // }

  const handleOnSearchChange = async (cityData) => {

    // if(currentPosition){
    //     navigator.geolocation.getCurrentPosition(function(position) {
    //       [lat, lon] = [position.coords.latitude, position.coords.longitude];
    //     });
    //   } else {

    const [lat, lon] = cityData.value.split(" ");
    const weatherFetch = fetch(`${WEATHER_API_URL}/weather/?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`)

    Promise.all([weatherFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        setCurrentWeather({ city: cityData.label, ...weatherResponse });
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {

    const handleTemperatureMessage = (data) => {
      setInternalTemperature(data);
    }

    const handleHumidityMessage = (data) => {
      setInternalHumidity(data);
    }

    const handleLightMessage = (data) => {
      setInternalLight(data);
    }

    /* MESSAGES FROM MICRO:BIT */
    if (socket) {
      socket.on("temperature-message", handleTemperatureMessage);
      socket.on("humidity-message", handleHumidityMessage);
      socket.on("light-message", handleLightMessage);
    }

    return () => {
      if (socket) {
        socket.off("temperature-message", handleTemperatureMessage);
        socket.off("humidity-message", handleHumidityMessage);
        socket.off("light-message", handleLightMessage);
      }
    }
  }, [socket]);

  useEffect(() => {

    const handleNoteUp = (event) => {
      console.log("note up: " + event.detail.note);
    }
  
    const handleNoteDown = (event) => {
      console.log("note down: " + event.detail.note);
    }

    /* MESSAGES FROM PIANO KEYBOARD IN ORDER TO PRODUCE SOUND */
    document.addEventListener("notedown", handleNoteDown);
    document.addEventListener("noteup", handleNoteUp);

    return () => {
      document.removeEventListener('notedown', handleNoteDown);
      document.removeEventListener('noteup', handleNoteUp);

    };

  }, []);


  return (
    <div className="App">
      <Grid container spacing={4}>
        <Grid xs={8}>
          <Cities onSearchChange={handleOnSearchChange} />
        </Grid>
        <Grid xs={8}>
          <Room />
        </Grid>
        <Grid>
          {currentWeather && <Display externalData={currentWeather}
            light={internalLight.value} temperature={internalTemperature.value} humidity={internalHumidity.value} />}
        </Grid>
        <Grid xs={12}>
          <Piano keyCount={61} keyboardLayout={"C"} />
        </Grid>
        <Grid>
          <Footer />
        </Grid>
      </Grid>
    </div>
  )
}

export default App;