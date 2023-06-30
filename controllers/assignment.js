const Assignment = require('../models/assignment')
const Cohort = require('../models/cohort')
const User = require('../models/user')

exports.create = async function (req, res) {
    try {
        req.body.user = req.user._id
        const assignment = await Assignment.create(req.body)
        res.json(assignment)
    } catch(error) {
        res.status(400).json({ message: error.message })
    }
}

exports.showDue = async function (req, res) {
    try {
        const due = await Assignment.find({_id: req.params.id, due_date: Date.now})
        res.json(due)
    } catch(error) {
        res.status(400).json({ message: error.message })
    }
}

exports.indexSubmitted = async function (req, res) {
    try {
        const submitted = await Assignment.find({_id: req.params.id, submitted: true})
        res.json(submitted)
    } catch(error) {
        res.status(400).json({ message: error.message })
    }
}

exports.indexNotSubmitted = async function (req, res) {
    try {
        const notSubmitted = await Assignment.find({_id: req.params.id, submitted: false})
        res.json(notSubmitted)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.update = async function (req, res) {
    try{
        const assignment = await Assignment.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
        res.json(assignment)
    }catch(error) {
        res.status(400).json({ message: error.message })
    }
}

exports.delete = async function (req, res) {
    try {
        if(req.user.role === 'admin' || 'teacher') {
            const assignment = await Assignment.findByIdAndDelete({_id: req.params.id})
            res.sendStatus(204)
        } else {
            throw new Error(`You're not authorized to delete.`)
        }
    } catch(error) {
        res.status(400).json({ message: error.message })
    }
}