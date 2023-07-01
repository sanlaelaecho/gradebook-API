const Assignments = require('../models/assignments')
const Cohorts = require('../models/cohorts')
const User = require('../models/user')

exports.create = async function (req, res) {
    try {
        if( req.user.role === 'teacher') {
            req.body.user = req.user._id
            const assignment = await Assignments.create(req.body)
            res.json(assignment)
        } else {
            throw new Error(`You're not a teacher why you creating assignments`)
        }     
    } catch(error) {
        res.status(400).json({ message: error.message })
    }
}

exports.indexSubmitted = async function (req, res) {
    try {
        if (req.user.role === 'teacher') {
            const submitted = await Assignments.find({submitted: true})
            res.json(submitted)
        } else {
            throw new Error(`You can't view assignments' submission unless you're a teacher`)
        }
    } catch(error) {
        res.status(400).json({ message: error.message })
    }
}

exports.indexNotSubmitted = async function (req, res) {
    try {
        if (req.user.role === 'teacher') {
            const notSubmitted = await Assignments.find({submitted: false})
            res.json(notSubmitted)
        } else {
            throw new Error(`You can't view assignments' submission unless you're a teacher`)
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.update = async function (req, res) {
    try{
        if (req.user.role === 'teacher') {
            const assignment = await Assignments.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
            res.json(assignment)
        } else {
            throw new Error(`You can't edit assignments unless you're a teacher`)
        }
    }catch(error) {
        res.status(400).json({ message: error.message })
    }
}

exports.grade = async function (req, res) {
    try {
        if(req.user.role === 'teacher') {
            const submission = await Assignments.findOne({_id: req.params.id})
            if (submission.submitted === true) {
                const grade = await Assignments.findOneAndUpdate({_id: req.params.id, submitted: true}, req.body, {new: true})
                res.json(grade)
            } else {
                throw new Error(`This assignment has not been submitted to grade.`)
            }
        } else {
            throw new Error(`Why you grading when you no teacher`)
        }
    } catch(error) {
        res.status(400).json({ message: error.message })
    }
}

exports.delete = async function (req, res) {
    try {
        if(req.user.role === 'admin' || 'teacher') {
            const assignment = await Assignments.findByIdAndDelete({_id: req.params.id})
            res.sendStatus(204)
        } else {
            throw new Error(`You're not authorized to delete.`)
        }
    } catch(error) {
        res.status(400).json({ message: error.message })
    }
}

exports.showDue = async function (req, res) {
    try {
        if (req.user.role === 'teacher' || 'student') {
            const due = await Assignments.find({})
            todaysDate = Date.now()
            dueDate = due.forEach(parse => dueDate = Assignments.due_date.parse())
            console.log(due)
            console.log(dueDate)
            res.json(due)
        } else {
            throw new Error(`Unauthorized Access`)
        }
    } catch(error) {
        res.status(400).json({ message: error.message })
    }
}

exports.submit = async function (req, res) {
    try{
        if(req.user.role === 'student') {
            const submission = await Assignments.findOne({ _id: req.params.id })
            submission.submitted = true
            await submission.save()
            res.json(submission)
        } else {
            throw new Error(`Only students can submit their assignments`)
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

