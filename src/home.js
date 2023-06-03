import React, { useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'

import UnitSelector from './components/units-selector'
import WeatherCard from './components/weather-card'

function App() {
  return (
    <div>
      <UnitSelector />
      <WeatherCard />
      <WeatherCard />
      <WeatherCard />
    </div>
  )
}

const root = createRoot(document.querySelector('#app'))
root.render(<App />)
