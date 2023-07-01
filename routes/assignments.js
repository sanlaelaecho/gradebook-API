const express = require('express')
const router = express.Router()
const assignmentCtrl = require('../controllers/assignments')
const userController = require('../controllers/user')

router.post('/', userController.auth, assignmentCtrl.create)
router.get('/submitted', userController.auth, assignmentCtrl.indexSubmitted)
router.get('/notsubmitted', userController.auth, assignmentCtrl.indexNotSubmitted)
router.put('/:id', userController.auth, assignmentCtrl.update)
router.put('/grade/:id', userController.auth, assignmentCtrl.grade)
router.delete('/:id', userController.auth, assignmentCtrl.delete)

router.get('/due', userController.auth, assignmentCtrl.showDue)

router.post('/:id', userController.auth, assignmentCtrl.submit)

module.exports = router