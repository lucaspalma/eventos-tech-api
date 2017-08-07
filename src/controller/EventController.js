const EventDao = require('../dao/EventDao')

class EventsController {
  constructor() {
    this.dao = new EventDao()
  }

  new(req, res) {
    const event = req.body

    this.dao.new(event, (success) => {
      res.json(result)
    }, (error) => {
      res.status(500).json(error)
    })
  }

  getAllNext(req, res) {
    this.dao.getAllNext((success) => {
      res.json(success)
    },(error) => {
      res.status(500).json(error)
    })
  }

  getAllNextInATag(req, res) {
    const tag = req.params.tag.toLowerCase()

    this.dao.getAllNextInATag(tag, (successs) => {
      res.json(success)
    }, (error) => {
      res.status(500).json(error)
    })
  }

  getNextByAmount(req, res) {
    const amount = parseInt(req.params.amount)

    this.dao.getNextByAmount(amount, (success) => {
      res.json(success)
    }, (error) => {
      res.json(error)
    })
  }

  getlNextInTagByAmount(req, res) {
    const tag = req.params.tag.toLowerCase()
    const amount = parseInt(req.params.amount)

    this.dao.getlNextInTagByAmount(tag, amount, (success) => {
      res.json(success)
    }, (error) => {
      res.json(error)
    })
  }
}

module.exports = new EventsController()
