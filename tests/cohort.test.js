const request = require('supertest')
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const app = require('../app')
const server = app.listen(6060, ()=> console.log(`Flying down to Port 6060`))
const Subject = require('../models/subject')
const User = require('../models/user')
const Cohort = require('../models/cohort')
let mongoServer

beforeAll(async() => {
    mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri())
})

afterAll(async() => {
    await mongoose.connection.close()
    mongoServer.stop()
    server.close()
})

describe('Test all cohort endpoints', () => {

    // router.post('/', userController.auth, cohortController.create)
    test('It should create a cohort', async () => {
        const csSubject = new Subject({ name: 'Computer Science' })
        await csSubject.save()
        const user = new User({ lastName: 'admin', email: 'admin@school.com', password: 'admin', role: 'admin' })
        await user.save()
        const token = await user.generateAuthToken()
        const response = await request(app)
            .post(`/cohorts`)
            .set(`Authorization`, `Bearer ${token}`)
            .send({ name: 'CS101', subject: csSubject._id, description: 'CS basics' })
        expect(response.statusCode).toBe(200)
        expect(response.body.name).toEqual('CS101')
        expect.objectContaining(csSubject)
        expect(response.body.description).toEqual('CS basics')
    })

    // router.get('/', cohortController.showAll)
    test('It should get all cohorts', async() => {
        const csSubject = new Subject({name: 'Computer Science'})
        await csSubject.save()
        const archSubject = new Subject({name: 'Architecture'})
        await archSubject.save()
        const cs2Cohort = new Cohort({name: 'CS200', subject: csSubject._id})
        const cs3Cohort = new Cohort({name: 'CS300', subject: csSubject._id})
        await cs2Cohort.save()
        await cs3Cohort.save()
        const archCohort = new Cohort({name: 'ARCH100', subject: archSubject._id})
        await archCohort.save()
        const response = await request(app)
            .get(`/cohorts`)
        expect(response.statusCode).toBe(200)
        expect.objectContaining(cs2Cohort)
        expect.objectContaining(cs3Cohort)
        expect.objectContaining(archCohort)
    })

    // router.get('/:id', cohortController.showOne)
    test('It should show one cohort', async () => {
        const lawSubject = new Subject({ name: 'Law' })
        await lawSubject.save()
        const lawCohort = new Cohort({ name: 'LAW100', subject: lawSubject._id })
        await lawCohort.save()
        const response = await request(app)
            .get(`/cohorts/${lawCohort._id}`)
        expect(response.statusCode).toBe(200)
        expect.objectContaining(lawCohort)
    })

    // router.put('/:id', userController.auth, cohortController.update)
    test('It should update a cohort', async() => {
        const user = new User({ lastName: 'teacher', email: 'teacher@school.com', password: 'teacher', role: 'teacher' })
        await user.save()
        const token = await user.generateAuthToken()
        const eduSubject = new Subject({ name: 'Education' })
        await eduSubject.save()
        const eduCohort = new Cohort({ name: 'EDU100', subject: eduSubject._id })
        await eduCohort.save()
        const response = await request(app)
            .put(`/cohorts/${eduCohort._id}`)
            .set(`Authorization`, `Bearer ${token}`)
            .send({ name: 'Intro to Education' })
        expect(response.statusCode).toBe(200)
        expect(response.body.name).toEqual('Intro to Education')
    })

    // router.delete('/:id', userController.auth, cohortController.delete)
    test('It should delete a cohort', async() => {
        const user = new User({ lastName: 'admin2', email: 'admin2@school.com', password: 'admin2', role: 'admin' })
        await user.save()
        const busiSubject = new Subject({ name: 'Business' })
        await busiSubject.save()
        const busiCohort = new Cohort({ name: 'BUS100', subject: busiSubject._id })
        await busiCohort.save()
        const token = await user.generateAuthToken()
        const response = await request(app)
            .delete(`/cohorts/${busiCohort._id}`)
            .set(`Authorization`, `Bearer ${token}`)
        expect(response.statusCode).toBe(204)
    })
})