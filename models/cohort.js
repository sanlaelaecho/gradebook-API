const {model, Schema} = require('mongoose')

const cohort = new Schema({
    name: {type: String, required: true},
    subject: {type: Schema.Types.ObjectId, required: true, ref: 'Subject'}
    //user: {type: Schema.Types.ObjectId, required: true, ref: 'User'}
}, {
    timestamps: true
})

const Cohort = model('Cohort', cohort)
module.exports = Cohort