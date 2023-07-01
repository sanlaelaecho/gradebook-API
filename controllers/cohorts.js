const Cohorts = require('../models/cohorts')
const Subject = require('../models/subject')

exports.create = async function (req, res) {
    try {
        if (req.user.role === 'admin' || 'teacher') {
            req.body.user = req.user._id
            const cohort = await Cohorts.create(req.body)
            await cohort.save()
            res.json(cohort)
        } else {
            throw new Error(`You're not authorized.`)
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.showAll = async function (req, res) {
    try{
        const allCohorts = await Cohorts.find({})
        res.json({ cohort: allCohorts })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.showOne = async function (req, res) {
    try {
        const oneCohort = await Cohorts.findOne({_id: req.params.id})
        res.json({cohort: oneCohort})
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.update = async function (req, res) {
    try {
        if (req.user.role === 'admin' || 'teacher') {
        const cohort = await Cohorts.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        res.json(cohort)
        } else {
            throw new Error(`You're not authorized.`)
        }
    } catch(error) {
        res.status(400).json({ message: error.message })
    }
}

exports.delete = async function (req, res) {
    try {
        if (req.user.role === 'admin' || 'teacher') {
        console.log(req.user.role)
        const cohort = await Cohorts.findOneAndDelete({ _id: req.params.id })
        res.sendStatus(204)
        } else {
            throw new Error(`You're not authorized.`)
        }
    } catch(error) {
        res.status(400).json({ message: error.message })
    }
}