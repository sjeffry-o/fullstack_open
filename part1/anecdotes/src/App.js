import { useState } from 'react'

const Header = (props) => {
	return (
	<h1>{props.text}</h1>
	)
}

const random_idx = (max) => {
	return (Math.floor(Math.random() * max))
}

const Button = (props) => {
	return (
		<button onClick={props.onclick}>{props.text}</button>
	)
}

const maxElemIdx = (points) => {
	var maxIdx = 0
	var idx = 0

	while (idx < points.length)
	{
		if (points[idx] > points[maxIdx])
		{
			maxIdx = idx
		}
		idx++
	}
	return (maxIdx)
}

const SelectMostVotesAnecdote = (props) => {
	const anecs = { ...props.anecdotes }
	return (
	<div>
		<p>{anecs[maxElemIdx(props.points)]}</p>
		<p>has {props.points[maxElemIdx(props.points)]} votes</p>
	</div>
	)
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
  const [selected, setSelected] = useState(random_idx(anecdotes.length))
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0))
  const vote = (idx) => {
	const copy = [ ...points ]
	copy[idx] += 1
	setPoints(copy)
  }

  return (
    <div>
	<Header text="Anecdote of the day"/>
	<div>{anecdotes[selected]}</div>
	<div>has {points[selected]} votes</div>
	<Button onclick={() => {vote(selected)}} text={"vote"} />
	<Button onclick={() => setSelected(random_idx(anecdotes.length))} text={"next anecdote"} />
	<Header text="Anecdote with the most votes" />
	<SelectMostVotesAnecdote anecdotes={anecdotes} points={points} />
    </div>
  )
}

export default App
