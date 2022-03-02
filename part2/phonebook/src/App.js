import { useState, useEffect } from 'react'
import PersonsList from './components/PersonsList'
import PersonsForm from './components/PersonsForm'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newFilter, setNewFilter] = useState('')

  const filterSetting = (event) => {
	  setNewFilter(event.target.value)
  }

  const hook = () => {
	  axios.get('http://localhost:3001/persons').then(
		  response => {
			  console.log('promise fullfilled')
			  setPersons(response.data)
		  }
	  )
  }
  useEffect(hook, [])
  return (
    <div>
      <h2>Phonebook</h2>
        <div>filter shown with: <input onChange={filterSetting}/></div>
      <h3>add a new</h3>
	  <PersonsForm persons={persons} setPersons={setPersons}/>
      <h3>Numbers</h3>
	<PersonsList persons={persons} nameFilter={newFilter}/>
    </div>
  )
}

export default App
