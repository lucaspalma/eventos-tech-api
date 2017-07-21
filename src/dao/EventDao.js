<<<<<<< HEAD:src/dao/EventDao.js
const mongoose = require('mongoose')
=======
const db = require('monk')(`${process.env.DB_URL}/${process.env.DB_NAME}`)
>>>>>>> master:src/dao/EventsDao.js

class EventsDao {
  constructor() {
    this.event = mongoose.model('Event')
  }

  new(event, callback) {
    this.event.create(event).then(callback)
  }

  getAll(callback) {
    this.event.find({}, {_id: false, name: true, dates: true, ticket: true}).then(callback);
  }

  getAllInATag(tag, callback) {
    this.event.find({tags: tag},{_id: false, name: true, dates: true, ticket: true}).then(callback)
  }

  getNext(callback) {
    this.event
        .findOne({
          firstDay: {$gt: new Date()}
        },
        {_id: false, name: true, dates: true, description: true, ticket: true}).then(callback)
  }

  getNextInTag(tag, callback) {
    this.event
        .findOne({ $and: [
            {firstDay: {$gt: new Date()}},
            {tags: tag}
          ]
        },
        {_id: false, name: true, dates: true, description: true, ticket: true}).then(callback)
  }
}

module.exports = EventsDao
