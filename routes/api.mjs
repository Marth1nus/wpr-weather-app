import express from 'express'
import * as openweathermap from '../src/open-weather-map.mjs'
import assert from 'assert'
import { UNITS } from '../src/enums.mjs'

export const api_routes = express.Router()

const openweathermap_get = (endpoint) =>
  async function (req, res) {
    try {
      const { zip, cnt = 7, ...options } = req.query
      assert.ok(zip, 'url args must contain zip={zipcode}')
      res.json(await endpoint({ zip, cnt, ...options }))
    } catch (e) {
      const status = e.message.match(/not found/) ? 404 : 500
      res.status(status).json({ error: e.message })
    }
  }

api_routes.get('/weather', openweathermap_get(openweathermap.weather))
api_routes.get('/forecast', openweathermap_get(openweathermap.forecast))
