const express = require('express')
const morgan = require('morgan')
const userRoutes = require('./routes/user')
const subjectRoutes = require('./routes/subject')
const cohortRoutes = require('./routes/cohort')
const assignmentRoutes = require('./routes/assignment')
const app = express()
const methodOverride = require('method-override')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(morgan('combined'))

app.use('/users', userRoutes)
app.use('/subjects', subjectRoutes)
app.use('/cohorts', cohortRoutes)
app.use('/assignments', assignmentRoutes)

app.use(methodOverride('_method'))

module.exports = app