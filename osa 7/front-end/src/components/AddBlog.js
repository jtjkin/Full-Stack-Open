import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { addNotificationMessage } from '../reducers/notificationReducer'
import { addNotificationStyle } from '../reducers/notificationStyleReducer'
import { addBlog } from '../reducers/blogsReducer'

import { Input, Table, Button } from './style-components/generalStyles'

//reducers

const AddBlog = ({ setVisibility }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const dispatch = useDispatch()

    const createNew = async event => {
        event.preventDefault()
    
        if (title === '' || url === '') {
          dispatch(addNotificationMessage('Title or url missing', 5))
          dispatch(addNotificationStyle('bad', 5))
          console.log(dispatch(addNotificationStyle('bad', 5)))
 
        } else {
          const newInfo = {
            title: title,
            author: author,
            url: url
          }
    
          dispatch(addBlog(newInfo))

          setVisibility(false)
          
          dispatch(addNotificationMessage(`New blog added: "${newInfo.title}" by ${newInfo.author}`, 5))
          dispatch(addNotificationStyle('good', 5))
    
          setAuthor('')
          setTitle('')
          setUrl('') 
        }
    
      }


    return (
        <form onSubmit={createNew} id='form'>
          <Table>
            <tbody>
              <tr>
                <th>Title:</th> 
                <th>
                  <Input 
                  id='title'
                  type='text' 
                  value={title} 
                  name='Title' 
                  onChange={({target}) => setTitle(target.value)}/>
                </th>
              </tr>
              <tr>
                <th>Author:</th> 
                <th>
                  <Input
                  id='author' 
                  type='text' 
                  value={author} 
                  name='Author' 
                  onChange={({target}) => setAuthor(target.value)}/>
                </th>
              </tr>
              <tr>
                <th>Url:</th> 
                <th>
                  <Input
                  id='url' 
                  type='text' 
                  value={url} 
                  name='Url' 
                  onChange={({target}) => setUrl(target.value)}/>
                </th>
              </tr>
            </tbody>
          </Table>
          <Button type='submit'> create new blog</Button>
        </form>
    )
}

AddBlog.propTypes = {
  setVisibility: PropTypes.func.isRequired,
}

export default AddBlog