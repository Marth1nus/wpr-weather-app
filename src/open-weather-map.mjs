import dotenv from 'dotenv'
dotenv.config()

import { UNITS, LANGUAGES, validate_units, validate_lang } from './enums.mjs'
import assert from 'assert'

const { OPENWEATHERMAP_APIKEY } = process.env
const default_units = UNITS.METRIC
const default_language = LANGUAGES.en
const appid = OPENWEATHERMAP_APIKEY

const API_URL = 'https://api.openweathermap.org/'
const API_ENDPOINTS = {
  DATA_URL: `${API_URL}data/2.5/`,
  GEO_URL: `${API_URL}geo/1.0/`,
}
const METHODS = { weather: 'weather', forecast: 'forecast' }
const INTERVALS = { daily: 'daily', hourly: 'hourly', none: '' }

export function build_url(base, title, args) {
  const args_str = Object.entries(args)
    .filter(([_, value]) => value)
    .map(([key, value]) => `${key}=${value}`)
    .join('&')
  return `${base}${title}?${args_str}`
}

export async function endpoint_data({
  method = METHODS.weather,
  interval = INTERVALS.none,
  lat = 0,
  lon = 0,
  q = '',
  id = '',
  zip = '',
  units = default_units,
  lang = default_language,
  cnt = 0,
}) {
  // validate input object
  assert.ok(
    [lat + lon > 0, q, id, zip].filter((v) => v).length === 1,
    `Invalid Selectors:\n\tInput object must contain exactly one of: (lat and lon), q, id, xor zip as selectors in additional to optional parameters\n\tNote lat,lon=0,0 is c considered invalid`
  )
  assert.ok(zip && zip.match(/^[\d\w]+,\w+$/), `Invalid zipcode: ${zip}`)
  assert.ok(
    method in METHODS,
    `Invalid Method: ${method}\nOptions were: ${Object.values(method)}`
  )
  assert.ok(
    interval in INTERVALS || !interval,
    `Invalid interval: ${interval}\nOptions were: ${Object.values(INTERVALS)}`
  )
  lang = validate_lang(lang)
  units = validate_units(units)

  if (method === METHODS.forecast && interval !== INTERVALS.none)
    method = `${method}/${interval}`

  // construct url
  const options = { lat, lon, q, id, zip, appid, units, lang, cnt }
  const url = build_url(API_ENDPOINTS.DATA_URL, method, options)

  // TODO: result caching can be done from here

  // resolve request
  const res = await fetch(url)
  const json = await res.json()
  assert.ok(res.status === 200, json.message)
  return json
}

export async function weather({
  lat = 0,
  lon = 0,
  q = '',
  id = '',
  zip = '',
  units = default_units,
  lang = default_language,
}) {
  return await endpoint_data({
    method: METHODS.weather,
    lat,
    lon,
    q,
    id,
    zip,
    units,
    lang,
  })
}

export async function forecast({
  interval = INTERVALS.none,
  lat = 0,
  lon = 0,
  q = '',
  id = '',
  zip = '',
  units = default_units,
  lang = default_language,
  cnt = 0,
}) {
  return await endpoint_data({
    method: METHODS.forecast,
    interval,
    lat,
    lon,
    q,
    id,
    zip,
    units,
    lang,
    cnt,
  })
}
