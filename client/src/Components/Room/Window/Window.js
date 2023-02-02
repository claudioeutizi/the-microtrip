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
import Fog from '../Weather/Fog/Fog';
import Mist from '../Weather/Fog/Mist';
import Haze from '../Weather/Fog/Haze';

const Window = ({ city, weather, dayMoment }) => {

    return (
        <div className="window" id="window">
            <img src="/images/window.png" alt="" />
            <div className="outdoor" id="outdoor">

                {/* Clouds */ }

                {weather >= 801
                    && weather <= 804
                    && dayMoment === "day" ? <Clouds></Clouds> : null}

                {weather >= 801
                    && weather <= 804
                    && dayMoment === "night" ? <CloudyNight></CloudyNight> : null}

                {weather >= 801
                    && weather <= 804
                    && dayMoment === "sunrise" ? <CloudsSunrise></CloudsSunrise> : null}

                {weather >= 801
                    && weather <= 804
                    && dayMoment === "sunset" ? <CloudsSunset></CloudsSunset> : null}

                {/* Clean */}

                {weather === 800
                    && dayMoment === "day" ? <Sun></Sun> : null}

                {weather === 800
                    && dayMoment === "night" ? <StarryNight></StarryNight> : null}

                {weather === 800
                    && dayMoment === "sunset" ? <SunSunset></SunSunset> : null}

                {weather === 800
                    && dayMoment === "sunrise" ? <SunSunrise></SunSunrise> : null}

                {/* Snow */}

                {weather >= 600
                    && weather <= 622
                    && (dayMoment === "day" || dayMoment === "sunrise" || dayMoment === "sunset") ? <SnowyDay></SnowyDay> : null}

                {weather >= 600
                    && weather <= 622
                    && dayMoment === "night" ? <SnowyNight></SnowyNight> : null}

                {/* Rain */}

                {weather >= 500
                    && weather <= 531
                    && (dayMoment === "day" || dayMoment === "sunset" || dayMoment === "sunrise") ? <RainyDay></RainyDay> : null}

                {weather >= 500
                    && weather <= 531
                    && dayMoment === "night" ? <RainyNight></RainyNight> : null}

                {/* Fog */}

                {weather === 741
                    && dayMoment === "day" ? <div> <Sun></Sun> <Fog></Fog> </div> : null}

                {weather === 701
                    && dayMoment === "day" ? <div> <Sun></Sun> <Mist></Mist> </div> : null}

                {weather === 721
                    && dayMoment === "day" ? <div> <Sun></Sun> <Haze></Haze> </div> : null}
                    
                {weather === 741
                    && dayMoment === "night" ? <div> <StarryNight></StarryNight> <Fog></Fog> </div> : null}

                {weather === 701
                    && dayMoment === "night" ? <div> <StarryNight></StarryNight> <Mist></Mist> </div> : null}

                {weather === 721
                    && dayMoment === "night" ? <div> <StarryNight></StarryNight> <Haze></Haze> </div> : null}

                {weather === 741
                    && dayMoment === "sunset" ? <div> <SunSunset></SunSunset> <Fog></Fog> </div> : null}

                {weather === 701
                    && dayMoment === "sunset" ? <div> <SunSunset></SunSunset> <Mist></Mist> </div> : null}

                {weather === 721
                    && dayMoment === "sunset" ? <div> <SunSunset></SunSunset> <Haze></Haze> </div> : null}

                {weather === 741
                    && dayMoment === "sunrise" ? <div> <SunSunset></SunSunset> <Fog></Fog> </div> : null}

                {weather === 701
                    && dayMoment === "sunrise" ? <div> <SunSunset></SunSunset> <Mist></Mist> </div> : null}

                {weather === 721
                    && dayMoment === "sunrise" ? <div> <SunSunset></SunSunset> <Haze></Haze> </div> : null}

                {/* {weather >= 700
                    && weather <= 741
                    && dayMoment === "sunrise" ? <div> <SunSunrise></SunSunrise> <Fog></Fog> </div> : null}

                {weather >= 700
                    && weather <= 741
                    && dayMoment === "sunset" ? <div> <SunSunset></SunSunset> <Fog></Fog> </div> : null}

                {weather >= 700
                    && weather <= 741
                    && dayMoment === "sunrise" ? <div> <SunSunrise></SunSunrise> <Fog></Fog> </div> : null}  */}

                <img style={{
                    position: "absolute",
                    bottom: "0%",
                    left: "0%",
                }} src={city} alt=""/>
            </div>
        </div>
    );
}

export default Window;