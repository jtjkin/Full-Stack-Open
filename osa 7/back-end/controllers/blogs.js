const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const logger = require('../utils/logger')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', {username: 1, name: 1, id: 1})
  response.json(blogs.map(blog => blog.toJSON()))

})
  
blogsRouter.post('/', async (request, response) => {
    const body = request.body
    const token = request.token

    const decodedToken = jwt.verify(token, process.env.SECRET)
    if(!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)

    if (body.title === undefined || body.url === undefined) {
      const error = {error: 'title or url missing'}
      response.status(404).json(error)
    } else {
      const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes === undefined ? 0 : body.likes,
        user: user.id,
        comments: []
      })
  
      const savedBlog = await blog.save()

      const populatedBlogs = await Blog
        .find({user: user}).populate('user', {username: 1, name: 1, id: 1})
      
      const length = populatedBlogs.length
      const newestPost = populatedBlogs[length -1]  

      user.blogs = user.blogs.concat(savedBlog.id)
      await user.save()

      response.json(newestPost.toJSON())
    }

})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  if (blog) {
    response.json(blog.toJSON())
  } else {
    response.status(404).end()
  }


})

blogsRouter.put('/:id', async (request, response) => {
  const blog = await Blog.findByIdAndUpdate(request.params.id,
    {likes: request.body.likes},
    {upsert: true, new: true}
  )

  response.json(blog.toJSON())
})

blogsRouter.put('/:id/comments', async (request, response) => {
  const blog = await Blog.findByIdAndUpdate(request.params.id,
    {comments: request.body.comments},
    {upsert: true, new: true}
  )

  response.json(blog.toJSON())
})

blogsRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  
  const token = request.token

  const decodedToken = jwt.verify(token, process.env.SECRET)

  if(!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

  if (blog.user.toString() !== user.id.toString()) {
    return response.status(401).json({error: "only the person who added the blog can the can remove it"})
  }

  await Blog.findByIdAndRemove(request.params.id)

  response.status(204).end()
})

module.exports = blogsRouter