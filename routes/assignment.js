const express = require('express')
const router = express.Router()
const assignmentCtrl = require('../controllers/assignment')
const userController = require('../controllers/user')

router.post('/', userController.auth, assignmentCtrl.create)
router.get('/:id', userController.auth, assignmentCtrl.showDue)
router.get('/submitted', userController.auth, assignmentCtrl.indexSubmitted)
router.get('/notsubmitted', userController.auth, assignmentCtrl.indexNotSubmitted)
router.put('/:id', userController.auth, assignmentCtrl.update)
router.delete('/:id', userController.auth, assignmentCtrl.delete)

module.exports = router