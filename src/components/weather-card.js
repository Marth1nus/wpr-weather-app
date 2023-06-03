import React, { useState, useEffect } from 'react'
import { UNITS_SYMBOLS } from '../enums.mjs'

const loading = (
  <span className='loading'>
    <div />
  </span>
)

function format_unit_function(units) {
  const suffix = UNITS_SYMBOLS[units]
  return (n) => `${n} ${suffix}`
}

function DayCard({ name, icon, line }) {
  return (
    <div className='weather-day-card'>
      <h6>{name}</h6>
      {icon}
      <p>{line}</p>
    </div>
  )
}

function WeatherCard({ zip, units }) {
  const [info, setInfo] = useState(undefined)
  useEffect(function () {
    ;(async function () {
      const url = `/api/weather?zip=${zip}&units${units}`
      try {
        const res = await fetch(url)
        const json = await res.json()
        console.log(json)
        setInfo(json)
      } catch (e) {
        console.error(e)
      }
    })
  }, [])

  if (!info) return <div className='weather-card'>{loading}</div>
  const format_units = format_unit_function(units)
  const { weather, forecast } = info

  const title = {
    title: weather.name,
    icon: (
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
      />
    ),
    description: weather.weather[0].description,
    lines: {
      Currently: format_units(weather.main.temp),
      'Feels Like': format_units(weather.main.feels_like),
      Min: format_units(weather.main.temp_min),
      Max: format_units(weather.main.temp_max),
      Humidity: `${weather.main.humidity} %`,
      Pressure: `${weather.main.pressure} hPa`,
      'Sea level': `${weather.main.sea_level} hPa`,
      'Ground level': `${weather.main.grnd_level} hPa`,
    },
  }

  // TODO: EXAMPLE ONLY
  const day_cards = []
  // [
  //   {
  //     name: 'Monday',
  //     icon: import(''),
  //     line: format_unit(5, units),
  //   },
  // ]

  return (
    <div className='weather-card'>
      <header>
        <h4>{title.title}</h4>
        {title.icon}
        <table>
          {Object.entries(title.lines).map(([key, value]) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{value}</td>
            </tr>
          ))}
        </table>
        <p>{title.description}</p>
      </header>
      <main>
        {day_cards.map(({ name, icon, line }) => (
          <DayCard name={name} icon={icon} line={line} />
        ))}
      </main>
    </div>
  )
}

export default WeatherCard
