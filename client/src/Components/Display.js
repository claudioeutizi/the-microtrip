import { Box, Card, CardActions, Switch } from '@mui/material'
import React from 'react'
import "./styles/Display.css"
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Display = ({ externalData, light, temperature, humidity }) => {
    return (
        <Box bgcolor={"#eeeeee"} flex={1}>
            <Card className='device' raised='true'>
                <div className='display'>
                    <div className='top'>
                        <p className="city">
                            {externalData.city}
                        </p>
                        <p className="weather-description">
                            {externalData.weather[0].description}
                        </p>
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
                    {/* <Switch onChange = {(event, toggle) => {props.toggleCurrentPosition(toggle)}} sx={{border:1, borderColor: '#808d6f', boxShadow:2}} 
            aria-label="measure" icon = {<LocationOnIcon />} checkedIcon = {<LocationOnIcon />}>
            <LocationOnIcon />
        </Switch> */}
                </CardActions>
            </Card>
        </Box>
    )
}

export default Display
