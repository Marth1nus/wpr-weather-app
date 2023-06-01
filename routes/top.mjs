import express from 'express'
import { model } from 'mongoose'
export const router = express.Router()

router.get('/', function (req, res) {
  res.render('home')
})
