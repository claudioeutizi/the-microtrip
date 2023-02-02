import { React, useEffect, useState } from 'react'
import './Room.css';
import Desk from './Desk/Desk';
import Window from './Window/Window';
import Lamp from './Lamp/Lamp';
import WallMap from './WallMap/WallMap';
import Carpet from './Carpet/Carpet';
import Light from './Light/Light';
import LightSwitch from './LightSwitch/LightSwitch';
import moment from 'moment';
import SunCalc from 'suncalc'

const Room = ({ onMapClicked, onInstrumentClicked, weatherData, city }) => {
  const [dayMoment, setDayMoment] = useState();
  const [weather, setWeather] = useState();

  useEffect(() => {
    if (weatherData) {
      const time = moment().tz(weatherData.timezoneString.replace(/__/g, '/'));
      setWeather(weatherData.weather[0].id);
      const sunrise = moment.unix(weatherData.sys.sunrise).tz(weatherData.timezoneString.replace(/__/g, '/'));
      const sunset = moment.unix(weatherData.sys.sunset).tz(weatherData.timezoneString.replace(/__/g, '/'));

      console.log("time: ", time.format());
      console.log("sunrise:", sunrise.format());
      console.log("sunset: ", sunset.format());

      console.log("sunset test: ",time.isBetween(sunset.clone().subtract(30, "minutes"), sunset.clone().add(30, 'minutes')));
      console.log("sunrise test: ",time.isBetween(sunrise.clone().subtract(30, "minutes"), sunrise.clone().add(30, 'minutes')));
      console.log("day test: ", time.isBetween(sunrise.clone(), sunset.clone()));
      console.log("night test: ", time.isBetween(sunset.clone().add(30, 'minutes'), sunrise.clone().subtract(30, 'minutes')));

      if (time.isBetween(sunset.clone().subtract(30, "minutes"), sunset.clone().add(30, 'minutes'), "minutes", "[]")) {
        setDayMoment("sunset");
        console.log("sunset");
      }
      else if (time.isBetween(sunrise.clone().subtract(30, "minutes"), sunrise.clone().subtract(30, 'minutes'), "minutes", "[]")) {
        setDayMoment("sunrise");
        console.log("sunrise")
      }
      else if (time.isBetween(sunrise.clone().add(30, "minutes"), sunset.clone().subtract(30, 'minutes'), "minutes", "[]")) {
        setDayMoment("day");
        console.log("day")
      }
      else if (
        time.isBetween(sunset.clone().add(30, "minutes"), sunrise.clone().add(24, 'hours').subtract(30, "minutes"), "minutes", "[]")
        || 
        time.isBetween(sunset.clone().subtract(24, "hours").add(30, "minutes"), sunrise.clone().subtract(30, "minutes"), "minutes", "[]")) {
        setDayMoment("night");
        console.log("night");
      }

      else console.log("undefined!");
    }
  }, [weatherData])

  return (
    <div className="room-content">
      <div className="floor">
        <Desk setInstrumentOpened = {onInstrumentClicked} />
        <Carpet />
      </div>
      <div className="wall">
        <WallMap setMapOpened={onMapClicked}/>
        <Window weather={weather} dayMoment={dayMoment} city={city} />
      </div>
      {/* <div className="illumination">
        <Lamp />
        <Light />
        <LightSwitch />
      </div> */}
    </div>
  )
}

export default Room;
