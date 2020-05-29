import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import AddBlog from './components/AddBlog'
import Togglable from './components/Togglable'
import Bloggable from './components/Bloggable'
import login from './services/login'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  //error message
  const [errorMessage, setErrorMessage] = useState(null)
  const [errorStyle, setErrorStyle] = useState(null)

  //refs
  //const blogFormRef = React.createRef()

  /*huom. reactin dokumentaation mukaan ref:jä ei tulisi käyttää viittaamaan siblingeihin
  (uuden blogin lisäämisen refraktointi aiheuttaa sen, että addBlogilla pitäisi olla ref 
  Togglableen), vaan state pitäisi olla parentissa, joten Togglablen state siirretty takaisin tänne 
  
  Ref-koodille ei siis olisi enää tarvetta, mutta olen jättänyt sen oman muistin tueksi*/
  const [visibility, setVisibility] = useState(false)


  //effects
  useEffect(() => {
    async function getBlogs() {
      const blogs = await blogService.getAll()
      blogs.sort(function(a, b) {
        return b.likes - a.likes
      })
      setBlogs(blogs)
    }

    getBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


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
      setUser(user)
      setUsername('')
      setPassword('')

      setErrorMessage('Login succesful')
      setErrorStyle('good')
      setTimeout(() => {
        setErrorMessage(null)
        setErrorStyle(null)
      }, 5000)
    } catch (exception) {
      console.log('error', exception)
      setErrorMessage('wrong username or password')
      setErrorStyle('bad')
      setTimeout(() => {
        setErrorMessage(null)
        setErrorStyle(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()

    window.localStorage.clear()
    setUser(null)
  }


  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>

        <div className={errorStyle}>{errorMessage}</div>

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
          <button id='login' type='submit'>login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>

      <div className={errorStyle}>{errorMessage}</div>
      <div>{user.name} is logged in <button onClick={handleLogout}>logout</button></div>

      <h2>Create new</h2>
      
      <Togglable 
        buttonLabel='New blog' 
        /*ref={blogFormRef}*/
        visibility={visibility}
        setVisibility={setVisibility}>
          <AddBlog 
            setErrorMessage={setErrorMessage} 
            setErrorStyle={setErrorStyle}
            setBlogs={setBlogs}
            setVisibility={setVisibility} />
      </Togglable>
      
      <br></br>
      
      <div id='every-second'>
          {blogs.map(blog =>
            <Bloggable 
              key={blog.id}
              url={blog.url}
              likes={blog.likes}
              user={blog.user}
              setBlogs={setBlogs}
              id={blog.id}
              blogTitle={blog.title}
              loggedInUser={user}>
                <Blog key={blog.id} blog={blog} />
            </Bloggable>
          )}
      </div>    
    </div>
  )
}

export default App