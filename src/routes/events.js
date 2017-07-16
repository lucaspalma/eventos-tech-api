const EventsController = require('../controller/EventsController')

module.exports = (app) => {
  app.get('/allevents', EventsController.getAll.bind(EventsController))
  app.get('/allevents/:tag', EventsController.getAllInATag.bind(EventsController))
  app.get('/next', EventsController.getNext.bind(EventsController))
  app.get('/next/:tag', EventsController.getNextInTag.bind(EventsController))
}
