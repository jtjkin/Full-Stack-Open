import React, {useState} from 'react'
import blogService from '../services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { initBlogs } from '../reducers/blogsReducer'

/*
*
* Component deprecated
*
*/

const Blogglable = (props) => {
  const dispatch = useDispatch()

  const user = useSelector(state => state.user)

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = {display: visible ? 'none' : ''}
  const showWhenVisible = {display: visible ? '' : 'none'}

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const updateLikes = async () => {
    const newLike = props.blog.likes + 1

    const newInfo = {
      id: props.blog.id,
      likes: newLike
    }

    const result = await blogService.update(newInfo)
    dispatch(initBlogs())

    console.log(result)
  }

  const deletePost = async () => {
    const info = props.blog.id

    const message = window.confirm(`Do you really want to delete blog: ${props.blog.title}?`)

    if (message) {
      const result = await blogService.deletePost(info)
      dispatch(initBlogs())

      console.log(result)
    }

  }

  if (user.id === props.blog.user.id) {
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
            <p>{props.blog.url}</p>
            <p>
              likes {props.blog.likes}
              <button onClick={updateLikes} className='likeButton'>like</button>
            </p>
            <p>{props.blog.user.name}</p>
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
            <p>{props.blog.url}</p>
            <p>
              likes {props.blog.likes}
              <button onClick={updateLikes}>like</button>
            </p>
            <p>{props.blog.user.name}</p>
        </div>
      </div>
    )
  }

  
}

export default Blogglable