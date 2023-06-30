const Subject = require('../models/subject')
const Cohort = require('../models/cohort')

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
        const subject = await Subject.findOneAndUpdate({ _id: req.params.id }, req.body, {new: true})
        res.json(subject)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}