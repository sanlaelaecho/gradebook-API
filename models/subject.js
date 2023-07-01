const {model, Schema} = require('mongoose')
const Cohorts = require('./cohorts')

const subjectSchema = new Schema({
    name: {type: String, required: true},
    sortOrder: Number,
    cohorts: [{type: Schema.Types.ObjectId, ref: 'Cohorts'}],
    numberOfCohorts: Number
}, {
    timestamps: true
})

subjectSchema.pre('find', async function(next) {
    
    // const otherCohorts = (await Cohorts.find()).forEach( function() {
    //     if()
    // } )
    //const otherCohorts = await Cohorts.findById({subject: this.ObjectId})
    console.log(this.numberOfCohorts)
    console.log(this)
     this.numberOfCohorts = this.cohorts.length
     next()
})

const Subject = model('Subject', subjectSchema)
module.exports = Subject