import './WallMap.css';
const WallMap = ({light, setMapOpened}) => {
    return ( 
        <div className="wallmap" style = {{filter: `brightness(${light}%)`}} id="wallmap">
            <img src = "/images/world_map1.png" onClick = {setMapOpened} alt = ""/>
        </div>
     );
}
 
export default WallMap;