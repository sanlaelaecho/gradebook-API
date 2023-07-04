const Subject = require('../models/subject')
const Cohort = require('../models/cohort')

//router.get('/', subjectController.showAll)
exports.showAll = async function (req, res) {
    try{
        const allSubjects = await Subject.find({})
        res.json({ subject: allSubjects })
    } catch(error) {
        res.status(400).json({ message: error.message })
    }
}

//router.get('/:id', subjectController.showOne)
exports.showOne = async function (req, res) {
    try {
        const oneSubject = await Subject.findOne({ _id: req.params.id })
        res.json({ subject: oneSubject })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

//router.put('/:id', userController.auth, subjectController.rename)
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

//router.post('/', userController.auth, subjectController.create)
exports.create = async function (req, res) {
    try {
        if(req.user.role === 'admin') {
            const subject = await Subject.create(req.body)
            res.json(subject)
        } else {
            throw new Error(`You're not authorized.`)
        }
    } catch(error) {
        res.status(400).json({ message: error.message })
    }
}