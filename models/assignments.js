const {model, Schema} = require('mongoose')

const assignmentSchema = new Schema ({
    name: {type: String, required: true},
    cohort: {type: Schema.Types.ObjectId, required: true, ref: 'Cohorts'},
    student: {type: Schema.Types.ObjectId, ref: 'User'},
    due_date: {type: Date, required: true},
    submitted: {type: Boolean, required: true, default: false},
    grade: {type: String, enum: ['A','B','C','D','E','F']}
})

const Assignments = model('Assignments', assignmentSchema)
module.exports = Assignments