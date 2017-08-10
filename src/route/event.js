const express = require('express')
const router = express.Router()
const EventController = require('../controller/EventController')

router.post('/', (req, res) => EventController.new(req, res))
router.get('/', (req, res) => EventController.getAll(req, res))
router.put('/:id', (req, res) => EventController.update(req, res))

router.get('/next', (req, res) => EventController.getAllNext(req, res))
router.get('/next/tag/:tag', (req, res) => EventController.getAllNextInATag(req, res))

router.get('/next/amount/:amount', (req, res) => EventController.getNextByAmount(req, res))
router.get('/next/tag/:tag/amount/:amount', (req, res) => EventController.getlNextInTagByAmount(req, res))

router.get('/previous', (req, res) => EventController.getAllPrevious(req, res))

module.exports = router
