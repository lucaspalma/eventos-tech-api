const EventDao = require('../dao/EventDao')

class EventsController {
  constructor() {
    this.dao = new EventDao()
  }

  new(req, res) {
    const event = req.body

    this.dao.new(event, (error, result) => {
      res.json(result)
    })
  }

  getAllNext(req, res) {
    this.dao.getAllNext((error, result) => {
      res.json(result)
    })
  }

  getAllNextInATag(req, res) {
    const tag = req.params.tag.toLowerCase()

    this.dao.getAllNextInATag(tag, (error, result) => {
      res.json(result)
    })
  }

  getNextByAmount(req, res) {
    const amount = parseInt(req.params.amount)

    this.dao.getNextByAmount(amount, (error, result) => {
      res.json(result)
    })
  }

  getlNextInTagByAmount(req, res) {
    const tag = req.params.tag.toLowerCase()
    const amount = parseInt(req.params.amount)

    console.log(amount)

    this.dao.getlNextInTagByAmount(tag, amount, (error, result) => {
      res.json(result)
    })
  }

  getAllPrevious(req, res) {
    this.dao.getAllPrevious((error, result) => {
      res.json(result)
    })
  }
}

module.exports = new EventsController()
