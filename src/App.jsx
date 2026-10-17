import { useEffect, useState } from 'react'
import WeatherSearch from './components/WeatherSearch'
import './App.css'

function App() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date())

  useEffect(() => {
    const clock = window.setInterval(() => {
      setCurrentDateTime(new Date())
    }, 1000)

    return () => window.clearInterval(clock)
  }, [])

  const dateText = new Intl.DateTimeFormat('en', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(currentDateTime)

  const timeText = new Intl.DateTimeFormat('en', {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
  }).format(currentDateTime)

  return (
    <div className="app flex min-h-full flex-1 flex-col">
      <header className="site-header flex items-center justify-between">
        <div className="site-brand flex items-center">
          <img
            className="site-logo"
            src="https://openweathermap.org/img/wn/02d.png"
            alt=""
          />
          <span className="site-brand-name">SKYCAST</span>
        </div>
        <div className="date-time">
          <p className="current-date">{dateText}</p>
          <p className="current-time">{timeText}</p>
        </div>
      </header>
      <main className="main-content flex flex-1 justify-center">
        <WeatherSearch />
      </main>
      <footer className="page-footer mt-auto text-center">
        Weather information provided by OpenWeatherMap.
      </footer>
    </div>
  )
}

export default App
