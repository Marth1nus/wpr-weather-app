import React, { useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'

import UnitSelector from './components/units-selector'

function App() {
  return (
    <>
      <UnitSelector></UnitSelector>
    </>
  )
}

const root = createRoot(document.querySelector('#app'))
root.render(<App />)
