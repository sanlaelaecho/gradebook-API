const express = require('express')
const router = express.Router()
const assignmentCtrl = require('../controllers/assignments')
const userController = require('../controllers/user')

router.post('/', userController.auth, assignmentCtrl.create)
router.put('/:id', userController.auth, assignmentCtrl.update)
router.get('/:id', assignmentCtrl.getOne)
router.delete('/:id', userController.auth, assignmentCtrl.delete)
//router.get('/due', userController.auth, assignmentCtrl.showDue)


module.exports = router