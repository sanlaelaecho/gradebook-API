const express = require('express')
const router = express.Router()
const cohortController = require('../controllers/cohorts')
const userController = require('../controllers/user')

router.post('/', userController.auth, cohortController.create)
router.get('/all', userController.auth, cohortController.showAll)
router.get('/:id', userController.auth, cohortController.showOne)
router.put('/:id', userController.auth, cohortController.update)
router.delete('/:id', userController.auth, cohortController.delete)

module.exports = router