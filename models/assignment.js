const {model, Schema} = require('mongoose')

const assignmentSchema = new Schema ({
    name: {type: String, required: true},
    due_date: Date,
    submitted: Boolean
})

const Assignment = model('Assignment', assignmentSchema)
module.exports = Assignment