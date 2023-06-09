const CreateBlog =({title,createblog,setTitle,author,setAuthor,setUrl,url})=>{
    return (
        <div>
            <h2>Create New Blog</h2>
            <form onSubmit={createblog}>
                <div>
                    Title: 
                    <input 
                    value={title} 
                    onChange={({target})=>{setTitle(target.value)}} ></input>
                </div>
                <div>
                    Author: 
                    <input 
                    value={author} 
                    onChange={({target})=>{setAuthor(target.value)}} ></input>
                </div>
                <div>
                    URL: 
                    <input 
                    value={url}
                    onChange={({target})=>{setUrl(target.value)}} ></input>
                </div>
                <div>
                    <button type="submit">Create</button>
                </div>
                

            </form>
        </div>
    )
}

export default CreateBlog