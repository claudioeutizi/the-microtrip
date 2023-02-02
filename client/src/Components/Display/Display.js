import { Switch } from '@mui/material'
import React, { useEffect, useState } from 'react'
import "./Display.css"
import LocationOnIcon from '@mui/icons-material/LocationOn';
import moment from 'moment-timezone';

const Display = ({ onSwitchChange, externalData, light, temperature, humidity }) => {

    const [zoom, setZoom] = useState(false);
    const [positionSwitch, setPositionSwitch] = useState(false);
    const [currentDateTime, setCurrentDateTime] = useState(
        externalData ? (externalData.timezoneString && !externalData.dateTime ?
            moment().tz(externalData.timezoneString.replace(/__/g, '/')) : moment()) : null);

    const handleOnPositionChange = (event, value) => {
        onSwitchChange(value);
        setPositionSwitch(value);
    }

    const handleOnButtonChange = (event) => {
        setPositionSwitch(false);
        onSwitchChange(false);
    }

    useEffect(() => {
        window.addEventListener('mapbuttonclick', handleOnButtonChange);
        return () => {
            window.removeEventListener('mapbuttonclick', handleOnButtonChange);
        }
    })

    useEffect(() => {
        if (externalData) {
            const intervalId = setInterval(() => {
                if (!positionSwitch)
                    setCurrentDateTime(moment().tz(externalData.timezoneString.replace(/__/g, '/')));
                else setCurrentDateTime(moment());
            }, 1000);
            return () => clearInterval(intervalId);
        }

    }, [externalData, positionSwitch]);


    return (
        <div className={
            zoom ? "device zoom" : "device"}>
            <div className = "display" onClick={() => setZoom(!zoom)}>
                <div className='top'>
                    <p className="city">
                        {externalData.city}
                    </p>
                    <p className="weather-description">
                        {externalData.weather[0].description}
                    </p>
                    {currentDateTime && <p className="date">
                        {currentDateTime.format("MMMM Do YYYY")}
                    </p>}
                    {currentDateTime && <p className="time" style={{ marginTop: 0 }}>
                        {currentDateTime.format("hh:mm:ss A")}
                    </p>}
                </div>
                <div className="data-container">
                    <div className='data external'>
                        <p className='data-label'>External:</p>
                        <p className='data-value external'>{externalData.main.temp}&deg;C</p>
                        <p className="data-value external">{externalData.main.humidity}%</p>
                    </div>
                    <div className='data internal'>
                        <p className='data-label'>Internal:</p>
                        <p className='data-value'>{temperature}&deg;C</p>
                        <p className='data-value'>{humidity}%</p>
                    </div>
                </div>
                <div className='details'>
                    <div className='parameter-row'>
                        <p className='parameter-label top'>External details:</p>
                    </div>
                    <div className='parameter-row'>
                        <p className='parameter-label'>Feels like:</p>
                        <p className="parameter-value">{externalData.main.feels_like}&deg;C</p>
                    </div>
                    <div className='parameter-row'>
                        <p className='parameter-label'>Wind:</p>
                        <p className="parameter-value">{externalData.wind.speed} m/s</p>
                    </div>
                    <div className='parameter-row'>
                        <p className='parameter-label'>Pressure:</p>
                        <p className="parameter-value">{externalData.main.pressure} hPa</p>
                    </div>
                </div>
            </div>
            <div className="display-button" style={{ padding: "5px 2px" }}>
                <Switch size="small" checked = {positionSwitch} defaultValue={false} onChange={handleOnPositionChange}
                    icon={<LocationOnIcon sx={{ width: "80%", aspectRatio: "1/1" }} />} checkedIcon={<LocationOnIcon sx={{ width: "80%", aspectRatio: "1/1" }} />}>
                    <LocationOnIcon size="small" />
                </Switch>
            </div>
        </div>
    )
}

export default Display
