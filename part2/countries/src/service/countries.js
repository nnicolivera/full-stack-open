import axios from 'axios';
const countryURL = 'https://studies.cs.helsinki.fi/restcountries/';
const weatherURL = 'https://api.openweathermap.org/data/2.5/weather?';
const api_key = import.meta.env.VITE_SOME_KEY;

const getAll = () => {
    const request = axios.get(`${countryURL}/api/all`);
    return request.then(response => response.data);
}

const get = (name) => {
    const request = axios.get(`${countryURL}/api/name/${name}`);
    return request.then(response => response.data);
}

const getWeather = (lat, lon) => {
    const request = axios.get(`${weatherURL}lat=${lat}&lon=${lon}&appid=${api_key}`);
    return request.then(response => response.data);
}

export default { getAll, get, getWeather };