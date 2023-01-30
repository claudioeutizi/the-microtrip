import './WallMap.css';
const WallMap = ({setMapOpened}) => {
    return ( 
        <div className="wallmap" id="wallmap">
            <img src = "/images/world_map1.png" onClick = {setMapOpened} alt = ""/>
        </div>
     );
}
 
export default WallMap;