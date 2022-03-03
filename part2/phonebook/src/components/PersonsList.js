import personsService from '../services/persons'

const handleDelete = (props) => {
	if (window.confirm(`wanna delete ${props[1]}!?`))
		personsService.delete_person(props[0])
}

const PersonsList = (props) => {
	if (props.nameFilter === '')
		return (
		<div>
		{props.persons.map(person => <p key={person.id}>{person.name} {person.number} <button onClick={() => handleDelete([person.id, person.name])}>delete</button></p>)}
		</div>
		)
	else
		return (
		<div>
		{props.persons.filter(({name}) => 
			name.toLowerCase().includes(props.nameFilter.toLowerCase())).map(person => 
				<p key={person.id}>{person.name} {person.number} </p>)}
		</div>
		)
}

export default PersonsList
