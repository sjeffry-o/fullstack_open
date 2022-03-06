const morgan = require('morgan')
const express = require('express')
const fs = require('fs');
const path = require('path');
const app = express()

app.use(express.json())

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
	response.json(read_parseJson('db.json'))
})

app.get('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id)
	const person = get_person(id)
	if (person)
		response.json(person)
	else
		response.status(404).end()
})

app.get('/info', (request, response) => {
	const parsed_db = read_parseJson('db.json')
	response.send(`
		<p>Phonebook has info for ${parsed_db.length} people</p>
		<p>${new Date().toISOString()}</p>`)
})

app.delete('/api/persons/delete/:id', (request, response) => {
	const id = Number(request.params.id)
	const db = read_parseJson('db.json')
	const updated_db = db.filter(person => person.id !== id)
	parse_writeJson('db.json', updated_db)
	console.log('deletion request on', id, 'done', 'object written', json)
	console.log(write)
})

app.post('/api/persons', (request, response) => {
	const newId = getRandomInt(1000)
	const parsed_db = read_parseJson('db.json')
	const reqInfo = request.body

	if (!reqInfo.name)
		return response.status(500).send('name is missing').end()
	if (!reqInfo.number)
		return response.status(500).send('name is missing').end()
	if (!uniqueName(reqInfo.name, parsed_db))
		return response.status(500).send('name must be unique').end()
	parsed_db.push({id: newId, name: reqInfo.name, number: String(reqInfo.number)})
	parse_writeJson('db.json', parsed_db)
	console.log(parsed_db)
})

const PORT = 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
