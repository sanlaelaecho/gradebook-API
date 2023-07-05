const request = require('supertest')
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const app = require('../app')
const server = app.listen(8080, () => console.log(`Fly me to Port 8080`))
const User = require('../models/user')
const Subject = require('../models/subject')
const Submission = require('../models/submission')
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

describe('Test the user endpoints', () => {

    //router.post('/', userController.createUser)
    test('It should create a new user', async () => {
        const response = await request(app)
            .post('/users')
            .send({ lastName: 'teacher1', email: 'teacher1@school.com', password: 'teacherteacher', role: 'teacher' })
        expect(response.statusCode).toBe(200)
        expect(response.body.user.lastName).toEqual('teacher1')
        expect(response.body.user.email).toEqual('teacher1@school.com')
        expect(response.body.user.loggedIn).toEqual(false)
        expect(response.body.user.role).toEqual('teacher')
        expect(response.body).toHaveProperty('token')
    })


    // router.post('/login', userController.loginUser)
    test('It should login the user', async () => {
        const user = new User({ lastName: 'student1', email: 'student1@school.com', password: 'student1', role: 'student' })
        await user.save()
        const response = await request(app)
            .post('/users/login')
            .send({ email: 'student1@school.com', password: 'student1' })
        expect(response.statusCode).toBe(200)
        expect(response.body.user.lastName).toEqual('student1')
        expect(response.body.user.email).toEqual('student1@school.com')
        expect(response.body.user.loggedIn).toEqual(true)
        expect(response.body.user.role).toEqual('student')
        expect(response.body).toHaveProperty('token')
    })

    // router.post('/logout', userController.auth, userController.logoutUser)
    test('It should log out the user', async () => {
        const user = new User({ lastName: 'admin1',email: 'admin1@school.com', password: 'admin1', role: 'admin', loggedIn: true })
        await user.save()
        const token = await user.generateAuthToken()
        const response = await request(app)
            .post(`/users/logout`)
            .set(`Authorization`, `Bearer ${token}`)
        expect(response.statusCode).toBe(200)
        expect(response.body.email).toEqual('admin1@school.com')
        expect(response.body.loggedIn).toEqual(false)
    })

    // router.put('/', userController.auth, userController.updateUser)
    test('It should update a user', async() => {
        const user = new User({ lastName: 'admin2', email: 'admin2@school.com', password: 'admin2', role: 'admin' })
        await user.save()
        const token = await user.generateAuthToken()
        const response = await request(app)
            .put('/users')
            .set(`Authorization`,`Bearer ${token}`)
            .send({ lastName: 'adminadmin', email: 'adminadmin2@school.com'})
        expect(response.statusCode).toBe(200)
        expect(response.body.lastName).toEqual('adminadmin')
        expect(response.body.email).toEqual('adminadmin2@school.com')
    })

    // router.get('/teachers', userController.getTeachers)
    test('It should get all teachers', async() => {
        const user = new User({ lastName: 'teacher2', email: 'teacher2@school.com', password: 'teacherteacher', role: 'teacher' })
        await user.save()
        const response = await request(app)
            .get('/users/teachers')
        expect(response.statusCode).toBe(200)
        expect.objectContaining(user)
    })

    // router.get('/students', userController.auth, userController.getStudents)
    test('It should get all students', async () => {
        const user = new User({ lastName: 'teacher3', email: 'teacher3@school.com', password: 'teacherteacher', role: 'teacher' })
        await user.save()
        const token = await user.generateAuthToken()
        const response = await request(app)
            .get(`/users/students`)
            .set(`Authorization`, `Bearer ${token}`)
        expect(response.statusCode).toBe(200)
        expect.objectContaining(user)
    })

    // router.get('/:id', userController.auth, userController.getOneUser)
    test('It should get one user', async () => {
        const user = new User({ lastName: 'admin3', email: 'admin3@school.com', password: 'admin3', role: 'admin' })
        await user.save()
        const token = await user.generateAuthToken()
        const response = await request(app)
            .get(`/users/${user._id}`)
            .set(`Authorization`,`Bearer ${token}`)
        expect(response.statusCode).toBe(200)
        expect(response.body.email).toEqual('admin3@school.com')
    })

    // router.delete('/:id', userController.auth, userController.deleteUser)
    test('It should delete a user', async () => {
        const user = new User({ lastName: 'admin4', email: 'admin4@school.com', password: 'admin4', role: 'admin' })
        await user.save()
        const token = await user.generateAuthToken()
        const response = await request(app)
            .delete(`/users/${user._id}`)
            .set(`Authorization`,`Bearer ${token}`)
        expect(response.statusCode).toBe(204)
    })
})



