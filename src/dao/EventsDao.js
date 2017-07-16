const db = require('monk')('localhost/eventos-tech-api')

class EventsDao {
  constructor() {
    this.events = db.get('events')
  }

  getAllEvents(callback) {
    this.events.find({}, {_id: false, name: true, description: true, dates: true}).then(callback);
  }

  getAllEventsInATag(tag, callback) {
    this.events.find({tags: tag},{_id: false, name: true, description: true, dates: true}).then(callback)
  }
}

module.exports = EventsDao
