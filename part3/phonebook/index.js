const morgan = require('morgan')
require('dotenv').config()
const express = require('express')
const fs = require('fs');
const path = require('path');
const cors = require('cors');
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
	}

	next(error)
}
app.use(errorHandler)
const http = require('http')

const getRandomInt = (max) => {
	return (Math.floor(Math.random() * max))
}

const read_parseJson = (filepath) => {
	const rawdata = fs.readFileSync(path.resolve(__dirname, filepath));
	const persons = JSON.parse(rawdata);
	console.log(persons);
	return persons
}

const parse_writeJson = (filepath, newJson) => {
	const json = JSON.stringify(newJson)
        const write = fs.writeFileSync(filepath, json)
}

const get_person = (id) => {
	const db = read_parseJson('db.json')
	const person = db.filter(person => person.id === id)[0]
	return person
}

const uniqueName = (name, db) => {
	if (db.some(person => person.name === name))
		return (false)
	else 
		return (true)
}

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

app.get('/info', (request, response) => {
	const parsed_db = read_parseJson('db.json')
	response.send(`
		<p>Phonebook has info for ${parsed_db.length} people</p>
		<p>${new Date().toISOString()}</p>`)
})

app.delete('/api/persons/delete/:id', (request, response) => {
	Person.findByIdAndRemove(request.params.id)
	.then(result => {
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

	Person.findByIdAndUpdate(request.params.id, body, { new: true })
	.then(updatedPerson => {
		response.json(updatedPerson)
	})
	.catch(error => next(error))
})

app.post('/api/persons', (request, response) => {
	const reqInfo = request.body

	if (!reqInfo)
		return response.status(400).send({ error: 'content is missing' }).end()
	if (!reqInfo.name)
		return response.status(400).send({ error: 'name is missing' }).end()
	if (!reqInfo.number)
		return response.status(400).send({ error: 'name is missing' }).end()
	
	const person = new Person({
		name: reqInfo.name,
		number: reqInfo.number
	})
	person.save().then(savedPerson => {
		response.json(savedPerson)
	})
})

const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
