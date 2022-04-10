import blogService from '../services/blogs'

const NewBlog = (props) => {
  const handleBlogAdd = () => {
    const newBlog = {
                     url:props.newBlogUrl,
                     title:props.newBlogTitle,
                     author:props.newBlogAuthor,
                     likes:0,
                     user:props.user
                    }
    blogService.create(newBlog)
    props.setInfoMessage(`a new blog '${props.newBlogTitle}' by ${props.newBlogAuthor} added`)
    setTimeout(() => {
      props.setInfoMessage(null)
    }, 5000)
    props.setNewBlogTitle('')
    props.setNewBlogAuthor('')
    props.setNewBlogUrl('')
    props.newBlogRef.current.toggleVisibility()
    const updatedBlogs = props.blogs.concat(newBlog)
    props.setBlogs(updatedBlogs)
  }
  return (
    <div>
        <div>
          title:
            <input
            id='title'
            type="text"
            value={props.newBlogTitle}
            name="Title"
            onChange={({ target }) => props.setNewBlogTitle(target.value)}
          />
        </div>
        <div>
          author:
            <input
            id='author'
            type="text"
            value={props.newBlogAuthor}
            name="Author"
            onChange={({ target }) => props.setNewBlogAuthor(target.value)}
          />
        </div>
        <div>
          url:
            <input
            id='url'
            type="text"
            value={props.newBlogUrl}
            name="URL"
            onChange={({ target }) => props.setNewBlogUrl(target.value)}
          />
        </div>
      <button id="createButton" onClick={handleBlogAdd}>create</button>
    </div>
  )
}

export default NewBlog
