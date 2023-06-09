import { useState } from "react";
const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const Blog = ({blog}) => {  
  console.log("blogcomp",blog)
  const [detailVisible, setDetailsVisible] = useState(false)

const handlevisible =(event)=>{
  event.preventDefault()
  setDetailsVisible(!detailVisible)
}

  return (  
  <div style={blogStyle}>
    
    {detailVisible?
    <p> {blog.title} {blog.author} <button onClick={handlevisible}>hide</button> <br />
    {blog.url} <br />
    likes {blog.likes} <button>like</button> <br />    
    {blog.user.name}
  </p>
    :<p> {blog.title} {blog.author} <button onClick={handlevisible}>view</button></p>
      
    }

  </div>
  
    )
}

export default Blog