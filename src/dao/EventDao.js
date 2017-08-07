const mongoose = require('mongoose')

class EventsDao {
  constructor() {
    this.Event = mongoose.model('Event')
  }

  new(event, callback) {
    this.Event.create(event, callback)
  }

  getAllNext(callback) {
    this.Event.find({firstDay: {$gt: new Date()}}, {_id: false}, callback);
  }

  getAllNextInATag(tag, callback) {
    this.Event.find({tags: tag}, {_id: false}, callback)
  }

  getNextByAmount(amount, callback) {
    this.Event
        .find({
          firstDay: {$gt: new Date()}
        },
        {_id: false})
        .limit(amount).exec(callback)
  }

  getlNextInTagByAmount(tag, amount, callback) {
    this.Event
        .find({ $and: [
            {firstDay: {$gt: new Date()}},
            {tags: tag}
          ]
        },
        {_id: false})
        .limit(amount).exec(callback)
  }
}

module.exports = EventsDao
