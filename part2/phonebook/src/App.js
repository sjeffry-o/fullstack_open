import { useState } from 'react'

const PersonsList = (props) => {
	if (props.nameFilter === '')
		return (
		<div>
		{props.persons.map(person => <p key={person.id}>{person.name} {person.number}</p>)}
		</div>
		)
	else
		return (
		<div>
		{props.persons.filter(({name}) => 
			name.toLowerCase().includes(props.nameFilter.toLowerCase())).map(person => 
				<p key={person.id}>{person.name} {person.number}</p>)}
		</div>
		)
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPerson = (event) => {
	  if (persons.some(person => person.name === newName))
		  return alert(`${newName} is already added to phonebook`)
	  event.preventDefault()
	  
	  const new_person = {  name: newName, 
		  		number: newNumber,
	  			id: persons.length + 1}
	  setPersons(persons.concat(new_person))
  }

  const nameSetting = (event) => {
	  setNewName(event.target.value)
  }

  const numberSetting = (event) => {
	  setNewNumber(event.target.value)
  }

  const filterSetting = (event) => {
	  setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <div>filter shown with: <input onChange={filterSetting}/></div>
      <h3>add a new</h3>
      <form onSubmit={addPerson}>
        <div>name: <input onChange={nameSetting}/></div>
        <div>number: <input onChange={numberSetting}/></div>
        <div><button type="submit">add</button></div>
      </form>
      <h3>Numbers</h3>
	<PersonsList persons={persons} nameFilter={newFilter}/>
    </div>
  )
}

export default App
