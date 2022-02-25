import {useState} from 'react'

const App = () => {
	const [counter, setCounter] = useState(0)

	/*setTimeout(
		() => setCounter(counter + 1),
		1000
	)*/

	/*const handleClick = () => {
		console.log('clicked')
	}*/

	const Display = ({counter}) => {
		return (
			<div>{counter}</div>
		)
	}
	const Button = ({onclick, text}) => {
		return (
			 <button onClick={onclick}>
			  {text}
			 </button>
		)
	}
	const increaseByOne = () => setCounter(counter + 1)
	const resetToZero = () => setCounter(0)
	const decreaseByTwo = () => setCounter(counter - 2)

	//console.log("rendering", counter)

	return (
	<div>
		<Display counter={counter} />
		<Button onclick={increaseByOne} text={'plus'} />
		<Button onclick={resetToZero} text={'reset'} />
		<Button onclick={decreaseByTwo} text={'minus two'} />
	</div>
	)
}

export default App
