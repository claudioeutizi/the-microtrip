// import Clouds from './Clouds';
// import Rain from './Rain';
// import Snow from './Snow';
// import Sun from './Sun';
import SunSunrise from '../Weather/Sun/SunSunrise';
import SunSunset from '../Weather/Sun/SunSunset';
import CloudsSunrise from '../Weather/Clouds/CloudsSunrise';
import CloudsSunset from '../Weather/Clouds/CloudsSunset';
import StarryNight from '../Weather/StarryNight/StarryNight';
import CloudyNight from '../Weather/Clouds/CloudyNight';
import RainyDay from '../Weather/RainyDay/RainyDay';
import RainyNight from '../Weather/RainyNight/RainyNight';
import SnowyDay from '../Weather/Snowy/SnowyDay';
import SnowyNight from '../Weather/Snowy/SnowyNight';
import Sun from '../Weather/Sun/Sun'
import Clouds from '../Weather/Clouds/Clouds'

import './Window.css';
const Background = () => {
    return ( 
        <div className = "window" id = "window">
            <img src = "/images/window.png" alt="" />
            <div className = "outdoor" id = "outdoor">
                {/* <Clouds></Clouds> */}
                {/* <Sun></Sun> */}
                {/* <SunSunrise></SunSunrise> */}
                {/* <SunSunset></SunSunset> */}
                {/* <CloudsSunrise></CloudsSunrise> */}
                {/* <CloudsSunset></CloudsSunset> */}
                {/* <StarryNight></StarryNight> */}
                {/* <CloudyNight></CloudyNight> */}
                {/* <RainyDay></RainyDay> */}
                {/* <RainyNight></RainyNight> */}
                {/* <SnowyDay></SnowyDay> */}
                {/* <SnowyNight></SnowyNight> */}
                <img src="/images/cairo.png" alt="" />
            </div>
        </div>
    );
}
 
export default Background;