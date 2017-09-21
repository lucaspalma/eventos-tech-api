let mongoose = require('mongoose')

class EventsDao {
  constructor() {
    this.Event = mongoose.model('Event')
  }

  new(event, callback) {
    return this.Event.create(event, callback)
  }

  getAllNext(callback) {
    let today = new Date().toDateString()
    return this.Event.find({firstDay: {$gte: today}}, {_id: false, __v: false}, callback)
  }

  getAllNextInATag(tag, callback) {
    let today = new Date().toDateString()
    return this.Event
               .find({
                 $and: [
                   {tags: tag},
                   {firstDay: {$gte: today}},
                 ]
               },
               {_id: false, __v: false},
               callback)
  }

  getNextByAmount(amount, callback) {
    let today = new Date().toDateString()
    return this.Event
              .find({
                firstDay: {$gte: today}
              },
              {_id: false, __v: false})
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
    let today = new Date().toDateString()
    return this.Event.find({firstDay: {$lt: today}}, {_id: false, __v : false}, callback)
  }

	getAll(callback) {
		return this.Event.find({}, {_id: false, __v: false}, callback)
	}

	update(id, event, callback) {
		this.Event.update({_id: id}, event, callback)
	}
}

module.exports = EventsDao
