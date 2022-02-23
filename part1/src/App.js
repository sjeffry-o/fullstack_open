const Info = (data) => {
	console.log("info logging")
	return (
	<div>
	 <p>Hello everybody!</p>
	 <p>I'm {data.name}</p>
	</div>
	)
}

const App = () => {
	console.log("and here they comes")
	const now = new Date()
	const funny_str = "☕☕"
	const num = 10
	return (
	<div>
	 <p>Hello EVERYONE!</p>
	 <p>It is {now.toString()} and i bring you coffee {funny_str}</p>
	 <p>Also we have a number {funny_str} {num} {funny_str}</p>
	 <Info name="Moto Moto Hashimoto" />
	</div>
	)
}

export default App;
