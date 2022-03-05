import { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = (props) => {
	return (
	<div>
		<p>
		temperature {props.weather && props.weather.main.temp} Celsius 
		<br></br>
		{props.weather && Array([]).map(() => 
			<img src={`http://openweathermap.org/img/wn/${props.weather.weather[0].icon}@2x.png`} alt='weather_icon' key='well'/>)
		}
		<br></br>
		wind {props.weather && props.weather.wind.speed} m/s
		</p>
	</div>
	)
}

const OneCountry = (props) => {
  	const [weather, setWeather] = useState(null)
	const countryInfo = props.found[0]
	const languages = Object.values(countryInfo.languages)
	const api_key = process.env.REACT_APP_API_KEY
	const request = `https://api.openweathermap.org/data/2.5/weather?lat=${countryInfo.latlng[0]}&lon=${countryInfo.latlng[1]}&appid=${api_key}&units=metric`
	console.log(api_key)
	console.log(request)
	const weatherHook = () => {
		  console.log('here')
		  axios.get(request).then(
			  response => {
				  console.log('weather promise fullfilled')
				  setWeather(response.data)
				  console.log(response.data)
			}
		)
	}
	useEffect(weatherHook, [])
	console.log(weather)
	return (
	<div>
		<h1>{countryInfo.name.official}</h1>
		<p>
		capital {countryInfo.capital[0]} <br></br>
		area {countryInfo.area}
		</p>
		<h3>languages:</h3>
		<ul>
		{languages.map(language => <li key={language}>{language}</li>)}
		</ul>
		<img src={countryInfo.flags.png} alt="delete" />
		<h3>Weather in {countryInfo.capital[0]}</h3>
		<Weather weather={weather} />
	</div>
	)
}

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
		return <OneCountry found={props.found} />
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
