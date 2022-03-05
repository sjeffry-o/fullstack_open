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

app.get('/api/persons', (request, response) => {
	response.json(read_parseJson('db.json'))
})

const PORT = 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
