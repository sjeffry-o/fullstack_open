const morgan = require('morgan')
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const Person = require('./models/Person')
const app = express()

app.use(express.static('build'))
app.use(express.json())
app.use(cors())

app.use(morgan((tokens, req, res) => {
  const method = tokens.method(req, res)
  //console.log(method, typeof method)
  //console.log(req.body)
  if (method === 'POST')
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      JSON.stringify(req.body)
    ].join(' ')
  else
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms'
    ].join(' ')
}))
//app.use(morgan('tiny'))
const errorHandler = (error, request, response, next) => {
  console.log(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({error: 'malformattedd id'})
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({error: error.message})
  }

  next(error)
}
app.use(errorHandler)

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person)
        response.json(person)
      else
        response.status(404).end()
    })
    .catch(error => {
      console.log(error)
      response.status(400).send({ error: 'malformatted id' })
    })
})

app.get('/info', (request, response, next) => {
  Person.count()
    .then(count => {
      response.send(`
      <p>Phonebook has info for ${count} people</p>
      <p>${new Date().toISOString()}</p>`)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/delete/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      console.log(result)
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  console.log(body)
  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true, runValidators: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const reqInfo = request.body

  if (!reqInfo)
    return response.status(400).send({ error: 'content is missing' }).end()
    
  const person = new Person({
    name: reqInfo.name,
    number: reqInfo.number
  })
  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
    .catch(error => next(error))
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
