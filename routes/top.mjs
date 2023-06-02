import express from 'express'
import { model } from 'mongoose'
export const top_routes = express.Router()

top_routes.get('/', function (req, res) {
  res.render('home')
})
