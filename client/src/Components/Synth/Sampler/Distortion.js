import OnOffSwitch from './Controls/OnOffSwitch'
import Knob from './Controls/Knob'

const Distortion = () => {

    return (
        <div id="distortion-container">
            <p style={{
                gridRow: 1,
                gridColumnStart: 1,
                gridColumnEnd: "span 3",
            }}
                className="type">Distortion</p>

            <OnOffSwitch style={{
                gridRow: 2,
                gridColumn: 1
            }} id="distortion-on-off"></OnOffSwitch>

            <Knob style={{
                gridRow: 2,
                gridColumn: 2
            }}
                id="distortion-amount" diameter={48} parameter={"Amount"}></Knob>

            <Knob style={{
                gridRow: 2,
                gridColumn: 3
            }}
                id="distortion-wet" diameter={48} parameter={"Wet"}></Knob>
        </div>
    )
}

export default Distortion