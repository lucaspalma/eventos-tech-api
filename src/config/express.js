const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const compression = require('compression')
const app = express()

require('../model/Event')
const event = require('../route/event')

require('./mongodb')

app.use(cors())
app.use(bodyParser.json())
app.use(compression({threshold:1}))

app.use((req, res, next) => {
  console.log(req.url)
  next()
})

app.use('/event', event)

app.use((req, res) => {
  res.status(404).json({status: `The requested URL ${req.url} was not found on this server.`})
})

module.exports = app
