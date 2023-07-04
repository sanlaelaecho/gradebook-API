const {model, Schema} = require('mongoose')
const Cohort = require('./cohort')

const subjectSchema = new Schema({
    name: {type: String, required: true},
    sortOrder: Number,
    cohorts: [{type: Schema.Types.ObjectId, ref: 'Cohort'}],
    description: String
}, {
    timestamps: true,
    toJSON: { virtuals: true }
})

subjectSchema.virtual('numberOfCohorts').get(function() {
    return this.cohorts.length
})


const Subject = model('Subject', subjectSchema)
module.exports = Subject