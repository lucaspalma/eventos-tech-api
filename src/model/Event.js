const mongoose = require('mongoose')

const eventSchema = mongoose.Schema({
  name: {type: String, required: true},
  logo: {type: String, required: true},
  description: {type: String, required: true},
  firstDay: {type: Date, required: true},
  dates: {type: [Date], required: true},
  site: {type: String, required: true},
  ticket: {type: String, required: true},
  tags: {type: [String], required: true},
  exist: {type: Boolean, required: false, default: false}
})

console.log('PASSOU AQUI')

mongoose.model('Event', eventSchema)
