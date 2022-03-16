const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const config = require('./utils/config')
const Blog = require('./models/blog')
const loginRouter = require('./controllers/login')
const usersRouter = require('./controllers/users')

const mongoUrl = config.MONGODB_URL
mongoose.connect(mongoUrl)
  .then(() => { 
    logger.info(`connected to MongoDB`) })
  .catch((error) => { 
    logger.error('Error happened while trying connect to MongoDB:', error) 
  })

app.use(cors())
app.use(express.json())
app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)

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
