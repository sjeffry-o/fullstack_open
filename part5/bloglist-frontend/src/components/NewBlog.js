import blogService from '../services/blogs'

const NewBlog = (props) => {
  return (
    <div>
        <div>
          title:
            <input
            type="text"
            value={props.newBlogTitle}
            name="Title"
            onChange={({ target }) => props.setNewBlogTitle(target.value)}
          />
        </div>
        <div>
          author:
            <input
            type="text"
            value={props.newBlogAuthor}
            name="Author"
            onChange={({ target }) => props.setNewBlogAuthor(target.value)}
          />
        </div>
        <div>
          url:
            <input
            type="text"
            value={props.newBlogUrl}
            name="URL"
            onChange={({ target }) => props.setNewBlogUrl(target.value)}
          />
        </div>
      <button onClick={() => {
                    blogService.create({url:props.newBlogUrl,
                                     title:props.newBlogTitle,
                                     author:props.newBlogAuthor})
                    props.setInfoMessage(`a new blog '${props.newBlogTitle}' by ${props.newBlogAuthor} added`)
                    setTimeout(() => {
                      props.setInfoMessage(null)
                    }, 5000)
                    props.setNewBlogTitle('')
                    props.setNewBlogAuthor('')
                    props.setNewBlogUrl('')
                    props.newBlogRef.current.toggleVisibility()
      }}>create</button>
    </div>
  )
}

export default NewBlog
