import { useState } from 'react'
import PersonsList from './components/PersonsList'
import PersonsForm from './components/PersonsForm'



const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newFilter, setNewFilter] = useState('')

  const filterSetting = (event) => {
	  setNewFilter(event.target.value)
  }

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
