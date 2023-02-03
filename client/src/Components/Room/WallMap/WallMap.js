import './WallMap.css';
const WallMap = ({light, setMapOpened}) => {
    console.log(light);
    return ( 
        <div className="wallmap" style = {{filter: `brightness(${light}%)`}} id="wallmap">
            <img src = "/images/world_map1.png" onClick = {setMapOpened} alt = ""/>
        </div>
     );
}
 
export default WallMap;