import { useState, useEffect } from 'react'
import PersonsList from './components/PersonsList'
import PersonsForm from './components/PersonsForm'
import NotificationAck from './components/NotificationAck'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const [infoMessage, setInfoMessage] = useState(null)

  const filterSetting = (event) => {
	  setNewFilter(event.target.value)
  }

  const hook = () => {
	  personsService.getAll()
	  .then(
	  persons => {
		  console.log('promise fullfilled')
		  setPersons(persons)
	  }
	  )
  }
  useEffect(hook, [])
  return (
    <div>
      <h2>Phonebook</h2>
	<NotificationAck message={infoMessage}/>
        <div>filter shown with: <input onChange={filterSetting}/></div>
      <h3>add a new</h3>
	  <PersonsForm persons={persons} setPersons={setPersons} setMessage={setInfoMessage}/>
      <h3>Numbers</h3>
	<PersonsList persons={persons} nameFilter={newFilter} setInfo={setInfoMessage}/>
    </div>
  )
}

export default App
