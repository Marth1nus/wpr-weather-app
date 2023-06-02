import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import mongoose from 'mongoose'
import { UNITS, LANGUAGES, LANGUAGE_CODES } from '../src/enums.mjs'
import * as openweathermap from '../src/open-weather-map.mjs'

const { MONGODB_CONNECTION_STRING } = process.env

export const db_connection = mongoose.connect(MONGODB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const preferences_schema = new mongoose.Schema({
  units: {
    type: String,
    enum: Object.values(UNITS),
  },
  cards: [String],
  language: String,
})

const users_schema = new mongoose.Schema({
  authorization_string: String,
  email: {
    type: String,
    required: true,
  },
  display_name: {
    type: String,
    required: true,
  },
  preferences: {
    type: preferences_schema,
    default: {},
  },
})

const users = mongoose.model('users', users_schema)

/// Routes \\\
export const api_routes = express.Router()

// TODO: This is an example only replace with decided api
api_routes.get('/weather/:zip', async function (req, res) {
  try {
    const { zip } = req.params
    res.json(await openweathermap.weather({ zip }))
  } catch (e) {
    res.status(404).render('404', { message: e.message })
  }
})
