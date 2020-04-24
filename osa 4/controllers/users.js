const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')

userRouter.post('/', async (request, response) => {
    const body = request.body
    const saltRounds = 10

    const users = await User.find({})
    const list = users.map(user => user.username)

    if (!body.username || !body.password) {
        const errorMessage = {error: "Missing username or password"}
        return response.status(400).json(errorMessage)
    }

    else if (body.password.length < 3 || body.username.length < 3) {
        const errorMessage = {error: "Password or username is too short"}
        return response.status(400).json(errorMessage)
    }

    else {
        const passwordHash = await bcrypt.hash(body.password, saltRounds)
        const user = new User ({
            username: body.username,
            name: body.name,
            passwordHash
        })

        const savedUser = await user.save()

        response.json(savedUser)
    }
})

userRouter.get('/', async (request, response) => {
    const users = await User
        .find({}).populate('blogs', {title: 1, author: 1, url: 1, id: 1})
    response.json(users.map(user => user.toJSON()))
})

module.exports = userRouter