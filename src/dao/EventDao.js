const mongoose = require('mongoose')

class EventsDao {
  constructor() {
    this.event = mongoose.model('Event')
  }

  new(event, callback) {
    this.event.create(event).then(callback)
  }

  getAllNext(callback) {
    this.event.find({}, {_id: false, name: true, dates: true, ticket: true}).then(callback);
  }

  getAllNextInATag(tag, callback) {
    this.event.find({tags: tag},{_id: false, name: true, dates: true, ticket: true}).then(callback)
  }

  getNextByAmount(amount, callback) {
    this.event
        .find({
          firstDay: {$gt: new Date()}
        },
        {_id: false, name: true, dates: true, description: true, ticket: true})
        .limit(amount).then(callback)
  }

  getlNextInTagByAmount(tag, amount, callback) {
    this.event
        .findOne({ $and: [
            {firstDay: {$gt: new Date()}},
            {tags: tag}
          ]
        },
        {_id: false, name: true, dates: true, description: true, ticket: true})
        .find(amount)
        .then(callback)
  }
}

module.exports = EventsDao
