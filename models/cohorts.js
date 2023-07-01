const {model, Schema} = require('mongoose')
const Assignments = require('./assignments')
const Subject = require('./subject')

const cohortSchema = new Schema({
    name: {type: String, required: true, unique: true},
    subject: {type: Schema.Types.ObjectId, required: true, ref: 'Subject'},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    assignments: [{type: Schema.Types.ObjectId, ref: 'Assignments'}]
}, {
    timestamps: true
})

cohortSchema.pre('save', async function (next) {
    if (this.subject === Subject._id) {
        Subject.cohorts.push(this._id)
    }
    next()
})

const Cohorts = model('Cohorts', cohortSchema)
module.exports = Cohorts