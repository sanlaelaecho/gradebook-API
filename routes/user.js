const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')

router.post('/', userController.createUser)
router.post('/login', userController.loginUser)
router.post('/logout', userController.auth, userController.logoutUser)
router.put('/', userController.auth, userController.updateUser)
router.get('/teachers', userController.getTeachers)
router.get('/students', userController.auth, userController.getStudents)
router.get('/:id', userController.auth, userController.getOneUser)
router.delete('/:id', userController.auth, userController.deleteUser)

module.exports = router