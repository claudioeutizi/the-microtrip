import React, { createContext, useCallback, useEffect, useState } from 'react';
import Piano from './Components/Piano/Piano';
import "./Components/styles/Piano.css"
import "./Components/styles/Footer.css"
import Footer from './Components/Footer';
import Grid from '@mui/material/Unstable_Grid2';
import Display from './Components/Display';
import { WEATHER_API_KEY, WEATHER_API_URL } from './utility/api';
import Map from './Components/Map';
import { useSocket } from './utility/useSocket';
import moment from 'moment';
import Room from './Components/Room';

// fetching the GET route from the Express server which matches the GET route from server.js

function App() {

  //Socket from where to get real-time data from micro:bit
  const socket = useSocket('http://localhost:9000');
  const [currentWeather, setCurrentWeather] = useState(null);
  const [cityData, setCityData] = useState(null);
  const [internalHumidity, setInternalHumidity] = useState('-');
  const [internalTemperature, setInternalTemperature] = useState('-');
  const [internalLight, setInternalLight] = useState('-');

  const handleOnPositionSwitchChange = async (switchValue) => {
    console.log(switchValue)
    if (switchValue) {
      handleOnCoordinatesChange()
    } else {
      try {
        handleOnSearchChange(cityData);
      } catch (error) {
        handleOnCoordinatesChange();
        console.log(error);
      }
    }
  }

  const handleOnCoordinatesChange = async () => {
    try {
      const locationData = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      const [lat, lon] = [locationData.coords.latitude, locationData.coords.longitude];
      const weatherFetch = fetch(`${WEATHER_API_URL}/weather/?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`)
      const dateTime = moment().format();
      Promise.all([weatherFetch])
        .then(async (response) => {
          const weatherResponse = await response[0].json();
          setCurrentWeather({ city: weatherResponse.name, dateTime: dateTime, ...weatherResponse });
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }

  const handleOnSearchChange = async (cityData) => {

    setCityData(cityData);
    const [lat, lon] = cityData.value.split(" ");
    const weatherFetch = fetch(`${WEATHER_API_URL}/weather/?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`)
    Promise.all([weatherFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        setCurrentWeather({ city: cityData.label, ...weatherResponse, timezone: cityData.timezone });
      })
      .catch((err) => console.log(err));
    console.log(currentWeather)
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
      <Grid container direction="row"
        justifyContent="space-between"
        rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item className="room-container" xs={8}>
          <Room></Room>
        </Grid>
        <Grid item className="map-container" xs={8}>
          <Map onCityChange={handleOnSearchChange}></Map>
        </Grid>
        <Grid item className="display-container" xs={4}>
          {currentWeather && <Display externalData={currentWeather} onSwitchChange={handleOnPositionSwitchChange}
            light={internalLight.value} temperature={internalTemperature.value} humidity={internalHumidity.value} />}
        </Grid>
        <Grid item className="piano-keyboard-container" xs={12}>
          <Piano keyCount={61} keyboardLayout={"C"} />
        </Grid>
        <Grid item xs={12} md>
          <Footer />
        </Grid>
      </Grid>
    </div>
  )
}

export default App;