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

exports.createUser = async (req, res) => {
    req.body.loggedIn = false
    try{
        const user = new User(req.body)
        //check if the user is a student then let them have assignments property
        if (req.body.role === 'student') {
            user.assignments = []
        //check if the user is a teacher then let them have a subject to belong to
        } else if (req.body.role === 'teacher') {
            if (!user.subject) {
                throw new Error(`A teacher needs to teach a subject.`)
            } 
            await user.deleteAssignments()
            //delete(user.assignments)
        }  else {
        //doesn't allow admin to have subject or assignments properties
            
            //delete user.assignments
            delete user.subject
        }
        await user.save()
        const token = await user.generateAuthToken()
        res.json({user, token})
    } catch(error) {
        res.status(400).json({message: error.message})
    }
}

exports.loginUser = async (req, res) => {
    try{
        const user = await User.findOne({ email: req.body.email })
        if (!user || !await bcrypt.compare(req.body.password, user.password)) {
            throw new Error('Invalid Login Credentials')
        } else {
            user.loggedIn = true
            await user.save()
            const token = await user.generateAuthToken()
            res.json({user, token})
        }
    } catch(error) {
        res.status(400).json({message: error.message})
    }
}

exports.logoutUser = async (req, res) => {
    try {
        req.user.loggedIn = false
        await req.user.save()
        res.json(req.user)
    } catch(error) {
        res.status(400).json({message: error.message})
    }
}

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

exports.getTeachers = async (req, res) => {
     try {
        const teachers = await User.find({ role: 'teacher' }).select('-assignments -password').exec()
        res.json(teachers)
     } catch(error) {
        res.status(400).json({ message: error.message })
     }
}

exports.getStudents = async (req, res) => {
    try {
        if (req.user.role === 'admin' || req.user.role === 'teacher') {
            const students = await User.find({ role: 'student' })
            res.json(students)
        } else {
            throw new Error(`For privacy issues, a student cannot view other students' information.`)
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}


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