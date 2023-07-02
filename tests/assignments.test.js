const request = require('supertest')
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const app = require('../app')
const server = app.listen(8080, () => console.log(`Fly me to 8080`))
const Assignment = require('../models/assignment')
let mongoServer