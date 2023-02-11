export const geoApiOptions = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '[YOUR_RAPID_API_HERE]',
		'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
	}
};

export const GEO_API_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo';
export const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5'
export const WEATHER_API_KEY = '[YOUR_OPENWEATHER_API_HERE]'
export const WEATHER_ICON_URL = 'https://openweathermap.org/img/w'
export const MAP_TILER = {
	maptiler: {
		url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
		attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
	}
}