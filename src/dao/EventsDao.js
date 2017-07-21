const db = require('monk')(`${process.env.DB_URL}/${process.env.DB_NAME}`)

class EventsDao {
  constructor() {
    this.events = db.get('events')
  }

  getAll(callback) {
    this.events.find({}, {_id: false, name: true, dates: true, ticket: true}).then(callback);
  }

  getAllInATag(tag, callback) {
    this.events.find({tags: tag},{_id: false, name: true, dates: true, ticket: true}).then(callback)
  }

  getNext(callback) {
    this.events
        .findOne({
          firstDay: {$gt: new Date()}
        },
        {_id: false, name: true, dates: true, description: true, ticket: true}).then(callback)
  }

  getNextInTag(tag, callback) {
    this.events
        .findOne({ $and: [
            {firstDay: {$gt: new Date()}},
            {tags: tag}
          ]
        },
        {_id: false, name: true, dates: true, description: true, ticket: true}).then(callback)
  }
}

module.exports = EventsDao
