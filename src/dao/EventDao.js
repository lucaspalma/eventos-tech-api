let mongoose = require('mongoose')

class EventsDao {
  constructor() {
    this.Event = mongoose.model('Event')
  }

  new(event, callback) {
    return this.Event.create(event, callback)
  }

  getAllNext(callback) {
    this.Event.find({firstDay: {$gt: new Date()}}, {_id: false}, callback)
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
        .find({
          $and: [
            {firstDay: {$lt: new Date()}},
            {tags: tag}
          ]
        },
        {_id: false})
        .limit(amount).exec(callback)
  }

  getAllPrevious(callback) {
    this.Event.find({firstDay: {$lt: new Date()}}, {_id: false}, callback)
  }

	getAll(callback) {
		return this.Event.find({}, {_id: false, __v: false}, callback)
	}

	update(id, event, callback) {
		this.Event.update({_id: id}, event, callback)
	}
}

module.exports = EventsDao
