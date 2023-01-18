import { Box, Card, CardActions, Switch } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import "./styles/Display.css"
import LocationOnIcon from '@mui/icons-material/LocationOn';
import moment from 'moment-timezone';

const Display = ({ onSwitchChange, externalData, light, temperature, humidity }) => {

    const [positionSwitch, setPositionSwitch] = useState(false);
    const [currentDateTime, setCurrentDateTime] = useState(
        externalData ? (externalData.timezone && !externalData.dateTime ?
             moment().tz(externalData.timezone.replace(/__/g, '/')).format("MMMM Do YYYY, h:mm:ss A"): externalData.dateTime): null);


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
                if(!positionSwitch)
                    setCurrentDateTime(moment().tz(externalData.timezone.replace(/__/g, '/')).format("MMMM Do YYYY, h:mm:ss A"));
                else setCurrentDateTime(moment().format("MMMM Do YYYY, h:mm:ss A"));
            }, 1000);
            return () => clearInterval(intervalId);
        }

    }, [externalData, positionSwitch]);


    return (
            <Card className='device' raised={true}>
                <div className='display'>
                    <div className='top'>
                        <p className="city">
                            {externalData.city}
                        </p>
                        <p className="weather-description">
                            {externalData.weather[0].description}
                        </p>
                        {currentDateTime && <p className="date-time">
                            {currentDateTime}
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
                <CardActions>
                    <Switch defaultValue={false} onChange = {handleOnPositionChange} icon={<LocationOnIcon/>} checkedIcon={<LocationOnIcon />}>
                        <LocationOnIcon />
                    </Switch>
                </CardActions>
            </Card>
    )
}

export default Display
