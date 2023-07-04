const express = require('express')
const router = express.Router()
const subjectController = require('../controllers/subject')
const userController = require('../controllers/user')

router.get('/', subjectController.showAll)
router.get('/:id', subjectController.showOne)
router.put('/:id', userController.auth, subjectController.rename)
router.post('/', userController.auth, subjectController.create)

module.exports = router