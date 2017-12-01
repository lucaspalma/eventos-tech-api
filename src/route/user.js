const express = require('express')
const router = express.Router()
const UserController = require('../controller/UserController')

router.post('/', (req, res) => UserController.new(req, res))

module.exports = router
