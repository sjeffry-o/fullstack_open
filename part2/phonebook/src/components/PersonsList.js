import personsService from '../services/persons'

const handleDelete = (props) => {
	if (window.confirm(`wanna delete ${props[1]}!?`))
		personsService.delete_person(props[0]).catch(error => {
			props[2](`error: ${props[1]} was already removed from the server`)
			setTimeout(() => {
			  props[2](null)
			}, 5000)
		})
}

const PersonsList = (props) => {
	if (props.nameFilter === '')
		return (
		<div>
			{
			props.persons.map(person => 
			<p key={person.id} className='note'>
			{person.name} {person.number} 
			<button onClick={() => handleDelete([person.id, person.name, props.setInfo])}>delete</button>
			</p>)
			}
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
