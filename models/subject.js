const {model, Schema} = require('mongoose')
const Cohort = require('./cohort')

const subjectSchema = new Schema({
    name: {type: String, required: true},
    sortOrder: Number,
    cohorts: [{type: Schema.Types.ObjectId, ref: 'Cohort'}],
}, {
    timestamps: true,
    toJSON: { virtuals: true }
})

subjectSchema.virtual('numberOfCohorts').get(function() {
    return this.cohorts.length
})

// subjectSchema.pre('find', async function(next) {
    
//     // const otherCohorts = (await Cohorts.find()).forEach( function() {
//     //     if()
//     // } )
//     //const otherCohorts = await Cohorts.findById({subject: this.ObjectId})
//     console.log(this.numberOfCohorts)
//     console.log(this)
//      this.numberOfCohorts = this.cohorts.length
//      next()
// })

const Subject = model('Subject', subjectSchema)
module.exports = Subject