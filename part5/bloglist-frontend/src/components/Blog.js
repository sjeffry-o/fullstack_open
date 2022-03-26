const Blog = ({ key, blog, user }) => {
  return (
    <div>
      <div>
        {blog.url}
        <br></br>likes: {blog.likes ? blog.likes : 0} <button>like</button>
        <br></br>{user.name}
      </div>
    </div>
  )
}

export default Blog
