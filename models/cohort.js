const {model, Schema} = require('mongoose')
const User = require('./user')
const Assignments = require('./assignment')
const Subject = require('./subject')

const cohortSchema = new Schema({
    name: {type: String, required: true, unique: true},
    subject: {type: Schema.Types.ObjectId, required: true, ref: 'Subject'},
    description: String,
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    assignments: [{type: Schema.Types.ObjectId, ref: 'Assignments'}]
}, {
    timestamps: true
})


const Cohort = model('Cohort', cohortSchema)
module.exports = Cohort