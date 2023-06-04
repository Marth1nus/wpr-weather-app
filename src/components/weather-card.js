import React, { useState, useEffect, Suspense, lazy } from 'react'
import { UNITS_SYMBOLS } from '../enums.mjs'

const Loading = ({ children = 'Loading' }) => (
  <span className='loading'>
    <div />
    {children}
  </span>
)

const ShowError = ({ children }) => (
  <span className='error'>Error: {children}</span>
)

const ObjTable = ({ obj, tableClass = 'obj-table' }) => (
  <table className={tableClass}>
    <tbody>
      {Object.entries(obj).map(([key, value]) => (
        <tr key={key}>
          <td>{key}</td>
          <td>{value}</td>
        </tr>
      ))}
    </tbody>
  </table>
)

const OWMIcon = ({ icon, ...props }) => (
  <img
    src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
    alt={`Weather icon: ${icon}`}
    {...props}
  />
)

function format_unit_function(units) {
  const suffix = UNITS_SYMBOLS[units]
  return (n) => `${n} ${suffix}`
}

const weekdays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]
function DayCard({ dt, main, weather, units }) {
  const date = new Date(dt)
  const { icon, name, description } = weather[0]
  const { temp_min, temp_max } = main
  const format_units = format_unit_function(units)
  return (
    <article className='weather-day-card'>
      <OWMIcon icon={icon} />
      <h3>{weekdays[date.getDay()]}</h3>
      <p>
        {date.getFullYear()}-{date.getMonth()}-{date.getDate()}{' '}
      </p>
      <p>{name}</p>
      <ObjTable
        obj={{
          Min: format_units(temp_min),
          Max: format_units(temp_max),
        }}
      />
      <p>{description}</p>
    </article>
  )
}

function WeatherCard({ zip, units, removeSelf = undefined }) {
  const [Header, setHeader] = useState(<Loading />)
  const [Main, setMain] = useState(<Loading />)

  useEffect(() => {
    build()
  }, [units])

  return (
    <article className='weather-card'>
      {Header}
      {Main}
      {removeSelf ? (
        <footer>
          <button onClick={(event) => removeSelf()}>❌</button>
        </footer>
      ) : (
        ''
      )}
    </article>
  )

  async function build() {
    const format_units = format_unit_function(units)
    const url = (endpoint, suffix = '') =>
      `/api/${endpoint}?zip=${zip}&units=${units}${suffix}`
    let res

    res = await fetch(url('weather'))
    res = await res.json()
    if ('error' in res) {
      setHeader(<ShowError>{res.error}</ShowError>)
    } else {
      const { name, weather, main } = res
      const { icon, description } = weather[0]
      setHeader(
        <header>
          <h1>{name}</h1>
          <OWMIcon icon={icon} />
          <ObjTable
            obj={{
              Currently: format_units(main.temp),
              'Feels Like': format_units(main.feels_like),
              Min: format_units(main.temp_min),
              Max: format_units(main.temp_max),
              Humidity: `${main.humidity} %`,
              Pressure: `${main.pressure} hPa`,
            }}
          />
          <p>{description}</p>
        </header>
      )
    }

    res = await fetch(url('forecast'))
    res = await res.json()
    if ('error' in res) {
      setMain(<ShowError>{res.error}</ShowError>)
    } else {
      setMain(
        <main>
          {res.list.slice(0, 14).map((list) => (
            <DayCard key={list.dt} units={units} {...list} />
          ))}
        </main>
      )
    }
  }
}

export default WeatherCard
