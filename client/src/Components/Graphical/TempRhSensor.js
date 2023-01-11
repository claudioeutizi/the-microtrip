import React from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { IconButton } from "@mui/material";
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';

export default function TempRhSensor(props) {
    return (
        <Card sx={{ maxWidth: 300, maxHeight: 300, boxShadow:3, backgroundColor:'#eeeeee', border:2, borderColor:'#b9b9b9'}} raised='true'>
            <CardContent sx = {{m:3, border:2, borderColor:'#808d6f'}} style = {{backgroundColor: '#a1aa97'}}>
                <Typography sx = {{ fontWeight: 'bold', color:'#20201e', letterSpacing:2}} style = {{'fontFamily': "Seven Segment", 'textAlign':'center'}} gutterBottom variant="h4" component="div">
                    T: {props.temp}°C
                </Typography>
                <Typography sx = {{ fontWeight: 'bold', color:'#20201e', letterSpacing:2}} style = {{'fontFamily': "Seven Segment", 'textAlign':'center'}} gutterBottom variant="h4" component="div">
                    Rh: {props.hum}%
                </Typography>
            </CardContent>
            <CardActions>
            <IconButton sx={{border:1, borderColor: '808d6f', boxShadow:2}} aria-label="measure">
                <ArrowCircleDownIcon />
            </IconButton>
            </CardActions>
        </Card>
    );
}

TempRhSensor.defaultProps = {
    temp : '-',
    hum : '-',
}
