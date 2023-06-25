const {model, Schema} = require('mongoose')

const subjectSchema = new Schema({
    name: {type: String, required: true},
    sortOrder: Number,
    cohort: {type: Schema.Types.ObjectId, ref: 'Cohort'}
}, {
    timestamps: true
})

const Subject = model('Subject', subjectSchema)
module.exports = Subject