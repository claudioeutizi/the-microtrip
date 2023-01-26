import React, { useEffect, useState } from 'react';
import Piano from './Components/Piano/Piano';
import './App.css'
import Footer from './Components/Footer';
import Display from './Components/Display';
import { WEATHER_API_KEY, WEATHER_API_URL } from './utility/api';
import Map from './Components/Map';
import { useSocket } from './utility/useSocket';
import moment from 'moment';
import Instrument from './Components/Synth/Synthesizer/Instrument';
// fetching the GET route from the Express server which matches the GET route from server.js


function App() {

  //Socket from where to get real-time data from micro:bit
  const socket = useSocket('http://localhost:9000');

  //data from the micro:bit
  const [internalHumidity, setInternalHumidity] = useState('-');
  const [internalTemperature, setInternalTemperature] = useState('-');
  const [internalLight, setInternalLight] = useState('-');

  //city and weather data from the city/current position
  const [currentWeather, setCurrentWeather] = useState(null);
  const [cityData, setCityData] = useState(null);

  //instrument to play
  const [instrument, setInstrument] = useState(0);

  /* =========================================== HANDLERS ============================================== */

  //handles the change of the exact position switch.

  const handleOnPositionSwitchChange = async (switchValue) => {
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


  //handles the change of the exact coordinates and fetches the weather data of the current position
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


  //data acquisition based on the chosen city
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
  }


  useEffect(() => {
    const handleMapButtonClick = (event) => {
      setInstrument(event.detail.instrument)
    }

    // /* MESSAGES FROM PIANO KEYBOARD IN ORDER TO PRODUCE SOUND */
    window.addEventListener("mapbuttonclick", handleMapButtonClick);

    return () => {
      window.removeEventListener("mapbuttonclick", handleMapButtonClick);

    };

  }, [instrument]);


  /* =================================== MICRO:BIT ====================================== */
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

    // MESSAGES FROM MICRO:BIT
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

  return (
    <div className="App">
      <div>
        <Map onCityChange={handleOnSearchChange} />
        {currentWeather && <Display externalData={currentWeather}
          onSwitchChange={handleOnPositionSwitchChange}
          light={internalLight.value} temperature={internalTemperature.value} humidity={internalHumidity.value} />}
      </div>
      <div>
        <Instrument selectedInstrument={instrument}></Instrument>
      </div>
      <div>
        <Piano keyCount={61} keyboardLayout={"C"} />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default App;