import React, { useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import UnitSelector from './components/units-selector'
import WeatherCard from './components/weather-card'
import AddZipcode from './components/add-zipcodes'
import { UNITS } from './enums.mjs'

function Search() {
  return <main></main>
}

function CurrentWeather() {
  return <main></main>
}

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/search'>
          <Search />
        </Route>
        <Route path='/current-weather'>
          <CurrentWeather />
        </Route>
      </Switch>
    </Router>
  )
}

const root = createRoot(document.querySelector('#app'))
root.render(<App />)
