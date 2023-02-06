import { React, useEffect, useState } from 'react'
import './Room.css';
import Desk from './Desk/Desk';
import Window from './Window/Window';
import Lamp from './Lamp/Lamp';
import WallMap from './WallMap/WallMap';
import Carpet from './Carpet/Carpet';
import moment from 'moment';

const Room = ({ light, onMapClicked, onInstrumentClicked, weatherData, city }) => {
  const [dayMoment, setDayMoment] = useState();
  const [weather, setWeather] = useState();
  const [windowOpen, setWindowOpen] = useState(0);

  useEffect(() => {
    const handleMapButtonClick = () => {
      setWindowOpen(1);
    }

    const handleOnPositionSwitch = (event) => {
      setWindowOpen(!event.detail.data);
    }

    window.addEventListener("mapbuttonclick", handleMapButtonClick);
    window.addEventListener("onpositionswitch", handleOnPositionSwitch);
    return () => {
      window.removeEventListener("onpositionswitch", handleOnPositionSwitch);
      window.removeEventListener("mapbuttonclick", handleMapButtonClick);
    }
  })

  useEffect(() => {
    if (weatherData) {
      let time, sunset, sunrise;
      if (weatherData.timezoneString) {
        time = moment().tz(weatherData.timezoneString.replace(/__/g, '/'));
        sunrise = moment.unix(weatherData.sys.sunrise).tz(weatherData.timezoneString.replace(/__/g, '/'));
        sunset = moment.unix(weatherData.sys.sunset).tz(weatherData.timezoneString.replace(/__/g, '/'));
      }
      else {
        time = moment();
        sunrise = moment.unix(weatherData.sys.sunrise);
        sunset = moment.unix(weatherData.sys.sunset);
      }
      setWeather(weatherData.weather[0].id);

      // console.log("time: ", time.format());
      // console.log("sunrise:", sunrise.format());
      // console.log("sunset: ", sunset.format());

      // console.log("sunset test: ", time.isBetween(sunset.clone().subtract(30, "minutes"), sunset.clone().add(30, 'minutes')));
      // console.log("sunrise test: ", time.isBetween(sunrise.clone().subtract(30, "minutes"), sunrise.clone().add(30, 'minutes')));
      // console.log("day test: ", time.isBetween(sunrise.clone(), sunset.clone()));
      // console.log("night test: ", time.isBetween(sunset.clone().add(30, 'minutes'), sunrise.clone().subtract(30, 'minutes')));

      if (time.isBetween(sunset.clone().subtract(30, "minutes"), sunset.clone().add(30, 'minutes'), "minutes", "[]")) {
        setDayMoment("sunset");
        // console.log("sunset");
      }
      else if (time.isBetween(sunrise.clone().subtract(30, "minutes"), sunrise.clone().subtract(30, 'minutes'), "minutes", "[]")) {
        setDayMoment("sunrise");
        // console.log("sunrise")
      }
      else if (time.isBetween(sunrise.clone().add(30, "minutes"), sunset.clone().subtract(30, 'minutes'), "minutes", "[]")) {
        setDayMoment("day");
        // console.log("day")
      }
      else if (
        time.isBetween(sunset.clone().add(30, "minutes"), sunrise.clone().add(24, 'hours').subtract(30, "minutes"), "minutes", "[]")
        ||
        time.isBetween(sunset.clone().subtract(24, "hours").add(30, "minutes"), sunrise.clone().subtract(30, "minutes"), "minutes", "[]")) {
        setDayMoment("night");
        // console.log("night");
      }

      else console.log("undefined!");
    }
  }, [weatherData])

  return (
    <div className="room">
      <div className = "room-background" style = {{filter: `brightness(${light}%)`}}></div>
      <div className="room-content">
        <div className="floor" style={{ filter: `brightness(${light}%)` }}>
          <Desk setInstrumentOpened={onInstrumentClicked} />
          <Carpet/>
        </div>
        <div className="wall">
          <WallMap light={light} setMapOpened={onMapClicked} />
          <Window windowOpen = {windowOpen} light={light} weather={weather} dayMoment={dayMoment} city={city} />
        </div>
        <div className="illumination">
        <Lamp light = {light}/>
      </div> 
      </div>
    </div>
  )
}

Room.defaultProps = {
  light: 100,
}

export default Room;
