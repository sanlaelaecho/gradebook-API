const Subject = require('../models/subject')
const Cohort = require('../models/cohort')

exports.showAll = async function (req, res) {
    try{
        const allSubjects = await Subject.find({})
        // allSubjects.forEach( function(_id) {
        //     if (Subject._id === )
        //     this.numberOfCohorts = this.cohorts.length
        // })
        await allSubjects.save()
        res.json({ subject: allSubjects })
    } catch(error) {
        res.status(400).json({ message: error.message })
    }
}

exports.showOne = async function (req, res) {
    try {
        const cohort = await Cohort.findOne({subject: req.params.id})
        const oneSubject = await Subject.findByIdAndUpdate({ _id: req.params.id },
             {
                 $addToSet: { cohorts: cohort._id }
             }, {new: true})
        //     oneSubject.numberOfCohorts = oneSubject.cohorts.length
            await oneSubject.save()
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