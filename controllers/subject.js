const Subject = require('../models/subject')
const Cohorts = require('../models/cohorts')

exports.showAll = async function (req, res) {
    try{
        const allSubjects = await Subject.find({})
        res.json({ subject: allSubjects })
    } catch(error) {
        res.status(400).json({ message: error.message })
    }
}

exports.showOne = async function (req, res) {
    try {
        const oneSubject = await Subject.findOne({ _id: req.params.id })
        res.json({ subject: oneSubject })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.rename = async function (req, res) {
    try{
        if (req.user.role === 'admin') {
            const subject = await Subject.findOneAndUpdate({ _id: req.params.id }, req.body, {new: true})
            res.json(subject)
        } else {
            throw new Error(`You're not authorized.`)
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}