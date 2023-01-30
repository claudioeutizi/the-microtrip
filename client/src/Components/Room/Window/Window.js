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

const Window = ({ city, weather, dayMoment }) => {

    return (
        <div className="window" id="window">
            <img src="/images/window.png" alt="" />
            <div className="outdoor" id="outdoor">

                {/* Clouds */}

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
                <img style={{
                    position: "relative",
                    top: "25%"
                }} src={city} alt="" />
            </div>
        </div>
    );
}

export default Window;