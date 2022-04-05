import blogsService from '../services/blogs'

const Blog = ({ blog, user, blogs, setBlogs }) => {
  const handleLike = (event) => {
    event.preventDefault()
    const likedUser = {...blog, likes: (blog.likes ? blog.likes + 1 : 1), user:blog.user.id}
    console.log(likedUser)
    blogsService.replace(likedUser)

    const blogsUpd = blogs.filter(nBlog => nBlog.id !== blog.id)
    const likedUserUpd = {...likedUser, user:blog.user}
    setBlogs(blogsUpd.concat(likedUserUpd))
  }

  const handleRemove = (event) => {
    event.preventDefault()
    blogsService.remove(blog.id)
    const blogsUpd = blogs.filter(nBlog => nBlog.id !== blog.id)
    setBlogs(blogsUpd)
  }

  return (
    <div>
      <div>
        {blog.url}
        <br></br>likes: {blog.likes ? blog.likes : 0} <button onClick={handleLike}>like</button>
        <br></br>{user.name}
        <br></br><button onClick={handleRemove}>remove</button>
      </div>
    </div>
  )
}

export default Blog
