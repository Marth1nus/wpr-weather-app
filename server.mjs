import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import { top_routes } from './routes/top.mjs'
import { api_routes } from './routes/api.mjs'

const { NODE_PORT } = process.env

const app = express()
app.set('view engine', 'ejs')
app.set('views', './views')

app.use(express.static('public'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', top_routes)
app.use('/api', api_routes)

app.get('*', function (req, res) {
  res.status(404).render('404', { message: '' })
})

app.listen(NODE_PORT, (err) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Listening on http://localhost:${NODE_PORT}`)
})
