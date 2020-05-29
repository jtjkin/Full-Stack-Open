import React from 'react'
const Blog = ({ blog }) => (
  <div className='blog'>
    <span className='blogname'>{blog.title}</span> {blog.author}
  </div>
)

export default Blog
