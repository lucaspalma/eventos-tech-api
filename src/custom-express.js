const cors = require('cors')
const express = require('express')
const app = express()

app.use(cors())

app.use((req, res, next) => {
  console.log(req.url)
  next()
})

require('./routes/events')(app)

app.use((req, res) => {
  res.status(404).json({status: `The requested URL ${req.url} was not found on this server.`})
})

module.exports = app
