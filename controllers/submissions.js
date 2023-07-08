const Submission = require('../models/submission')
const Assignments = require('../models/assignment')
const User = require('../models/user')

//router.post('/', userController.auth, submissionCtrl.create)
exports.create = async function (req, res) {
    try {
        if (req.user.role === 'student') {
            req.body.student = req.user._id
            const submission = await Submission.create(req.body)
            const assignment = await Assignments.findByIdAndUpdate(submission.assignment,
                {
                    $addToSet: { submissions: submission._id }
                }, {new: true})
            await assignment.save()
            await submission.save()
            res.json(submission)
        } else {
            throw new Error (`Only students can create submissions.`)
        }
    } catch(error) {
        res.status(400).json({ message: error.message })
    }
}

//router.put('/grade/:id', userController.auth, submissionCtrl.grade)
exports.grade = async function (req, res) {
    try {
        if(req.user.role === 'teacher') {
            const submission = await Submission.findOne({_id: req.params.id})
            if (submission.submitted === true) { 
                const grade = await Submission.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
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

//router.post('/:id', userController.auth, submissionCtrl.submit)
exports.submit = async function (req, res) {
    try{
        if(req.user.role === 'student') {
            const submission = await Submission.findOne({ _id: req.params.id })
            submission.submitted = true
            await submission.save()
            res.json(submission)
        } else {
            throw new Error(`Only students can submit their assignments.`)
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

//router.get('/submitted', userController.auth, submissionCtrl.indexSubmitted)
exports.indexSubmitted = async function (req, res) {
    try {
        if (req.user.role === 'teacher') {
            const submitted = await Submission.find({submitted: true})
            res.json(submitted)
        } else {
            throw new Error(`You can't view assignments' submission unless you're a teacher`)
        }
    } catch(error) {
        res.status(400).json({ message: error.message })
    }
}

//router.get('/notsubmitted', userController.auth, submissionCtrl.indexNotSubmitted)
exports.indexNotSubmitted = async function (req, res) {
    try {
        if (req.user.role === 'teacher') {
            const notSubmitted = await Submission.find({submitted: false})
            res.json(notSubmitted)
        } else {
            throw new Error(`You can't view assignments' submission unless you're a teacher`)
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

//router.put('/:id', userController.auth, submissionCtrl.update)
exports.update = async function (req, res) {
    try {
        if (req.user.role === 'student') {
            const updates = await Submission.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true})
            res.json(updates)
        } else {
            throw new Error (`Only students can update their submissions.`)
        }
    } catch(error) {
        res.status(400).json({ message: error.message })
    }
}

//router.get('/:id', userController.auth, submissionCtrl.viewAll)
exports.viewAll = async function (req, res) {
    try {
        if (req.user.role === 'student') {
            const studentsSubmissions = await Submission.find({ student: req.params.id })
            res.json(studentsSubmissions)
        } else {
            const allSubmissions = await Submission.find()
            res.json(allSubmissions)
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

//router.delete('/:id', userController.auth, submissionCtrl.delete)
exports.delete = async function (req, res) {
    try {
        if (req.user.role === 'student' || req.user.role === 'teacher') {
            await Submission.findOneAndDelete({_id: req.params.id})
            res.sendStatus(204)
        } else {
            throw new Error (`Only students or their teachers can delete their own submissions.`)
        }
    } catch(error) {
        res.status(400).json({ message: error.message })
    }
}

