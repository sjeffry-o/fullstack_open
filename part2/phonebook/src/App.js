import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addPerson = (event) => {
	  if (persons.some(person => person.name === newName))
		  return alert(`${newName} is already added to phonebook`)
	  event.preventDefault()
	  
	  const new_person = {name: newName}
	  setPersons(persons.concat(new_person))
  }

  const nameSetting = (event) => {
	  setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input onChange={nameSetting}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <p key={person.name}>{person.name}</p>)}
    </div>
  )
}

export default App
