import { useState } from 'react'
import noteService from '../services/persons'

const PersonsForm = (props) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPerson = (event) => {
	  if (props.persons.some(person => person.name === newName))
	  {
		  if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`))
		  {
			  const our_person = props.persons.filter(
				  person => person.name === newName
			  	)[0]
			  const updated_person = { ...our_person, number:newNumber}
			  noteService.replace(updated_person)
		  }
	  }
	  else 
	  {
		  event.preventDefault()
		  
		  const new_person = {  name: newName, 
					number: newNumber,
					id: props.persons.length + 1}
		  noteService.create(new_person)
		  props.setPersons(props.persons.concat(new_person))
		  props.setMessage(`${new_person.name} added`)
		  setTimeout(() => {
			  props.setMessage(null)
			}, 5000)
	  }
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
