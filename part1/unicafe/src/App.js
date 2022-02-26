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

/*const DisplayStat = (props) => {
	return (
	<p>{props.text} {props.value}</p>
	)
}*/

const DisplayStatTable = (props) => {
	return (
	<tr>
		<td>{props.text}</td>
		<td>{props.value}</td>
	</tr>
	)
}

const All_Stat = ( {good, neutral, bad} ) => {
	return (good + neutral + bad)
}
const AVG_Stat = ( {good, neutral, bad} ) => {
	return ((good - bad) / All_Stat({good, neutral, bad}))
}
const PositivesPerc_Stat = ( {good, neutral, bad} ) => {
	return (good / All_Stat({good, neutral, bad}) * 100)
}

/*const Statistics = ( {good, neutral, bad} ) => {
	if (All_Stat({ good,neutral,bad} ) === 0)
		return (<p>No feedback given</p>)
	else
		return (
		<div>
			<DisplayStat text="good" value={good} />
			<DisplayStat text="neutral" value={neutral} />
			<DisplayStat text="bad" value={bad} />
			<DisplayStat text="All" value={All_Stat({good, neutral, bad})} />
			<DisplayStat text="average" value={AVG_Stat({good, neutral, bad})} />
			<DisplayStat text="positive" value={PositivesPerc_Stat({good, neutral, bad}) + " %"} />
		</div>
		)
}*/

const StatisticsTable = ( {good, neutral, bad} ) => {
	if (All_Stat({ good,neutral,bad} ) === 0)
		return (<p>No feedback given</p>)
	else
		return (
		<table>
			<tbody>
			<DisplayStatTable text="good" value={good} />
			<DisplayStatTable text="neutral" value={neutral} />
			<DisplayStatTable text="bad" value={bad} />
			<DisplayStatTable text="All" value={All_Stat({good, neutral, bad})} />
			<DisplayStatTable text="average" value={AVG_Stat({good, neutral, bad})} />
			<DisplayStatTable text="positive" value={PositivesPerc_Stat({good, neutral, bad}) + " %"} />
			</tbody>
		</table>
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
	{/*<Button onclick={() => setGood(good + 1000338540758753049875834958)} text={"good"} />
	<Button onclick={() => setNeutral(neutral + 1234546354343593847598)} text={"neutral"} />
	<Button onclick={() => setBad(bad + 13442363574444)} text={"bad"} />*/}
	<Button onclick={() => setGood(good + 1)} text={"good"} />
	<Button onclick={() => setNeutral(neutral + 1)} text={"neutral"} />
	<Button onclick={() => setBad(bad + 1)} text={"bad"} />
	<Header text="statistics" />
	<StatisticsTable good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
