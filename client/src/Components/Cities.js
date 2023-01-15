import React, { useState } from 'react'
import { GEO_API_URL, geoApiOptions } from '../utility/api';
import { AsyncPaginate } from 'react-select-async-paginate'


const Cities = ({ onSearchChange }) => {

    const [search, setSearch] = useState(null);

    const handleOnChange = (searchData) => {
        setSearch(searchData);
        onSearchChange(searchData);
    }

    const loadOptions = async (inputValue) => {
        // var cityDateTime;
        return fetch(`${GEO_API_URL}/cities?limit=3&minPopulation=100000&namePrefix=${inputValue}`, geoApiOptions)
            .then(response => response.json())
            .then(response => {  
                return {
                    options: response.data.map((city) => {
                        // fetch(`${GEO_API_URL}/cities/${city.wikiDataId}/dateTime`, geoApiOptions)
                        // .then(response => response.json())
                        // .then(response => {
                        //     cityDateTime = response.data;
                        // })
                        return {
                            value: `${city.latitude} ${city.longitude}`,
                            label: `${city.name}, ${city.countryCode}`,
                            // dateTime: `${cityDateTime}`,
                        }
                    })
                }
            })
            .catch(err => console.error(err));
    }

  return (
    <AsyncPaginate
        placeholder = "Search for city"
        debounceTimeout = {600}
        value = {search}
        onChange = {handleOnChange}
        loadOptions = {loadOptions}
    />
  )
}

export default Cities;
