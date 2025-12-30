import { useState, useEffect } from 'react'
import countryService from './service/countries'

function App() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    countryService
      .getAll()
      .then(response => {
        setData(response);
      });
  }, []);

  const filteredCountries = data.filter(country =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  );

  const currentCountry = selectedCountry
    ? data.find(c => c.name.common === selectedCountry)
    : (filteredCountries.length === 1 ? filteredCountries[0] : null);

  useEffect(() => {
    if (currentCountry && currentCountry.latlng) {
      setWeather(null);
      countryService
        .getWeather(currentCountry.latlng[0], currentCountry.latlng[1])
        .then(response => {
          setWeather(response);
        })
        .catch(error => {
          console.error('Error loading weather:', error);
        });
    }
  }, [currentCountry?.name?.common]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setSelectedCountry(null);
  }

  const showCountry = (name) => {
    setSelectedCountry(name);
  }

  const renderOneCountry = () => {
    if (!currentCountry) return null;

    return (
      <>
        {selectedCountry && (
          <button onClick={() => setSelectedCountry(null)}>back</button>
        )}
        <h1>{currentCountry.name.common}</h1>

        {currentCountry.capital && (
          <div>Capital {currentCountry.capital[0]}</div>
        )}

        {currentCountry.area && (
          <div>Area {currentCountry.area}</div>
        )}

        {currentCountry.languages && (
          <>
            <h2>Languages</h2>
            <ul>
              {Object.values(currentCountry.languages).map(lang => (
                <li key={lang}>{lang}</li>
              ))}
            </ul>
          </>
        )}

        {currentCountry.flags && (
          <img
            src={currentCountry.flags.png}
            alt={currentCountry.flags.alt || `Flag of ${currentCountry.name.common}`}
          />
        )}

        {weather && weather.main && weather.name &&
          (
            <>
              <h2>Weather in {currentCountry.capital[0]}</h2>
              <p>Temperature {(weather.main.temp - 273.15).toFixed(1)} Celsius</p>
              <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
              <p>Wind {weather.wind.speed} m/s</p>
            </>
          )}
      </>
    )
  }

  const renderResults = () => {
    if (!filter) return <p>Search countries by name</p>;

    if (selectedCountry || filteredCountries.length === 1) {
      return renderOneCountry();
    }

    if (filteredCountries.length > 10) {
      return <p>Too many matches, specify another filter...</p>;
    }

    return (
      <ul>
        {filteredCountries.map(country => (
          <li key={country.name.common}>
            {country.name.common}{' '}
            <button onClick={() => showCountry(country.name.common)}>
              show
            </button>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <p>
        find countries
        <input
          id='filter'
          disabled={!data.length}
          onChange={handleFilterChange}
          value={filter}
          type='text'
        />
      </p>
      {renderResults()}
    </>
  )
}

export default App