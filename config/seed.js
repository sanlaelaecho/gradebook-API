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

    console.log(subjects)
    console.log(cohorts)
    
    process.exit()

})()