import React, { useEffect, useRef, useState } from 'react'
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import { Icon } from 'leaflet';
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import "leaflet/dist/leaflet.css"
import "./styles/Map.css"
import { MAP_TILER } from '../utility/api';
import cities from '../cities';
import { Button } from '@mui/material';
import { GEO_API_URL, geoApiOptions } from '../utility/api';

const Map = ({ onCityChange }) => {

    const [position, setPosition] = useState({ lat: 42.092422, lon: 11.795413 });
    const [City, setCity] = useState(null);
    const mapRef = useRef();
    const ZOOM_LEVEL = 5;

    const fetchCityData = async (cityName) => {
        console.log(cityName);
        return fetch(`${GEO_API_URL}/cities?limit=1&minPopulation=100000&namePrefix=${cityName}`, geoApiOptions)
            .then(response => response.json())
            .then(response => {
                console.log(response);
                        return {
                            value: `${response.data[0].latitude} ${response.data[0].longitude}`,
                            label: `${response.data[0].name}, ${response.data[0].countryCode}`,
                            // dateTime: `${cityDateTime}`,
                        }
                    })
            .catch(err => console.error(err));
    }

    const handleClick = (cityName) => {
        console.log(cityName);
        setCity(cityName);
        fetchCityData(cityName).then(cityData => {
            onCityChange(cityData);
        });
    }

    return (
        <div className="map">
            <MapContainer
                center={position}
                zoom={ZOOM_LEVEL}
                scrollWheelZoom={false}
                ref={mapRef}>
                <TileLayer
                    attribution={MAP_TILER.maptiler.attribution}
                    url={MAP_TILER.maptiler.url}
                />
                {cities.map(city => {
                    const popupContent =
                        <div className='popupContent'>
                            <p>{city.name}</p>
                            <Button onClick={() => handleClick(city.name)}>Move</Button>
                        </div>
                    return <Marker key={city.name} position={city.position}
                        icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })}>
                        <Popup>
                            {popupContent}
                        </Popup>
                    </Marker>
                })}
            </MapContainer>
        </div>
    )
}

export default Map;
