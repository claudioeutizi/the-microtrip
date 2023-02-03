import './Lamp.css';
const Lamp = ({light}) => {
    return (
        <div className="ceiling" id="ceiling">
            <div className="lamp" id="lamp">
                <img src="/images/chandelier.png" style = {{filter: `brightness(${light}%)`}} alt="" />
                <div className="bulb" id="bulb" 
                style = {{filter: `brightness(${light*2}%)`,
                boxShadow: `0 ${light}px ${light}px rgba(255, 210, 0, 0.5), inset ${light}px 0 ${light}px rgba(255, 210, 0, 0.5)`}}> </div>
            </div>
        </div>
    );
}

export default Lamp;