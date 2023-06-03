import React, { useState, useEffect } from 'react'
import { UNITS_SYMBOLS } from '../enums.mjs'

const loading = (
  <span className='loading'>
    <div />
    Loading
  </span>
)

function format_unit_function(units) {
  const suffix = UNITS_SYMBOLS[units]
  return (n) => `${n} ${suffix}`
}

function DayCard({ temp, weather }) {
  return (
    <div className='weather-day-card'>
      <img src={weather.icon} alt='Icon' />
      <h6>{name}</h6>
      <p>{line}</p>
    </div>
  )
}

function WeatherCard({ zip, units }) {
  const [info, setInfo] = useState(undefined)
  async function fetch_info() {
    const url = `/api/weather?zip=${zip}&units${units}`
    try {
      const res = await fetch(url)
      const json = await res.json()
      setInfo(json)
    } catch (e) {
      console.error(e)
      setInfo({ error: e.message })
    }
  }

  useEffect(() => {
    fetch_info()
  }, [units])

  if (!info) return <div className='weather-card'>{loading}</div>
  if ('error' in info)
    return <div className='weather-card'>|Error: {info.error}!</div>
  const format_units = format_unit_function(units)
  const { weather, forecast } = info

  return (
    <div className='weather-card'>
      <header>
        <h1>{weather.name}</h1>
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        />
        <table>
          <tbody>
            {Object.entries({
              Currently: format_units(weather.main.temp),
              'Feels Like': format_units(weather.main.feels_like),
              Min: format_units(weather.main.temp_min),
              Max: format_units(weather.main.temp_max),
              Humidity: `${weather.main.humidity} %`,
              Pressure: `${weather.main.pressure} hPa`,
            }).map(([key, value]) => (
              <tr key={key}>
                <td>{key}</td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>{weather.weather[0].description}</p>
      </header>
      <main>
        {[
          ...Array(16).fill({
            name: 'Monday',
            icon: 'https://raw.githubusercontent.com/Makin-Things/weather-icons/master/animated/clear-day.svg',
            line: format_units(5),
          }),
        ].map(({ name, icon, line }) => (
          <DayCard name={name} icon={icon} line={line} />
        ))}
      </main>
    </div>
  )
}
export default WeatherCard
