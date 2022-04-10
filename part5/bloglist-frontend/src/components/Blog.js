import blogsService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, blogs, setBlogs }) => {
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
        <br></br>likes: {blog.likes ? blog.likes : 0} <button id="likeButton" onClick={handleLike}>like</button>
        <br></br>{blog.user.name}
        <br></br><button onClick={handleRemove}>remove</button>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
}

export default Blog
