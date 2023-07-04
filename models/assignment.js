const {model, Schema} = require('mongoose')
const Cohort = require('./cohort')
const Submission = require('./submission')

const assignmentSchema = new Schema ({
    name: {type: String, required: true},
    cohort: {type: Schema.Types.ObjectId, required: true, ref: 'Cohort'},
    description: String,
    due_date: {type: Date, required: true},
    submissions: [{type: Schema.Types.ObjectId, ref: 'Submission'}]
}, {
    timestamps: true,
    toJSON: { virtuals: true }
})

assignmentSchema.virtual('numberOfSubmissions').get(function() {
    return this.submissions.length
})

const Assignments = model('Assignments', assignmentSchema)
module.exports = Assignments