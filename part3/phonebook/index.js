const express = require('express')
const fs = require('fs');
const path = require('path');
const app = express()

app.use(express.json())
const http = require('http')

const read_parseJson = (filepath) => {
	const rawdata = fs.readFileSync(path.resolve(__dirname, filepath));
	const persons = JSON.parse(rawdata);
	console.log(persons);
	return persons
}

const get_person = (id) => {
	const db = read_parseJson('db.json')
	const person = db.filter(person => person.id === id)[0]
	console.log(person)
	return person
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
	parsed_db = read_parseJson('db.json')
	response.send(`
		<p>Phonebook has info for ${parsed_db.length} people</p>
		<p>${new Date().toISOString()}</p>`)
})

const PORT = 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
