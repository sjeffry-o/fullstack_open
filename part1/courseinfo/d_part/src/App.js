import {useState} from 'react'

/*const App = () => {
  const [clicks, setClicks] = useState({
    left: 0, right: 0
  })
  const [AllClicks, setAll] = useState([])

  const handleLeftClick = () => {
    setAll(AllClicks.concat('L'))
    setClicks({ ...clicks, left: clicks.left + 1})
  }

  const handleRightClick = () => {
    setAll(AllClicks.concat('R'))
    setClicks({ ...clicks, right: clicks.right + 1 })
  }
  
  const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
  )

  const History = (props) => {
	  if (props.allClicks.length === 0) {
	    return (
	      <div>
		the app is used by pressing the buttons
	      </div>
	    )
	  }
	  return (
	    <div>
	      button press history: {props.allClicks.join(' ')}
	    </div>
	  )
	  }

	  return (
	    <div>
	      {clicks.left}
	      <Button handleClick={handleLeftClick} text='left' />
      	      <Button handleClick={handleRightClick} text='right' />
	      {clicks.right}
	      <History allClicks={AllClicks} />
	    </div>
	  )
}*/

const Hello = (who) => () => {console.log('hello there', who)}

/*const Hello = (whom) => {
const handler = () => {
	console.log('hello there', whom)
}
return handler
}*/

const App = () => {
  const [value, setValue] = useState(10)

  const setOnValue = (val) => () => {setValue(val)}

  return (
    <div>
      {value}
      <button onClick={Hello('world')}>console_world</button>
      <button onClick={Hello('react')}>console_react</button>
      <button onClick={Hello('function')}>console_func</button>
      <button onClick={setOnValue(100)}>set_to100</button>
      <button onClick={setOnValue(245)}>set_to245</button>
      <button onClick={setOnValue(value + 1)}>plus</button>
    </div>
  )
}

export default App
