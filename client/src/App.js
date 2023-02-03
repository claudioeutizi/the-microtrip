import React, { useEffect, useRef, useState } from 'react';
import Piano from './Components/Piano/Piano';
import './App.css'
import Footer from './Components/Footer/Footer';
import Display from './Components/Display/Display';
import { WEATHER_API_KEY, WEATHER_API_URL } from './utility/api';
import { useSocket } from './utility/useSocket';
import Instrument from './Components/Synth/Instrument/Instrument';
import { Collapse } from 'react-collapse';
import Room from './Components/Room/Room';
import Map from './Components/Map/Map';
import { CSSTransition } from "react-transition-group";
// fetching the GET route from the Express server which matches the GET route from server.js

function App() {

  function handleInstrumentVisibility() {
    if (synthRef) {
      synthRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }

  const [pianoVisible, setPianoVisible] = useState(true);
  const togglePianoVisibility = () => {
    setPianoVisible(!pianoVisible);
  }

  //Socket from where to get real-time data from micro:bit
  const socket = useSocket('http://localhost:9000');
  const [instrument, setInstrument] = useState(0);
  const [internalHumidity, setInternalHumidity] = useState('-');
  const [internalTemperature, setInternalTemperature] = useState('-');
  const [internalLight, setInternalLight] = useState(0);

  //Weather and city data from current position or chosen city
  const [currentWeather, setCurrentWeather] = useState(null);
  const [cityData, setCityData] = useState(null);
  const [city, setCity] = useState(null);


  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [mapVisible, setMapVisible] = useState(true);

  const synthRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function toggleMapVisibility() {
    setMapVisible(!mapVisible);
  }

  /* ========================================= HANDLERS ========================================== */

  const handleOnPositionSwitchChange = async (switchValue) => {
    if (switchValue) {
      handleOnCoordinatesChange();
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
      Promise.all([weatherFetch])
        .then(async (response) => {
          const weatherResponse = await response[0].json();
          setCurrentWeather({ city: weatherResponse.name, ...weatherResponse });
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }

  const handleOnSearchChange = async (cityData) => {
    setCityData(cityData);
    console.log("city changes");
    const [lat, lon] = cityData.value.split(" ");
    const weatherFetch = fetch(`${WEATHER_API_URL}/weather/?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`)
    Promise.all([weatherFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        setCurrentWeather({ city: cityData.label, ...weatherResponse, timezoneString: cityData.timezone });
      })
      .catch((err) => console.log(err));
  }

  /* MICRO:BIT MESSAGES */

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
    const handleMapButtonClick = (event) => {
      setInstrument(event.detail.instrument);
      setCity(event.detail.img);
    }

    // /* MESSAGES FROM THE MAP IN ORDER TO COMMUNICATE THE CITY */
    window.addEventListener("mapbuttonclick", handleMapButtonClick);

    return () => {
      window.removeEventListener("mapbuttonclick", handleMapButtonClick);
    };

  }, [instrument, city]);

  function mapRange (number, inMin, inMax, outMin, outMax) {
    return (number - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}

  return (
    <div className="App">
      <div className="body">

        <div className="room-container">

          {currentWeather && <Display externalData={currentWeather}
            onSwitchChange={handleOnPositionSwitchChange}
             temperature={internalTemperature.value} humidity={internalHumidity.value} />}

          <Room onInstrumentClicked={handleInstrumentVisibility} onMapClicked={toggleMapVisibility}
            city={city} light={mapRange(internalLight.value, 0, 1023, 0, 100)} weatherData={currentWeather ? currentWeather : null}>
          </Room>

          <CSSTransition in={mapVisible && windowWidth > 650} timeout={300} classNames="visibility-animation" unmountOnExit>
            <div className="visibility-animation-element">
              <Map onCityChange={handleOnSearchChange} onMapClosing={() => setMapVisible(false)} />
            </div>
          </CSSTransition>

        </div>
        <div ref={synthRef} className="synth-container">
          <Instrument selectedInstrument={instrument}></Instrument>
        </div>

      </div>

      <div className="footer-container">
        <button
          className={"piano-toggle"}
          onClick={togglePianoVisibility}>
          <span>Piano Keyboard</span>
        </button>
        <Collapse isOpened={pianoVisible}>
          <Piano keyCount={61} keyboardLayout={"C"} />
        </Collapse>
        <Footer />
      </div>
    </div >
  )
}

export default App;