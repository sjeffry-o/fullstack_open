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

export default PersonsList
