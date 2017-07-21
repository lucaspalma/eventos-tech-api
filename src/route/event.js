const EventController = require('../controller/EventController')

module.exports = (app) => {
  app.route('/event')
     .post(EventController.new.bind(EventController))

  app.get('/event/next', EventController.getAllNext.bind(EventController))
  app.get('/event/next/:tag', EventController.getAllNextInATag.bind(EventController))

  app.get('/event/next/:amount', EventController.getNextByAmount.bind(EventController))
  app.get('/event/next/:tag/:amount', EventController.getlNextInTagByAmount.bind(EventController))
}
