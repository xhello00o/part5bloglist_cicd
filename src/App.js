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
  } else {
    let cssclass = 'error'
    if (effect) {
      cssclass = 'success'
    }
    return <div className={cssclass}>{message}</div>
  }
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [errorEffect, setErrorEffect] = useState(true)
  const [visible, setVisible] = useState(false)

  const handlelogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      console.log(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
      setUser(user)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
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

  const setSortedBlogs = (blogs) => {
    const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
    setBlogs(sortedBlogs)
  }

  useEffect(() => {
    blogService.getAll().then((blogs) => setSortedBlogs(blogs))
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
      setPassword={setPassword}
    ></LoginForm>
  )

  const handlelogout = () => {
    console.log('logout')
    window.localStorage.clear()
    setUser(null)
  }

  const handlecreate = async (newBlogObj) => {
    try {
      const blogres = await blogService.create(newBlogObj)
      console.log('blogres', blogres)
      const addedblogs = blogs.concat(blogres)
      console.log('addedblogs', addedblogs)
      setSortedBlogs(addedblogs)
      setErrorMessage(`'${newBlogObj.title}' by ${newBlogObj.author} was created!`)
      setErrorEffect(true)
      setTimeout(() => setErrorMessage(null), 5000)
      setVisible(false)
    } catch (err) {
      console.log(err)
      setErrorMessage(err.response.data.error)
      setErrorEffect(false)
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  const handlecancel = (event) => {
    event.preventDefault()
    console.log('change visible')
    setVisible(false)
  }

  const handlelikes = async (blogid) => {
    const blogtoupdate = blogs.find(blog => blog.id === blogid)
    const updateblogindex = blogs.indexOf(blogtoupdate)
    blogtoupdate.likes += 1
    console.log(blogtoupdate)
    const likeres = await blogService.addLike(blogid, blogtoupdate)
    console.log('likeres', likeres)
    const updatedblogs = [...blogs]
    updatedblogs[updateblogindex].likes = likeres.likes
    setSortedBlogs(updatedblogs)
  }

  const deleteblog = async (blogid, blog) => {
    if (window.confirm(`remove blog '${blog.title}' by ${blog.author} `)) {
      const response = await blogService.deleteblog(blogid)
      console.log('delresp', response)
      const postdeleteblogs = blogs.filter(blog => blog.id !== response.id)
      console.log(postdeleteblogs)
      setSortedBlogs(postdeleteblogs)
    }

  }

  const showblogs = () => {
    return (
      <div>
        <h2>Blogs</h2>
        <p>
          {user.name} logged in <button onClick={handlelogout}>logout</button>
        </p>
        {visible ? (
          <CreateBlog
            createblogreq={handlecreate}
            handlecancel={handlecancel}
          />
        ) : (
          <button onClick={() => setVisible(true)}>Create New Blog</button>
        )}

        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} addLike={handlelikes} deleteblog={deleteblog} user={user} />
        ))}
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
