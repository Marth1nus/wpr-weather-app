import dotenv from 'dotenv'
dotenv.config()

//console.log(process.env)

import express from 'express'
import { top_routes } from './routes/top.mjs'
import { api_routes, db_connection } from './routes/api.mjs'

const { NODE_PORT } = process.env

const app = express()
app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.static('public'))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', top_routes)
app.use('/api', api_routes)

async function main() {
  await db_connection
  app.listen(NODE_PORT)
}
main()
