import { useState } from 'react'

const Header = (props) => {
	return (
	<h1>{props.text}</h1>
	)
}

const Button = (props) => {
	return (
	<button onClick={props.onclick}>{props.text}</button>
	)
}

const DisplayStat = (props) => {
	return (
	<p>{props.text} {props.value}</p>
	)
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
	<Header text="give feedback" />
	<Button onclick={() => setGood(good + 1)} text={"good"} />
	<Button onclick={() => setNeutral(neutral + 1)} text={"neutral"} />
	<Button onclick={() => setBad(bad + 1)} text={"bad"} />
	<Header text="statistics" />
	<DisplayStat text="good" value={good} />
	<DisplayStat text="neutral" value={neutral} />
	<DisplayStat text="bad" value={bad} />
    </div>
  )
}

export default App
