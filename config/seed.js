require('dotenv').config()
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI)
mongoose.connection.once('open', () => console.log('Mongo connected to seedjs'))

const Subject = require('../models/subject')
const Cohort = require('../models/cohort')

;(async function() {
    await Subject.deleteMany({})
    const subjects = await Subject.create([
        {name: 'Computer Science', sortOrder: 10},
        {name: 'Engineering and Math', sortOrder: 20},
        {name: 'Business and Entrepreneurship', sortOrder: 30},
        {name: 'Education', sortOrder: 40},
        {name: 'Liberal Arts', sortOrder: 50},
        {name: 'Law', sortOrder: 60},
        {name: 'Medicine', sortOrder: 70},
        {name: 'Architecture', sortOrder: 80},
    ])

    await Cohort.deleteMany({})
    const cohorts = await Cohort.create([
        {name: 'CS100', subject: subjects[0]},
        {name: 'Math100', subject: subjects[1]},
        {name: 'BUS100', subject: subjects[2]},
        {name: 'EDU100', subject: subjects[3]},
        {name: 'ART100', subject: subjects[4]},
        {name: 'LAW100', subject: subjects[5]},
        {name: 'MED100', subject: subjects[6]},
        {name: 'ARCH100', subject: subjects[7]},
    ])


    const csSubj = await Subject.findOneAndUpdate(
        {name: 'Computer Science'},
        {
        $addToSet: {cohorts: cohorts[0]}
    }, {new: true})
    
    const maSubj = await Subject.findOneAndUpdate(
        {name: 'Engineering and Math'},
        {
        $addToSet: {cohorts: cohorts[1]}
    }, {new: true})

    
    await Subject.findOneAndUpdate(
        {name: 'Business and Entrepreneurship'},
        {
        $addToSet: {cohorts: cohorts[2]}
    }, {new: true})
 
    await Subject.findOneAndUpdate(
        {name: 'Education'},
        {
        $addToSet: {cohorts: cohorts[3]}
    }, {new: true})

    await Subject.findOneAndUpdate(
        {name: 'Liberal Arts'},
        {
        $addToSet: {cohorts: cohorts[4]}
    }, {new: true})

    await Subject.findOneAndUpdate(
        {name: 'Law'},
        {
        $addToSet: {cohorts: cohorts[5]}
    }, {new: true})

    await Subject.findOneAndUpdate(
        {name: 'Medicine'},
        {
        $addToSet: {cohorts: cohorts[6]}
    }, {new: true})

    await Subject.findOneAndUpdate(
        {name: 'Architecture'},
        {
        $addToSet: {cohorts: cohorts[7]}
    }, {new: true})


    process.exit()

})()