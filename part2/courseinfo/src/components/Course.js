const CourseHeader = (data) => {
	return (
	<div>
      		<h2>{data.course}</h2>
	</div>
	)
}

const Content = (data) => {
	return (
	<div>
		{data.parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)}
	</div>
	)
}

const Total = (data) => {
	var initVal = 0;
	const total = data.parts.reduce((s, p) => {
		initVal += p.exercises
  		console.log('what is happening', s, p.exercises)
		return (initVal)
	}, initVal)
	return (
	<div>
      	      <p><b>Total of {total} exercises</b></p>
	</div>
	)
}

const Course = (props) => {
	console.log(props)
	props = props.course
	return (
	<div>
		<CourseHeader course={props.name} />
		<Content parts={props.parts} />
		<Total parts={props.parts} />
	</div>
	)
}

export default Course
