import React, { useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'

function App() {
  return (
    <>
      <h1>hello</h1>
    </>
  )
}

const root = createRoot(document.querySelector('#app'))
root.render(<App />)
