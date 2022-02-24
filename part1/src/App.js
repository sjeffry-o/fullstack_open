const Header = (data) => {
	return (
	<div>
      		<h1>{data.course}</h1>
	</div>
	)
}

const Content = (data) => {
	return (
	<div>
	      <p>
		{data.part1} {data.exercises1}
	      </p>
	      <p>
		{data.part2} {data.exercises2}
	      </p>
	      <p>
		{data.part3} {data.exercises3}
	      </p>
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
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content part1={part1} exercises1={exercises1} 
	       part2={part2} exercises2={exercises2} 
 	       part3={part3} exercises3={exercises3}/>
      <Total exercises1={exercises1} exercises2={exercises2} exercises3={exercises3} />
    </div>
  )
}

export default App
