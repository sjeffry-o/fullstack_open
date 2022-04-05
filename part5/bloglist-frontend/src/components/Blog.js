import blogsService from '../services/blogs'

const Blog = ({ blog, user }) => {
  const handleLike = (event) => {
    event.preventDefault()
    const likedUser = {...blog, likes: (blog.likes ? blog.likes + 1 : 1), user:blog.user.id}
    console.log(likedUser)
    blogsService.replace(likedUser)
  }
  return (
    <div>
      <div>
        {blog.url}
        <br></br>likes: {blog.likes ? blog.likes : 0} <button onClick={handleLike}>like</button>
        <br></br>{user.name}
      </div>
    </div>
  )
}

export default Blog
