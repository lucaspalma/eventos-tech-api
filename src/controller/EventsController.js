const EventsDao = require('../dao/EventsDao')

class EventsController {
  constructor() {
    this.dao = new EventsDao()
  }

  getAll(req, res) {
    this.dao.getAll((result) => {
      res.json(result)
    })
  }

  getAllInATag(req, res) {
    const tag = req.params.tag.toLowerCase();

    this.dao.getAllInATag(tag, (result) => {
      res.json(result)
    })
  }

  getNext(req, res) {
    this.dao.getNext((result) => {
      res.json(result)
    })
  }
}

module.exports = new EventsController()
