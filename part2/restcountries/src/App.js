import { useState, useEffect } from 'react'
import axios from 'axios'

const DisplayFound = (props) => {
	if (props.found.length > 10)
		return (
		<div>
		<p>Too many matches, specify another filter</p>
		</div>
		)
	if (props.found.length > 1)
		return (
		<div>
		{props.found.map(country => <p key={country.name.official}>
			{country.name.official} 
			<button onClick={() => {props.querySetter(country.name.official)}}>
			show
			</button>
			</p>)}
		</div>
		)
	if (props.found.length === 1)
	{
		const countryInfo = props.found[0]
		const languages = Object.values(countryInfo.languages)
		return (
		<div>
			<h1>{countryInfo.name.official}</h1>
			<p>capital {countryInfo.capital[0]}</p>
			<p>area {countryInfo.area}</p>
			<h3>languages:</h3>
			<ul>
			{languages.map(language => <li key={language}>{language}</li>)}
			</ul>
			<img src={countryInfo.flags.png} alt="delete" />
		</div>
		)
	}
	return (
		<div>
		Nothing found
		</div>
	)
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [countryQuery, setCountryQuery] = useState('')

  const updateCountryQuery = (event) => {
	  setCountryQuery(event.target.value)
  }
  
  const hook = () => {
	  axios.get('https://restcountries.com/v3.1/all').then(
		  response => {
			  console.log('promise fullfilled')
			  setCountries(response.data)
			  console.log(response.data)
		  }
	  )
  }
  useEffect(hook, [])


  const found = countries.filter(({name}) => name.official.toLowerCase().includes(countryQuery.toLowerCase()))
  return (
	  <div>
		<p>find countries: <input onChange={updateCountryQuery}/></p>
	  	<DisplayFound found={found} querySetter={setCountryQuery} />
	  </div>
  )
}

export default App
