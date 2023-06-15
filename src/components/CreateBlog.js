import { useState } from 'react'

const CreateBlog = ({ createblogreq, handlecancel }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createblog =(event) => {
    event.preventDefault()
    const newblog = {
      title,
      author,
      url,
    }
    createblogreq(newblog)
    setAuthor('')
    setTitle('')
    setUrl('')
  }


  return (
    <div>
      <h2>Create New Blog</h2>
      <form onSubmit={createblog}>
        <div>
                    Title:
          <input
            id ='title'
            value={title}
            onChange={({ target }) => { setTitle(target.value) }}
            placeholder = 'e.g The Little Red Riding Hood...' />
        </div>
        <div>
                    Author:
          <input
            id = 'author'
            value={author}
            onChange={({ target }) => { setAuthor(target.value) }}
            placeholder = {'Name like Ronald McDonalds...'}/>
        </div>
        <div>
                    URL:
          <input
            id = 'url'
            value={url}
            onChange={({ target }) => { setUrl(target.value) }}
            placeholder = 'www.readabook.com...'/>
        </div>
        <div>
          <button type="submit">Create</button>
        </div>
      </form>
      <button onClick={handlecancel}>cancel</button>
    </div>
  )
}

export default CreateBlog