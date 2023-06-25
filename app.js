const express = require('express')
const morgan = require('morgan')
const userRoutes = require('./routes/userRoutes')
const app = express()
const jsxEngine = require('jsx-view-engine')
const methodOverride = require('method-override')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(morgan('combined'))

app.use('/users', userRoutes)
app.use(methodOverride('_method'))

app.set('view engine', 'jsx')
app.engine('jsx', jsxEngine())

module.exports = app