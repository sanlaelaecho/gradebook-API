const Cohort = require('../models/cohort')
const Subject = require('../models/subject')

exports.create = async function (req, res) {
    try {
        if (req.user.role === 'admin' || 'teacher') {
            req.body.user = req.user._id
            const cohort = await Cohort.create(req.body)
            //find the subject with id same to cohort's subject id
            const sub = await Subject.findByIdAndUpdate(cohort.subject, 
                {
                    //addToSet only adds cohort._id to cohorts array if there is no duplicate data
                    $addToSet: { cohorts: cohort._id }
                }, {new: true}
            )
            //add this created cohort to the subject
            sub.numberOfCohorts += 1
            await sub.save()
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
        if (req.user.role === 'admin' || 'teacher') {
        const cohort = await Cohort.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
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
        const cohort = await Cohort.findOneAndDelete({ _id: req.params.id })
        res.sendStatus(204)
        } else {
            throw new Error(`You're not authorized.`)
        }
    } catch(error) {
        res.status(400).json({ message: error.message })
    }
}