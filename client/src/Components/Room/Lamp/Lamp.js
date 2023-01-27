import './Lamp.css';
const Lamp = () => {
    return (
        <div className="ceiling" id="ceiling">
            <div className="lamp" id="lamp">
                <img src="/images/chandelier.png" alt="" />
                <div className="bulb" id="bulb"> </div>
            </div>
        </div>
    );
}

export default Lamp;