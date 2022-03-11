const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const likeCounter = (sum, blog) => {
    return sum + blog.likes
  }
  return blogs.length === 0
  ? 0
  : blogs.reduce(likeCounter, 0)
}

module.exports = {
  dummy, totalLikes
}
