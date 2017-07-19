const EventsController = require('../controller/EventController')

module.exports = (app) => {
  app.post('/new-event', EventsController.new.bind(EventsController))

  app.get('/all-next-events', EventsController.getAll.bind(EventsController))
  app.get('/all-next-events/:tag', EventsController.getAllInATag.bind(EventsController))

  app.get('/next-event', EventsController.getNext.bind(EventsController))
  app.get('/next-event/:tag', EventsController.getNextInTag.bind(EventsController))
}
