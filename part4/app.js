const express = require('express')
const cors = require('cors')
const app = express()

const mongoose = require('mongoose')
const Blog = require('./models/blog')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

const loginRouter = require('./controllers/login')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const testingRouter = require('./controllers/testing')

const mongoUrl = config.MONGODB_URL
mongoose.connect(mongoUrl)
  .then(() => { 
    logger.info(`connected to MongoDB`) })
  .catch((error) => { 
    logger.error('Error happened while trying connect to MongoDB:', error) 
  })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/testing', testingRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
