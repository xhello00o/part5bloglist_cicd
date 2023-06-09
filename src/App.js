import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import CreateBlog from './components/CreateBlog'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'

const Notification = ({ message, effect }) => {
  if (message === null) {
    return null
  }
  else {
    let cssclass = 'error'
    if (effect) {
      cssclass = 'success'
    }
    return (
      <div className={cssclass}>
        {message}
      </div>
    )
  }
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [errorEffect, setErrorEffect] = useState(true)

  const handlelogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      console.log(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
      setUser(user)
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
    } catch (exception) {
      console.log(exception)
      setErrorMessage('Wrong credentials')
      setErrorEffect(false)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    console.log(`Logging in with ${username} and ${password}`)
  }


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const loginform = () => (
    <LoginForm
      handlelogin={handlelogin}
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}>
    </LoginForm>)

  const handlelogout = (event) => {
    console.log('logout')
    window.localStorage.clear()
    setUser(null)
  }
  const handlecreate = async (event) => {
    event.preventDefault()
    const newblog = {
      title,
      author,
      url
    }
    try {
      const blogres = await blogService.create(newblog)
      console.log(blogres)
      const addedblogs = blogs.concat(blogres)
      setBlogs(addedblogs)
      setAuthor('')
      setTitle('')
      setUrl('')
      setErrorMessage(`'${title}' by ${author} was created!`)
      setErrorEffect(true)
      setTimeout(() => setErrorMessage(null), 5000)
    } catch (err) {
      console.log(err)
      setErrorMessage(err.response.data.error)
      setErrorEffect(false)
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }




const showblogs = () => {

  return (

    <div>
      
      <h2>Blogs</h2>
      <p>
        {user.name} logged in <button onClick={handlelogout}>logout</button>
      </p>
      <CreateBlog
        title={title}
        createblog={handlecreate}
        setTitle={setTitle}
        author={author}
        setAuthor={setAuthor}
        setUrl={setUrl}
        url={url} />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}



return (
  <div>
    <Notification message={errorMessage} effect={errorEffect}></Notification>
    {user === null ? loginform() : showblogs()}
  </div>
)
  
}

export default App