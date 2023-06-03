import express from 'express'
import mongoose from 'mongoose'
import { UNITS, LANGUAGES, LANGUAGE_CODES } from '../src/enums.mjs'
import * as openweathermap from '../src/open-weather-map.mjs'

const user = mongoose.model('user', user_schema)

/// Routes \\\
export const api_routes = express.Router()

// TODO: This is an example only replace with decided api
api_routes.get('/weather/:zip', async function (req, res) {
  try {
    const { zip } = req.params
    const { city, country, list } = await openweathermap.weather({ zip })
    res.json({ city, country, forecast: list })
  } catch (e) {
    res.status(404).json({ error: e.message })
  }
})

api_routes.get()
