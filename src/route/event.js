const express = require('express')
const router = express.Router()
const EventController = require('../controller/EventController')

router.route('/')
   .post(EventController.new.bind(EventController))

router.get('/next', EventController.getAllNext.bind(EventController))
router.get('/next/tag/:tag', EventController.getAllNextInATag.bind(EventController))

router.get('/next/amount/:amount', EventController.getNextByAmount.bind(EventController))
router.get('/next/tag/:tag/amount/:amount', EventController.getlNextInTagByAmount.bind(EventController))

module.exports = router
