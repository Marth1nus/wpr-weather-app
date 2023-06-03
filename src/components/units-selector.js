import React, { useState } from 'react'
import { UNITS } from '../enums.mjs'
const units_values = Object.values(UNITS)

function UnitsSelector({ units, setUnits }) {
  return (
    <div className='units-selector'>
      <label>Units:</label>
      {units_values.map((value) => (
        <button
          key={value}
          onClick={(e) => setUnits(value)}
          className={units === value ? 'selected' : 'deselected'}
        >
          {value}
        </button>
      ))}
    </div>
  )
}

export default UnitsSelector
