const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/eventos-tech-api')

mongoose.connection.on('connected', () => {
  console.log('Connected in MongoDB')
})

process.on('SINGINT', () => {
  mongoose.connection.close(() => {
    console.log('Disconnected in MongoDB')
    process.exit(0)
  })
})
