const {model, Schema} = require('mongoose')
const User = require('./user')
const Assignments = require('./assignment')

const submissionSchema = new Schema ({
    assignment: {type: Schema.Types.ObjectId, required: true, ref: 'Assignments'},
    student: {type: Schema.Types.ObjectId, required: true, ref: 'User'},
    grade: {type: String, enum: ['A','B','C','D','E','F']},
    pastDueDate: {type: Boolean, required: true, default: false},
    submitted: {type: Boolean, required: true, default: false}
})

const Submission = model('Submission', submissionSchema)
module.exports = Submission