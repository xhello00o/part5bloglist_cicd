import { useState } from 'react'
const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const Blog = ({ blog,addLike,deleteblog }) => {
  console.log('blogcomp',blog)
  const [detailVisible, setDetailsVisible] = useState(false)

  const handlevisible =(event) => {
    event.preventDefault()
    setDetailsVisible(!detailVisible)
  }

  const handlelike =(event) => {
    event.preventDefault()
    addLike(blog.id)
    setDetailsVisible(true)
  }

  const handledelete = (event) => {
    event.preventDefault()
    deleteblog(blog.id,blog)


  }


  return (
    <div style={blogStyle}>

      {detailVisible?
        <p> {blog.title} {blog.author} <button onClick={handlevisible}>hide</button> <br />
          {blog.url} <br />
    likes {blog.likes} <button onClick={handlelike}>like</button> <br />
          {blog.user.name}<br />
          <button onClick={handledelete}> remove </button>
        </p>
        :<p> {blog.title} {blog.author} <button onClick={handlevisible}>view</button></p>

      }

    </div>

  )
}

export default Blog