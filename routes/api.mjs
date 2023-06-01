import express from 'express'
import mongoose from 'mongoose'
import assert from 'assert'
import axios from 'axios'
import enums from '../src/enums'

/// Constants \\\

const { OPEN_WEATHER_APIKEY, MONGODB_CONNECTION_STRING } = process.env

/// Database Setup \\\

export const db_connection = mongoose.connect(MONGODB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const preferences_schema = new mongoose.Schema({
  units: {
    type: String,
    enum: Object.values(enums.UNITS),
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

/// Open Weather Setup \\\

function build_url(base, title, args) {
  const args_str = Object.entries(args)
    .filter(([_, value]) => value || value === 0)
    .map(([key, value]) => `${key}=${value}`)
    .join('&')
  return `${base}${title}?${args_str}`
}

function open_weather_one_call_get({
  lat,
  lon,
  units = undefined,
  lang = undefined,
}) {
  // TODO: implement caching for api calls. Consider node-cache.
  // Make sure it supports disk caching since the timeout is around 10 minutes

  const base_url = 'https://api.openweathermap.org/data/3.0/'
  const options = {
    ...{ lat, lon, units, lang },
    ...{
      appid: OPEN_WEATHER_APIKEY,
      exclude: 'current,minutely,hourly,daily,alerts',
    },
  }
  const url = build_url(base_url, 'onecall', options)
  return axios.get(url).json()
}

/// Routes \\\
export const router = express.Router()

router.get('/', function (req, res) {
  res.json(['Api not implemented'])
})
