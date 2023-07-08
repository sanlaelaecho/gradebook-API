const express = require('express')
const router = express.Router()
const submissionCtrl = require('../controllers/submissions')
const userController = require('../controllers/user')

router.post('/', userController.auth, submissionCtrl.create)
router.put('/grade/:id', userController.auth, submissionCtrl.grade)
router.post('/:id', userController.auth, submissionCtrl.submit)
router.get('/submitted', userController.auth, submissionCtrl.indexSubmitted)
router.get('/notsubmitted', userController.auth, submissionCtrl.indexNotSubmitted)
router.put('/:id', userController.auth, submissionCtrl.update)
router.get('/:id', userController.auth, submissionCtrl.viewAll)
router.delete('/:id', userController.auth, submissionCtrl.delete)

module.exports = router