const Blog = ({ blog, user }) => {
  return (
    <div>
      <p>{user.name} logged in <button onClick={window.localStorage.removeItem('loggedBlogAppUser')}>log out</button></p> 
      <div>
        {blog.title} {blog.author}
      </div>
    </div>
  )
}

export default Blog
