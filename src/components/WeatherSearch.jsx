import { useState } from 'react'
import axios from 'axios'

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const popularCities = ['Chennai', 'Mumbai', 'Delhi', 'Bengaluru', 'Hyderabad']

function WeatherSearch() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  function searchCity(cityName) {
    if (!cityName) {
      setErrorMessage('Please enter a city name.')
      setWeather(null)
      return
    }

    if (!API_KEY) {
      setErrorMessage('Add your OpenWeatherMap API key to the .env file, then restart the app.')
      setWeather(null)
      return
    }

    setIsLoading(true)
    setErrorMessage('')

    const weatherRequest = axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${API_KEY}&units=metric`,
    )

    weatherRequest
      .then((response) => {
        setWeather(response.data)
      })
      .catch((error) => {
        setWeather(null)

        if (axios.isAxiosError(error) && error.response?.status === 404) {
          setErrorMessage('City not found. Check the spelling and try again.')
        } else if (axios.isAxiosError(error) && error.response?.status === 401) {
          setErrorMessage('The API key is missing or invalid. Check your .env file.')
        } else if (axios.isAxiosError(error) && error.response) {
          setErrorMessage('The weather service could not complete your request. Please try again.')
        } else if (axios.isAxiosError(error) && error.request) {
          setErrorMessage('Could not connect to the weather service. Check your internet connection.')
        } else {
          setErrorMessage('Something went wrong. Please try again.')
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  function handleSearch(event) {
    event.preventDefault()
    searchCity(city.trim())
  }

  function handlePopularCityClick(cityName) {
    setCity(cityName)
    searchCity(cityName)
  }

  const currentCondition = weather?.weather?.[0]

  return (
    <section className="weather-app mx-auto flex w-full flex-col">
      <header className="page-header text-center">
        <p className="app-name">SKYCAST WEATHER</p>
        <h1 id="page-title">Weather report</h1>
        <p className="intro">Search for a city to see its current weather.</p>
      </header>

      <form className="search-form" onSubmit={handleSearch}>
        <label htmlFor="city">City name</label>
        <div className="search-controls">
          <input
            id="city"
            name="city"
            type="text"
            placeholder="For example, Karur"
            value={city}
            onChange={(event) => setCity(event.target.value)}
            autoComplete="off"
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      <div className="popular-cities">
        <p className="popular-cities-title">Popular cities</p>
        <div className="city-buttons">
          {popularCities.map((cityName) => (
            <button
              className="city-button"
              disabled={isLoading}
              key={cityName}
              onClick={() => handlePopularCityClick(cityName)}
              type="button"
            >
              {cityName}
            </button>
          ))}
        </div>
      </div>

      <div aria-live="polite" className="message-area">
        {isLoading && <p className="message">Getting the latest weather...</p>}
        {errorMessage && <p className="message error-message">{errorMessage}</p>}
      </div>

      {weather && currentCondition && (
        <div className="weather-results w-full">
          <div className="weather-heading flex items-center justify-between">
            <div>
              <h2>{weather.name}{weather.sys?.country ? `, ${weather.sys.country}` : ''}</h2>
              <p className="condition">{currentCondition.description}</p>
            </div>
            {currentCondition.icon && (
              <img
                className="weather-icon"
                src={`https://openweathermap.org/img/wn/${currentCondition.icon}@2x.png`}
                alt={currentCondition.description}
              />
            )}
          </div>

          <p className="temperature">{Math.round(weather.main.temp)}°C</p>

          <div className="weather-details">
            <div className="weather-detail-item">
              <p className="weather-detail-label">Feels like</p>
              <p className="weather-detail-value">{Math.round(weather.main.feels_like)}°C</p>
            </div>
            <div className="weather-detail-item">
              <p className="weather-detail-label">Humidity</p>
              <p className="weather-detail-value">{weather.main.humidity}%</p>
            </div>
            <div className="weather-detail-item">
              <p className="weather-detail-label">Wind speed</p>
              <p className="weather-detail-value">{weather.wind.speed} m/s</p>
            </div>
          </div>
        </div>
      )}

    </section>
  )
}

export default WeatherSearch
