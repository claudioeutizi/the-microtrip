import { React, useEffect, useState } from 'react'
import './Room.css';
import Desk from './Desk/Desk';
import Window from './Window/Window';
import Lamp from './Lamp/Lamp';
import WallMap from './Map/WallMap';
import Carpet from './Carpet/Carpet';
import Light from './Light/Light';
import LightSwitch from './LightSwitch/LightSwitch';
import moment from 'moment';

const Room = ({ onMapClicked, weatherData, city }) => {
  const [dayMoment, setDayMoment] = useState();
  const [weather, setWeather] = useState();

  useEffect(() => {
    if (weatherData) {
      const time = moment().tz(weatherData.timezoneString.replace(/__/g, '/'));
      setWeather(weatherData.weather[0].id);

      const timezone = weatherData.timezone / 3600;

      let sunrise = moment.unix(weatherData.sys.sunrise).format("HH:mm:ss");
      let sunset = moment.unix(weatherData.sys.sunset).format("HH:mm:ss");
      let sunsetTime = moment(sunset, "HH:mm:ss").add(timezone, 'hours');
      let sunriseTime = moment(sunrise, "HH:mm:ss").add(timezone, 'hours');

      console.log(sunsetTime.format("HH:mm:ss"));

      if (time.isBetween(sunsetTime.clone().subtract(30, "minutes"), sunsetTime.clone().add(30, 'minutes')))
        setDayMoment("sunset");
      else if (time.isBetween(sunriseTime.clone().subtract(30, "minutes"), sunriseTime.clone().add(30, 'minutes')))
        setDayMoment("sunrise");
      else if (time.isBetween(sunriseTime.clone().add(30, 'minutes'), sunsetTime.clone().subtract(30, "minutes")))
        setDayMoment("day");
      else if (time.isBetween(sunsetTime.clone().add(30, 'minutes'), sunriseTime.clone().subtract(30, "minutes")))
        setDayMoment("night");
    }
    return () => {}
  }, [weatherData])

  return (
    <div className="room-content">
      <div className="floor">
        <Desk />
        <Carpet />
      </div>
      <div className="wall">
        <WallMap setMapOpened={onMapClicked}/>
        <Window weather={weather} dayMoment={dayMoment} city={city} />
      </div>
      <div className="illumination">
        <Lamp />
        <Light />
        <LightSwitch />
      </div>
    </div>
  )
}

export default Room;
