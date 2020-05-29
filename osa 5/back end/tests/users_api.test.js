const mongoose = require ('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('POST adds new user to database', async () => {
    const newUser = {
        username: 'Eskomaan',
        name: 'Esko',
        password: 'kanakana'
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('adding user without username gives 400', async () => {
    const newUser = {
        name: 'Esko',
        password: 'kanakana'
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
})

test('adding user without password gives 400', async () => {
    const newUser = {
        username: "EskoEskonen",
        name: 'Esko'
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
})

afterAll(() => {
    mongoose.connection.close()
})