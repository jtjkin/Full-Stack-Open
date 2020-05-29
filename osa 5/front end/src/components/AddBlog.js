import React, {useState} from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const AddBlog = ({setErrorMessage, setErrorStyle, setBlogs, blogFormRef, setVisibility}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const createNew = async event => {
        event.preventDefault()
    
        if (title === '' || url === '') {
          setErrorMessage('Title or url missing')
          setErrorStyle('bad')
          setTimeout(() => {
            setErrorMessage(null)
            setErrorStyle(null)
          }, 5000) 
        } else {
          const newInfo = {
            title: title,
            author: author,
            url: url
          }
    
          const result = await blogService.postNew(newInfo)

          const blogs = await blogService.getAll()
          blogs.sort(function(a, b) {
            return b.likes - a.likes
          })
          setBlogs(blogs) 

          setVisibility(false)
    
          console.log(result)
          setErrorMessage(`New blog added: "${result.title}" by ${result.author}`)
          setErrorStyle('good')
          setTimeout(() => {
            setErrorMessage(null)
            setErrorStyle(null)
          }, 5000)
    
          setAuthor('')
          setTitle('')
          setUrl('') 
        }
    
      }


    return (
        <form onSubmit={createNew} id='form'>
          <div>
            Title: 
            <input 
              id='title'
              type='text' 
              value={title} 
              name='Title' 
              onChange={({target}) => setTitle(target.value)}/>
          </div>
          <div>
            Author: 
            <input
              id='author' 
              type='text' 
              value={author} 
              name='Author' 
              onChange={({target}) => setAuthor(target.value)}/>
          </div>
          <div>
            Url: 
            <input
              id='url' 
              type='text' 
              value={url} 
              name='Url' 
              onChange={({target}) => setUrl(target.value)}/>
          </div>
          <br></br>
          <button type='submit'> create new blog</button>
        </form>
    )
}

AddBlog.propTypes = {
  setErrorMessage: PropTypes.func.isRequired,
  setErrorStyle: PropTypes.func.isRequired,
  setBlogs: PropTypes.func.isRequired,
  setVisibility: PropTypes.func.isRequired,
}

export default AddBlog