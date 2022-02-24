const Header = (data) => {
	console.log(data)
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

const App = () => {
  const course = {
  name: 'Half Stack application development',
  parts: [
  {
    name: 'Fundamentals of React',
    exercises: 10
  },
  {
    name: 'Using props to pass data',
    exercises: 7
  },
  {
    name: 'State of a component',
    exercises: 14
  }
  ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content part1={course.parts[0]} part2={course.parts[1]} part3={course.parts[2]}/>
      <Total exercises1={course.parts[0].exercises} 
	     exercises2={course.parts[1].exercises} 
             exercises3={course.parts[2].exercises} />
    </div>
  )
}

export default App
