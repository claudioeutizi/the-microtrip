import { React } from 'react'
import './Room.css';
import Desk from './Desk/Desk';
import Window from './Window/Window';
import Lamp from './Lamp/Lamp';
import Map from './Map/Map';
import Carpet from './Carpet/Carpet';
import Light from './Light/Light';
import LightSwitch from './LightSwitch/LightSwitch';

const Room = () => {

  return (
    <div className="content">
    <div className="floor">
      <Desk />
      <Carpet />
    </div>
    <div className="wall">
      <Map />
      <Window />
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
