const mongoose = require('mongoose')
const DB_URL = process.env.DB_URL
const DB_NAME = process.env.DB_NAME

mongoose.connect(`mongodb://${DB_URL}/${DB_NAME}`)

mongoose.connection.on('connected', () => {
  console.log('Connected in MongoDB')
})

process.on('SINGINT', () => {
  mongoose.connection.close(() => {
    console.log('Disconnected in MongoDB')
    process.exit(0)
  })
})
