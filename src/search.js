import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  useHistory,
  useLocation,
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom'

import UnitSelector from './components/units-selector'
import WeatherCard from './components/weather-card'
import AddZipcode from './components/add-zipcodes'
import { UNITS } from './enums.mjs'

const root = createRoot(document.querySelector('#app'))
root.render(<App />)

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/'>
          <Search />
        </Route>
        <Route path='/current-weather'>
          <CurrentWeather />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

function Search() {
  const history = useHistory()
  return (
    <main>
      <h1>Get Weather by zipcode</h1>
      <p>enter a valid zipcode and see its weather</p>
      <AddZipcode addZip={goZip} />
    </main>
  )

  function goZip(zip) {
    history.push('/current-weather', { zip: `${zip},za` })
  }
}

function CurrentWeather() {
  const { zip } = useLocation().state
  const [units, setUnits] = useState(UNITS.METRIC)
  return (
    <main>
      <UnitSelector units={units} setUnits={setUnits} />
      <WeatherCard zip={zip} units={units} />
    </main>
  )
}
