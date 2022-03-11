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

const favoriteBlog = (blogs) => {
  let maxLikesIdx = 0
  blogs.forEach((blog, i, blogs) => {
    if (blogs[i].likes > blogs[maxLikesIdx].likes)
      maxLikesIdx = i
  })
  return blogs.length === 0
  ? {}
  : blogs[maxLikesIdx]
}

module.exports = {
  dummy, totalLikes, favoriteBlog
}
