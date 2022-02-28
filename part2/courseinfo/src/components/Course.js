const Header = (data) => {
	return (
	<div>
      		<h1>{data.course}</h1>
	</div>
	)
}

const Part = (data) => {
	return (
	<div>
	      <p>
		{data.part} {data.exercises}
	      </p>
	</div>
	)
}

const Content = (data) => {
	return (
	<div>
      		<Part part={data.part1.name} exercises={data.part1.exercises} />
      		<Part part={data.part2.name} exercises={data.part2.exercises} />
      		<Part part={data.part3.name} exercises={data.part3.exercises} />
	</div>
	)
}

const Total = (data) => {
	return (
	<div>
      	      <p>Number of exercises {data.exercises1 + data.exercises2 + data.exercises3}</p>
	</div>
	)
}

const Course = (props) => {
	console.log(props)
	props = props.course
	return (
	<div>
		<Header course={props.name} />
		<Content part1={props.parts[0]} part2={props.parts[1]} part3={props.parts[2]}/>
		<Total exercises1={props.parts[0].exercises} 
		     exercises2={props.parts[1].exercises} 
		     exercises3={props.parts[2].exercises} />
	</div>
	)
}

export default Course
