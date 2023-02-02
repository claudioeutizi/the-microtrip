import React, { useCallback, useEffect, useRef, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Icon } from 'leaflet';
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import "leaflet/dist/leaflet.css"
import "./Map.css"
import { MAP_TILER } from '../../utility/api';
import cities from '../../utility/cities';
import { Button, IconButton } from '@mui/material';
import { GEO_API_URL, geoApiOptions } from '../../utility/api';
import * as Tone from 'tone';
import CloseIcon from '@mui/icons-material/Close';


const Map = ({ onCityChange, onMapClosing }) => {

    const [position, setPosition] = useState({ lat: 42.092422, lon: 11.795413 });
    const [city, setCity] = useState(null);
    const mapRef = useRef();
    const ZOOM_LEVEL = 3;

    const fetchCityData = useCallback((cityId) => {
        return fetch(`${GEO_API_URL}/cities/${cityId}`, geoApiOptions)
            .then(response => response.json())
            .then(response => {
                const city = response.data;
                return {
                    value: `${city.latitude} ${city.longitude}`,
                    label: `${city.name}, ${city.countryCode}`,
                    timezone: city.timezone,
                }
            })
            .catch(err => console.error(err));
    }, []);

    const handleClick = (cityName, cityId, instId, img) => {
        Tone.start();
        setCity(cityName);
        fetchCityData(cityId).then(cityData => {
            onCityChange(cityData);
        });
        window.dispatchEvent(new CustomEvent("mapbuttonclick",
            {
                detail: {
                    city: cityName,
                    instrument: instId,
                    img: img,
                }
            }))
    }

    return (
        <MapContainer
            className="map"
            center={position}
            zoom={ZOOM_LEVEL}
            scrollWheelZoom={false}
            worldCopyJump={true}
            ref={mapRef}>
            <TileLayer
                attribution={MAP_TILER.maptiler.attribution}
                url={MAP_TILER.maptiler.url}
            />
            {cities.map(city => {
                const popupContent =
                    <div className='popupContent'>
                        <p className = "city-name">{city.name}</p>
                        <Button onClick={() => handleClick(city.name, city.id, city.instId, city.img)}>Move</Button>
                    </div>
                return <Marker key={city.name} position={city.position}
                    icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })}>
                    <Popup>
                        {popupContent}
                    </Popup>
                </Marker>
            })}
            <IconButton onClick={onMapClosing} sx={{
                zIndex: 400,
                position: "absolute",
                top: "10px",
                right: "10px"
            }} aria-label="delete" size="small">
                <CloseIcon fontSize="small" />
            </IconButton>
        </MapContainer>
    )
}

export default Map;
