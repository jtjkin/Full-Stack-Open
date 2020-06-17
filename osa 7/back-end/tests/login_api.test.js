const mongoose = require ('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('login works', async () => {
    const newUser = {
        username: 'Eskomaan',
        password: 'kanakana'
    }

    await api
        .post('/api/login')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

afterAll(() => {
    mongoose.connection.close()
})