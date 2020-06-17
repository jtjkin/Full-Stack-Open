import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import AddBlog from './components/AddBlog'
import Togglable from './components/Togglable'
import login from './services/login'
import User from './components/User'
import SingleBlog from './components/SingleBlog'

import Navbar from './components/Navbar'
import Users from './components/Users'

import { Switch, Route, Link, useRouteMatch } from 'react-router-dom'

//redux
import { useSelector, useDispatch } from 'react-redux'
import { addNotificationMessage } from './reducers/notificationReducer'
import { addNotificationStyle } from './reducers/notificationStyleReducer'
import { addUser, removeUser } from './reducers/loggedInUserReducer'
import { initBlogs } from './reducers/blogsReducer'

//styles
import './App.css'
import { 
  Button, AppContainer, Header1, BlogList 
} from './components/style-components/generalStyles'

const App = () => {
  const dispatch = useDispatch()

  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  //notification
  const notification = useSelector(state => state.notification)
  const notificationStyle = useSelector(state => state.notificationStyle)

  const [visibility, setVisibility] = useState(false)


  //-------------
  const match = useRouteMatch('/:id')
  const blogUser = match ?
    blogs.find(n => n.user.id === match.params.id)
    : null

  const blogMatch = useRouteMatch('/blogs/:id')
  const singleBlog = blogMatch ?
    blogs.find(n => n.id === blogMatch.params.id)
    : null


  //effects
  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)

      dispatch(addUser(user))

      blogService.setToken(user.token)
    }
  }, [dispatch])

  //methods
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await login.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      
      blogService.setToken(user.token)
      dispatch(addUser(user))
      setUsername('')
      setPassword('')
      
      dispatch(addNotificationMessage('Login successful', 5))
      dispatch(addNotificationStyle('good', 5))

    } catch (exception) {
      console.log('error', exception)
      dispatch(addNotificationMessage('wrong username or password', 5))
      dispatch(addNotificationStyle('bad', 5))
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()

    window.localStorage.clear()
    dispatch(removeUser())
  }

  if (user === null) {
    return (
      <AppContainer>
        <h2>Log in to application</h2>

        <div className={notificationStyle}>{notification}</div>

        <form onSubmit={handleLogin}>
          <div>
            Username
            <input
              id='username' 
              type='text' 
              value={username} 
              name='Username' 
              onChange={({target}) => setUsername(target.value)} />
          </div>
          <div>
            Password
            <input
              id='password' 
              type='password' 
              value={password} 
              name='Password' 
              onChange={({target}) => setPassword(target.value)} />
          </div>
          <Button id='login' type='submit'>login</Button>
        </form>
      </AppContainer>
    )
  }

  return (
    <div>
      <Navbar user={user} handleLogout={handleLogout}/>
        <AppContainer>
          <Switch>
            <Route path='/blogs/:id'>
              <SingleBlog blog={singleBlog} />
            </Route>
            <Route path='/users'>
              <Users />
            </Route>
            <Route path='/:id'>
              <User blogUser={blogUser} />
            </Route>
            <Route path='/'>
              <Header1>Blog app</Header1>

              <div className={notificationStyle}>{notification}</div>

              <h2>Create new</h2>
              
              <Togglable 
                buttonLabel='New blog' 
                visibility={visibility}
                setVisibility={setVisibility}>
                  <AddBlog 
                    setVisibility={setVisibility} />
              </Togglable>
              
              <h2>Blogs</h2>
              
              <div id='every-second'>
                  {blogs.map(blog =>
                    <BlogList key={blog.id}>
                      <Link to={`/blogs/${blog.id}`}>
                        {blog.title} by {blog.author}
                      </Link>
                    </BlogList>
                  )}
              </div>
            </Route>
          </Switch>
        </AppContainer>    
    </div>
  )
}

export default App