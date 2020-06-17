import React from 'react'
import { Link } from 'react-router-dom'

/*
*
* Component deprecated
*
*/

const Blog = ({ blog }) => (
  <div className='blog'>
      <Link to={`/blogs/${blog.id}`}>
        <span className='blogname'>{blog.title}</span> {blog.author}
      </Link>  
  </div>
)

export default Blog
