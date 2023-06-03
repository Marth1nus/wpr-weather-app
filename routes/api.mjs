import express from 'express'
import * as openweathermap from '../src/open-weather-map.mjs'
import assert from 'assert'
import { UNITS } from '../src/enums.mjs'

export const api_routes = express.Router()

api_routes.get('/weather', async function (req, res) {
  try {
    const { zip, units = UNITS.METRIC } = req.query
    assert.ok(zip, 'url args must contain zip')
    const weather = await openweathermap.weather({ zip, units })
    const forecast = await openweathermap.forecast({ zip, units, cnt: 7 })
    res.json({ weather, forecast })
  } catch (e) {
    const status = e.message.match(/not found$/) ? 404 : 500
    res.status(status).json({ error: e.message })
  }
})
