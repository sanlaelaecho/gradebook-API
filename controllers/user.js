require('dotenv').config()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.auth = async (req, res, next) => {
    try{
        const token = req.header('Authorization').replace('Bearer ', '')
        const data = jwt.verify(token, process.env.SECRET)
        const user = await User.findOne({ _id: data._id })
        if(!user){
            throw new Error('Invalid Credentials')
        }
        req.user = user 
        next()
    } catch(error){
        res.status(401).json({ message: error.message })
    }
}

//router.post('/', userController.createUser)
exports.createUser = async (req, res) => {
    req.body.loggedIn = false
    try{
        const user = new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        res.json({user, token})
    } catch(error) {
        res.status(400).json({message: error.message})
    }
}

//router.post('/login', userController.loginUser)
exports.loginUser = async (req, res) => {
    try{
        const user = await User.findOne({ email: req.body.email })
        if (!user || !await bcrypt.compare(req.body.password, user.password)) {
            throw new Error('Invalid Login Credentials')
        } else {
            // if (user.role === 'admin' || user.role === 'teacher') {
            //     user.select('-submissions -password').exec()
            // } else if (user.role === 'student') {
            //     user.select('-subject -password').exec() }
            user.loggedIn = true
            await user.save()
            const token = await user.generateAuthToken()
            res.json({user, token})
        }
    } catch(error) {
        res.status(400).json({message: error.message})
    }
}

//router.post('/logout', userController.auth, userController.logoutUser)
exports.logoutUser = async (req, res) => {
    try {
        req.user.loggedIn = false
        await req.user.save()
        res.json(req.user)
    } catch(error) {
        res.status(400).json({message: error.message})
    }
}

//router.put('/', userController.auth, userController.updateUser)
exports.updateUser = async (req, res) => {
    try {
        const updates = Object.keys(req.body)
        //use req.user from auth function to update the current logged in user only
        //const user = await User.findOne({ _id: req.params.id })
        updates.forEach(update => req.user[update] = req.body[update])
        await req.user.save()
        res.json(req.user)
    } catch(error) {
        res.status(400).json({message: error.message})
    }
}

//router.get('/teachers', userController.getTeachers)
exports.getTeachers = async (req, res) => {
     try {
        //hide submissions and password property in the user json when showing the teachers
        const teachers = await User.find({ role: 'teacher' }).select('-submissions -password').exec()
        res.json(teachers)
     } catch(error) {
        res.status(400).json({ message: error.message })
     }
}

//router.get('/students', userController.auth, userController.getStudents)
exports.getStudents = async (req, res) => {
    try {
        if (req.user.role === 'admin' || req.user.role === 'teacher') {
            const students = await User.find({ role: 'student' }).select('-subject -password').exec()
            res.json(students)
        } else {
            throw new Error(`For privacy issues, a student cannot view other students' information.`)
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

//router.get('/:id', userController.auth, userController.getOneUser)
exports.getOneUser = async (req, res) => {
    try{
        const user = await User.findOne({_id: req.params.id})
        const student = await User.findOne({_id: req.params.id}).select('-subject -password').exec()
        const adminOrTeacher = await User.findOne({_id: req.params.id}).select('-submissions -password -loggedIn').exec()
        if (req.user.role === 'admin' || req.user.role === 'teacher') { 
            if (user.role === 'student') {
                res.json(student)
            } else {
                res.json(adminOrTeacher)
            }
        } else if (req.user.role === 'student') {
            if (user.role === 'student') {
                throw new Error(`For privacy issues, a student cannot view other students' information.`)
            } else {
                res.json(adminOrTeacher)
            }
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
 
//router.delete('/:id', userController.auth, userController.deleteUser)
exports.deleteUser = async (req, res) => {
    try{
        //user.role checks to see if the user is an admin, otherwise won't let user delete
        if (req.user.role === 'admin') {
            await User.findByIdAndDelete(req.params.id)
            res.sendStatus(204)
        } else {
            throw new Error(`You're not authorized to delete.`)
        }
    } catch(error) {
        res.status(400).json({message: error.message})
    }
}