import { Box, Card, CardActions, CardContent, Typography, Switch } from '@mui/material'
import moment from 'moment-timezone';
import React from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn';

const LocalWeather = (props) => {
    
  return (
    <Box bgcolor={"#eeeeee"} flex = {1} p = {2}>
    <Card sx={{ boxShadow:3, backgroundColor:'#eeeeee', border:2, borderColor:'#b9b9b9'}} raised='true' flex = '2'>
        <CardContent sx = {{m:1, border:2, borderColor:'#808d6f'}} style = {{backgroundColor: '#a1aa97'}}>
            <Typography sx = {{ fontWeight: 'bold', color:'#20201e' }} style = {{'textAlign':'center'}} gutterBottom variant="h5" component="div">
                City: {props.city}
            </Typography>
            <Typography sx = {{fontWeight: 'bold', color:'#20201e'}} style = {{'textAlign':'center'}} gutterBottom variant = "body" component="div">
                Day: {moment().format('dddd')}
            </Typography>
            <Typography sx = {{fontWeight: 'bold', color:'#20201e'}} style = {{'textAlign':'center'}} gutterBottom variant = "body" component="div">
                Date: {moment().format('LL')}
            </Typography>
            <Typography sx = {{ color:'#20201e'}} style = {{'textAlign':'center'}} gutterBottom variant = "body" component="div">
                Temp: {props.weatherData.main.temp} &deg;C
            </Typography>
            <Typography sx = {{ color:'#20201e'}} style = {{'textAlign':'center'}} gutterBottom variant = "body" component="div">
                Hum: {props.weatherData.main.humidity}%
            </Typography>
            <Typography sx = {{ color:'#20201e'}} style = {{'textAlign':'center'}} gutterBottom variant = "body" component="div">
                Time: {moment().tz(`${props.continent}/${props.city}`).format('HH:mm A')}
            </Typography>
            <Typography sx = {{ color:'#20201e'}} style = {{'textAlign':'center'}} gutterBottom variant = "body" component="div">
                Description: {props.weatherData.weather[0].description}
            </Typography>
        </CardContent>
        <CardActions>
        <Switch onChange = {(event, toggle) => {props.toggleCurrentPosition(toggle)}} sx={{border:1, borderColor: '#808d6f', boxShadow:2}} 
            aria-label="measure" icon = {<LocationOnIcon />} checkedIcon = {<LocationOnIcon />}>
            <LocationOnIcon />
        </Switch>
        </CardActions>
    </Card>
    </Box>
  )
}

export default LocalWeather
