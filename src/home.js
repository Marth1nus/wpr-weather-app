import React, { useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'

import UnitSelector from './components/units-selector'
import WeatherCard from './components/weather-card'
import { UNITS } from './enums.mjs'

function App() {
  const [units, setUnits] = useState(UNITS.METRIC)
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <UnitSelector units={units} setUnits={setUnits} />
      </div>
      <WeatherCard zip='0001,za' units={units} />
      <WeatherCard zip='0032,za' units={units} />
      <WeatherCard zip='0157,za' units={units} />
    </div>
  )
}

const root = createRoot(document.querySelector('#app'))
root.render(<App />)
