const EventsDao = require('../dao/EventsDao')

class EventsController {
  constructor() {
    this.dao = new EventsDao()
  }

  getAllEvents(req, res) {
    this.dao.getAllEvents((result) => {
      res.json(result)
    })
  }

  getAllEventsInATag(req, res) {
    const tag = req.params.tag.toLowerCase();

    this.dao.getAllEventsInATag(tag, (result) => {
      res.json(result)
    })
  }
}

module.exports = new EventsController()
