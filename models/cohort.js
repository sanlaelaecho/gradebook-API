const {model, Schema} = require('mongoose')

const cohortSchema = new Schema({
    name: {type: String, required: true},
    subject: {type: Schema.Types.ObjectId, required: true, ref: 'Subject'},
    user: {type: Schema.Types.ObjectId, ref: 'User'}
}, {
    timestamps: true
})

const Cohort = model('Cohort', cohortSchema)
module.exports = Cohort