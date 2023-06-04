import React, { useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'

import UnitSelector from './components/units-selector'
import WeatherCard from './components/weather-card'
import AddZipcode from './components/add-zipcodes'
import { UNITS } from './enums.mjs'

function App() {
  const [units, setUnits] = useState(UNITS.METRIC)
  const [zipcodes, setZipcodes] = useState(['0032,za', '0157,za'])
  return (
    <main>
      <nav>
        <p>WPR Weather</p>
        <AddZipcode addZip={(zip) => setZipcodes([...zipcodes, `${zip},za`])} />
        <UnitSelector units={units} setUnits={setUnits} />
      </nav>
      <main>
        {zipcodes.map((zip) => (
          <WeatherCard
            key={zip}
            zip={zip}
            units={units}
            removeSelf={() => setZipcodes(zipcodes.filter((z) => z !== zip))}
          />
        ))}
      </main>
    </main>
  )
}

const root = createRoot(document.querySelector('#app'))
root.render(<App />)
