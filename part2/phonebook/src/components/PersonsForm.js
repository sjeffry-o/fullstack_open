import { useState } from 'react'

const PersonsForm = (props) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPerson = (event) => {
	  if (props.persons.some(person => person.name === newName))
		  return alert(`${newName} is already added to phonebook`)
	  event.preventDefault()
	  
	  const new_person = {  name: newName, 
		  		number: newNumber,
	  			id: props.persons.length + 1}
	  props.setPersons(props.persons.concat(new_person))
  }

  const nameSetting = (event) => {
	  setNewName(event.target.value)
  }

  const numberSetting = (event) => {
	  setNewNumber(event.target.value)
  }

  return (
	<div>
	<form onSubmit={addPerson}>
	  <div>name: <input onChange={nameSetting}/></div>
	  <div>number: <input onChange={numberSetting}/></div>
	  <div><button type="submit">add</button></div>
	</form>
	</div>
  )
}

export default PersonsForm
