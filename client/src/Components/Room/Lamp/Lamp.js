import './Lamp.css';
const Lamp = ({light}) => {
    return (
        <div className="ceiling" id="ceiling">
            <div className="lamp" id="lamp">
                <img src="/images/chandelier.png" style = {{filter: `brightness(${light}%)`}} alt="" />
                <div className="bulb" id="bulb" 
                style = {{filter: `brightness(${light*2}%)`,
                backgroundColor: `rgb(255 210 0 / ${light}%)`,
                boxShadow: `0 270px 1000px 330px rgb(255 210 0 / ${light/3}%)`}}> </div>
            </div>
        </div>
    );
}

export default Lamp;

Lamp.defaultProps = {
    light: 50,
}
