import React, {useState} from 'react'
import blogService from '../services/blogs'

const Blogglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = {display: visible ? 'none' : ''}
  const showWhenVisible = {display: visible ? '' : 'none'}

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const updateLikes = async () => {
    const newLike = props.likes + 1

    const newInfo = {
      id: props.id,
      likes: newLike
    }

    const result = await blogService.update(newInfo)
    const blogs = await blogService.getAll()
    blogs.sort(function(a, b) {
      return b.likes - a.likes
    })
    props.setBlogs(blogs)

    console.log(result)
  }

  const deletePost = async () => {
    const info = props.id

  const message = window.confirm(`Do you really want to delete blog: ${props.blogTitle}?`)

    if (message) {
      const result = await blogService.deletePost(info)
      const blogs = await blogService.getAll()
      blogs.sort(function(a, b) {
        return b.likes - a.likes
      })
      props.setBlogs(blogs)

      console.log(result)
    }

  }

  if (props.loggedInUser.id === props.user.id) {
    return (
      <div className='row'>
        <div style={hideWhenVisible} className='row'>
          {props.children}
          <button onClick={toggleVisibility}>view</button>
        </div>
        <div style={showWhenVisible} className='toggableContent'>
          <div className='row'>
            {props.children}
            <button onClick={toggleVisibility} className='hideButton'>hide</button>
          </div>       
            <p>{props.url}</p>
            <p>
              likes {props.likes}
              <button onClick={updateLikes} className='likeButton'>like</button>
            </p>
            <p>{props.user.name}</p>
            <button id='delete' onClick={deletePost}>Remove</button>
        </div>
      </div>
    )
  } else {
    return (
      <div className='row'>
        <div style={hideWhenVisible} className='row'>
          {props.children}
          <button onClick={toggleVisibility}>view</button>
        </div>
        <div style={showWhenVisible}>
          <div className='row'>
            {props.children}
            <button onClick={toggleVisibility}>hide</button>
          </div>       
            <p>{props.url}</p>
            <p>
              likes {props.likes}
              <button onClick={updateLikes}>like</button>
            </p>
            <p>{props.user.name}</p>
        </div>
      </div>
    )
  }

  
}

export default Blogglable