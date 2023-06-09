import { useState } from 'react'

const CreateBlog = ({ createblogreq, handlecancel}) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [url, setUrl] = useState("");

    const createblog =(event) =>{
        event.preventDefault()
        const newblog = {
            title,
            author,
            url,
          };
        createblogreq(newblog)
        setAuthor("")
        setTitle("")
        setUrl("")
    }


    return (
        <div>
            <h2>Create New Blog</h2>
            <form onSubmit={createblog}>
                <div>
                    Title:
                    <input
                        value={title}
                        onChange={({ target }) => { setTitle(target.value) }} ></input>
                </div>
                <div>
                    Author:
                    <input
                        value={author}
                        onChange={({ target }) => { setAuthor(target.value) }} ></input>
                </div>
                <div>
                    URL:
                    <input
                        value={url}
                        onChange={({ target }) => { setUrl(target.value) }} ></input>
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