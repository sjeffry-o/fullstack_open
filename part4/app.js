const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const config = require('./utils/config')

const mongoUrl = config.MONGODB_URL
mongoose.connect(mongoUrl)
  .then(() => { 
    logger.info(`connected to MongoDB`) })
  .catch((error) => { 
    logger.error('Error happened while trying connect to MongoDB:', error) 
  })

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Blog = mongoose.model('Blog', blogSchema)

app.use(cors())
app.use(express.json())

app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

module.exports = app
