const EventsController = require('../controller/EventsController')

module.exports = (app) => {
  app.get('/all-next-events', EventsController.getAll.bind(EventsController))
  app.get('/all-next-events/:tag', EventsController.getAllInATag.bind(EventsController))

  app.get('/next-event', EventsController.getNext.bind(EventsController))
  app.get('/next-event/:tag', EventsController.getNextInTag.bind(EventsController))
}
