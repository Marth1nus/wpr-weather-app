const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const { top_routes } = require('./routes/top')
const { api_routes, db_connection } = require('./routes/api')

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
