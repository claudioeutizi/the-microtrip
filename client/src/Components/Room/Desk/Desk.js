import './Desk.css';
const Desk = ({setInstrumentOpened}) => {
    return ( 
            <div className = "desk" id = "desk">
                <img src = "/images/studio.PNG" alt = ""/>
                <div className = "synth" id = "synth">
                <img src = "/images/synth.png" onClick = {setInstrumentOpened} alt = ""/>
                </div>
            </div>
     );
}
 
export default Desk;