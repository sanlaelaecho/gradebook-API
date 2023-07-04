const Assignments = require('../models/assignment')
const Cohort = require('../models/cohort')
const User = require('../models/user')

//router.post('/', userController.auth, assignmentCtrl.create)
exports.create = async function (req, res) {
    try {
        if( req.user.role === 'teacher') {
            req.body.teacher = req.user._id
            const assignment = await Assignments.create(req.body)
            await Cohort.findByIdAndUpdate(assignment.cohort,
                {
                    $addToSet: {assignments: assignment._id}
                }, {new: true})
            res.json(assignment)
        } else {
            throw new Error(`You're not a teacher why you creating assignments`)
        }     
    } catch(error) {
        res.status(400).json({ message: error.message })
    }
}

//router.put('/:id', userController.auth, assignmentCtrl.update)
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

//router.get('/:id', userController.auth, assignmentCtrl.getOne)
exports.getOne = async function (req, res) {
    try {
        const assignment = await Assignments.findById(req.params.id)
        res.json(assignment)
    } catch(error) {
        res.status(400).json({ message: error.message })
    }
}

//router.delete('/:id', userController.auth, assignmentCtrl.delete)
exports.delete = async function (req, res) {
    try {
        if(req.user.role === 'admin' || req.user.role === 'teacher') {
            await Assignments.findByIdAndDelete({_id: req.params.id})
            res.sendStatus(204)
        } else {
            throw new Error(`You're not authorized to delete.`)
        }
    } catch(error) {
        res.status(400).json({ message: error.message })
    }
}

// exports.showDue = async function (req, res) {
//     try {
//         if (req.user.role === 'teacher' || req.user.role === 'student') {
//             const assignments = await Assignments.find({})
//             let todaysDate = Date.now()
//             let dueAssignments = assignments.filter()
//             //dueDate = due.forEach(parse => dueDate = Assignments.due_date.parse()) return filtered list / dueDate or map
//             console.log(due)
//             console.log(dueDate)
//             res.json(due)
//         } else {
//             throw new Error(`Unauthorized Access`)
//         }
//     } catch(error) {
//         res.status(400).json({ message: error.message })
//     }
// }



