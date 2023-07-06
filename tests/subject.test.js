const request = require('supertest')
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const app = require('../app')
const server = app.listen(7070, () => console.log('Fly me to PORT 7070'))
const Subject = require('../models/subject')
const User = require('../models/user')
let mongoServer

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri())
})

afterAll(async () => {
    await mongoose.connection.close()
    mongoServer.stop()
    server.close()
})

describe('Test the subject endpoints', () => {

    // router.get('/', subjectController.showAll)
    test('It should show all subjects', async () => {
        const csSubject = new Subject({ name: 'Computer Science' })
        await csSubject.save()
        const mathSubject = new Subject({ name: 'Math' })
        await mathSubject.save()
        const response = await request(app)
            .get(`/subjects`)
        expect(response.statusCode).toBe(200)
        expect.objectContaining(csSubject)
        expect.objectContaining(mathSubject)
    })

    // router.get('/:id', subjectController.showOne)
    test('It should show one subject', async () => {
        const lawSubject = new Subject({ name: 'Law' })
        await lawSubject.save()
        const response = await request(app)
            .get(`/subjects/${lawSubject._id}`)
        expect(response.statusCode).toBe(200)
        expect.objectContaining(lawSubject)
    })

    // router.put('/:id', userController.auth, subjectController.rename)
    test('It should update a subject', async() => {
        const user = new User({ lastName: 'admin', email: 'admin@school.com', password: 'admin', role: 'admin' })
        await user.save()
        const medSubject = new Subject({ name: 'Medicine' })
        await medSubject.save()
        const token = await user.generateAuthToken()
        const response = await request(app)
            .put(`/subjects/${medSubject._id}`)
            .set(`Authorization`, `Bearer ${token}`)
            .send({ name: 'Medicine and Pharmaceutical'})
        expect(response.statusCode).toBe(200)
        expect(response.body.name).toEqual('Medicine and Pharmaceutical')
    })

    // router.post('/', userController.auth, subjectController.create)
    test('It should create a subject', async() => {
        const user = new User({ lastName: 'admin1', email: 'admin1@school.com', password: 'admin1', role: 'admin' })
        await user.save()
        const token = await user.generateAuthToken()
        const response = await request(app)
            .post(`/subjects`)
            .set(`Authorization`,`Bearer ${token}`)
            .send({ name: 'Architecture' })
        expect(response.statusCode).toBe(200)
        expect(response.body.name).toEqual('Architecture')
    })

})