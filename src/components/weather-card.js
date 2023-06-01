import React, { useState, useEffect } from 'react'
import './weather-card.css'

function WeatherCard({ area_name = 'Area Name' }) {
  return (
    <article className='weather-card'>
      <header>
        <h1>{area_name}</h1>
      </header>
      <hr />
      <main></main>
      <hr />
      <footer></footer>
    </article>
  )
}

export default WeatherCard
