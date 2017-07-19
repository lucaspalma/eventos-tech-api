const EventDao = require('../dao/EventDao')

class EventsController {
  constructor() {
    this.dao = new EventDao()
  }

  new(req, res) {
    const event = req.body

    this.dao.new(event, (result) => {
      res.json(result)
    })
  }

  getAll(req, res) {
    this.dao.getAll((result) => {
      res.json(result)
    })
  }

  getAllInATag(req, res) {
    const tag = req.params.tag.toLowerCase()

    this.dao.getAllInATag(tag, (result) => {
      res.json(result)
    })
  }

  getNext(req, res) {
    this.dao.getNext((result) => {
      res.json(result)
    })
  }

  getNextInTag(req, res) {
    const tag = req.params.tag.toLowerCase()

    this.dao.getNextInTag(tag, (result) => {
      res.json(result)
    })
  }
}

module.exports = new EventsController()
