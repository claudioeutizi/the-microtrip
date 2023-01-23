import './Synthesizer.css'
import { Card, CardActions, CardContent, IconButton, Typography } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import VolumeOffIcon from '@mui/icons-material/VolumeOff'

export default function Synthesizer() {

    return (
        <Card className={'synth'}>
            <div className={"screen-container"}>
                <div className={"screen-display"}>
                    <p>Song 1</p>
                    <p>
                        <span>MEAS</span>
                        <span>120</span>
                        <span>Real</span>
                        <span>1</span>
                    </p>
                </div>
                <div className={"screen-buttons"}>
                    <p>Midi Channel</p>
                    <p>Note/Status</p>
                    <p>Velocity</p>
                    <p>Gate Time</p>
                </div>
            </div>
        </Card>
    );
}