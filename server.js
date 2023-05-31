const PORT = 3000
const MONGODB_CONNECTION_STRING =
  'mongodb://root:root@172.19.244.92:27017/wpr-weather-app?&authSource=admin'

import mongoose from 'mongoose'
import express from 'express'
import top_routes from './routes/top'
import api_routes from './routes/api'

const user_preferences_schema = new mongoose.Schema({
  name: String,
  areas: [String],
})
const user_preferences = mongoose.model(
  'user-preferences',
  user_preferences_schema
)

const app = express()
app.set('view engine', 'ejs')
app.set('views', './views')
app.use(express.static('public'))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', top_routes)
app.use('/api', api_routes)

async function main() {
  await mongoose.connect(MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  app.listen(PORT)
}
main()
