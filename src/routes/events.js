const EventsController = require('../controller/EventsController')

module.exports = (app) => {
  app.get('/allevents', EventsController.getAllEvents.bind(EventsController))
  app.get('/allevents/:tag', EventsController.getAllEventsInATag.bind(EventsController))
}
