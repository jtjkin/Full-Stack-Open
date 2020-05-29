const mongoose = require ('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('bloglist is returned as JSON', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('with 4 blogs on the database, returns all 4', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(4)
})

test('Database ids are "id" not "_id"', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toBeDefined()
})

test('POST adds new item to DB, assuming the initial length is 4', async () => {
    const newPost = {
        title: 'test',
        author: 'test',
        url: 'test',
        likes: '0',
    }

    await api
        .post('/api/blogs')
        .set({Authorization: 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RpIiwiaWQiOiI1ZWExZDRkOTI1YWI4YTRlNDgxN2IwNjMiLCJpYXQiOjE1ODc3NDU2Mjh9.gd0oJgo5DYI81MU_uRK329fAkHiDGmObeFQqBXEbL-0'})
        .send(newPost)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    
    expect(response.body).toHaveLength(5)  
})

test('undefined likes have value 0', async () => {
    const newPost = {
        title: 'test no likes',
        author: 'tests me no likes',
        url: 'test no likes',
    }

    await api
        .post('/api/blogs')
        .set({Authorization: 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RpIiwiaWQiOiI1ZWExZDRkOTI1YWI4YTRlNDgxN2IwNjMiLCJpYXQiOjE1ODc3NDU2Mjh9.gd0oJgo5DYI81MU_uRK329fAkHiDGmObeFQqBXEbL-0'})
        .send(newPost)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    expect(response.body[response.body.length - 1].likes).toBe(0) 
})

test('Post without url goes 404', async () => {
    const newPost = {
        title: 'test no likes',
        author: 'tests me no likes',
        likes: '4000000'
    }

    await api
        .post('/api/blogs')
        .set({Authorization: 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RpIiwiaWQiOiI1ZWExZDRkOTI1YWI4YTRlNDgxN2IwNjMiLCJpYXQiOjE1ODc3NDU2Mjh9.gd0oJgo5DYI81MU_uRK329fAkHiDGmObeFQqBXEbL-0'})
        .send(newPost)
        .expect(404)
})

test('Post without title goes 404', async () => {
    const newPost = {
        author: 'tests me no likes',
        url: 'testpage.com',
        likes: '4000000'
    }

    await api
        .post('/api/blogs')
        .set({Authorization: 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RpIiwiaWQiOiI1ZWExZDRkOTI1YWI4YTRlNDgxN2IwNjMiLCJpYXQiOjE1ODc3NDU2Mjh9.gd0oJgo5DYI81MU_uRK329fAkHiDGmObeFQqBXEbL-0'})
        .send(newPost)
        .expect(404)
})

test('Post not added if token is not provided', async () => {
    const newPost = {
        author: 'tests me no likes',
        url: 'testpage.com',
        likes: '4000000'
    }

    await api
        .post('/api/blogs')
        .send(newPost)
        .expect(401)
})

afterAll(() => {
    mongoose.connection.close()
})