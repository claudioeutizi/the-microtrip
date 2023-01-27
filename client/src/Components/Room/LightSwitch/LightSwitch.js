import { useState } from 'react';
import './LightSwitch.css';

const LightSwitch = () => {
  const [isOn, setIsOn] = useState(false);

  const handleClick = () => {
    setIsOn(prevIsOn => !prevIsOn);
  }

  return (
    <div className="switch-container" style={{ perspective: '400px' }}>
    <div className={`switch ${isOn ? 'on' : ''}`} onClick={handleClick} />
  </div>
  );
}

export default LightSwitch;
