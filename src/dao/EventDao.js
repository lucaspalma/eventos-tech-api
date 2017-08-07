const mongoose = require('mongoose')

class EventsDao {
  constructor() {
    this.event = mongoose.model('Event')
  }

  new(event, success, error) {
    this.event.create(event).then(success, error)
  }

  getAllNext(success, error) {
    this.event.find({}, {_id: false}).then(success, error);
  }

  getAllNextInATag(tag, success, error) {
    this.event.find({tags: tag}, {_id: false}).then(success, error)
  }

  getNextByAmount(amount, success, error) {
    this.event
        .find({
          firstDay: {$gt: new Date()}
        },
        {_id: false})
        .limit(amount).then(success, error)
  }

  getlNextInTagByAmount(tag, amount, success, error) {
    this.event
        .find({ $and: [
            {firstDay: {$gt: new Date()}},
            {tags: tag}
          ]
        },
        {_id: false})
        .find(amount)
        .then(success, error)
  }
}

module.exports = EventsDao
