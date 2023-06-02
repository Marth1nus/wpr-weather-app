import React, { useState } from 'react'

function UnitsSelector() {
  const [unit, setUnit] = useState('celsius')

  const handleUnitChange = (event) => {
    setUnit(event.target.value)
  }

  return (
    <div>
      <h3>Select Temperature Unit:</h3>
      <label>
        <input
          type='radio'
          value='celsius'
          checked={unit === 'celsius'}
          onChange={handleUnitChange}
        />
        Celsius
      </label>

      <label>
        <input
          type='radio'
          value='fahrenheit'
          checked={unit === 'fahrenheit'}
          onChange={handleUnitChange}
        />
        Fahrenheit
      </label>

      <label>
        <input
          type='radio'
          value='standard'
          checked={unit === 'standard'}
          onChange={handleUnitChange}
        />
        Standard
      </label>

      <p>Selected Unit: {unit}</p>
    </div>
  )
}

export default UnitsSelector
