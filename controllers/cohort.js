const Cohort = require('../models/cohort')
const Subject = require('../models/subject')

exports.create = async function (req, res) {
    try {
        req.body.user = req.user._id
        const cohort = await Cohort.create(req.body)
        res.json(cohort)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.showAll = async function (req, res) {
    try{
        const allCohorts = await Cohort.find({})
        res.json({ cohort: allCohorts })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.showOne = async function (req, res) {
    try {
        const oneCohort = await Cohort.findOne({_id: req.params.id})
        res.json({cohort: oneCohort})
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.update = async function (req, res) {
    try {
        const cohort = await Cohort.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        res.json(cohort)
    } catch(error) {
        res.status(400).json({ message: error.message })
    }
}

exports.delete = async function (req, res) {
    try {
        console.log(req.user.role)
        const cohort = await Cohort.findOneAndDelete({ _id: req.params.id })
        res.sendStatus(204)
    } catch(error) {
        res.status(400).json({ message: error.message })
    }
}