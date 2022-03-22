const Blog = ({ blog }) => {
  return (
    <div>
      <div>
        {blog.title} {blog.author} {blog.url}
      </div>
    </div>
  )
}

export default Blog
