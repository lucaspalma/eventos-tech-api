const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const app = express()

require('./mongodb')

app.use(cors())
app.use(bodyParser.json())

app.use((req, res, next) => {
  console.log(req.url)
  next()
})

require('../model/Event')
require('../route/event')(app)

app.use((req, res) => {
  res.status(404).json({status: `The requested URL ${req.url} was not found on this server.`})
})

module.exports = app
