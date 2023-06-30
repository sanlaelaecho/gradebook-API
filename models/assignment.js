const {model, Schema} = require('mongoose')

const assignmentSchema = new Schema ({
    name: {type: String, required: true},
    due_date: {type: Date, required: true},
    submitted: {type: Boolean, required: true, default: false},
    cohort: {type: Schema.Types.ObjectId, required: true, ref: 'Cohort'},
    user: {type: Schema.Types.ObjectId, ref: 'User'}
})

const Assignment = model('Assignment', assignmentSchema)
module.exports = Assignment