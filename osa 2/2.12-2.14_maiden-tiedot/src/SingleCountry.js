import React, { useState, useEffect } from 'react'
import Axios from 'axios'

const SingleCountry = (props) => {
    const [weather, setWeather] = useState([])
    const [loaded, setLoaded] = useState(false)
    const [iconURL, setIconURL] = useState("")

    const country = props.country[0]
    const apiKey = process.env.REACT_APP_API_KEY
    const weatherAPI = "https://api.openweathermap.org/data/2.5/weather?q=" 
        + country.capital + "&units=metric&appid="
        + apiKey

    useEffect(() => {
        Axios
        .get(weatherAPI)
        .then(response => {
          setWeather(response.data)
          setLoaded(true)
          setIconURL("http://openweathermap.org/img/wn/" + response.data.weather[0].icon + "@2x.png")
        })
    }, [])

    if (loaded === true) {

        return(
            <div>
                <h1>{country.name}</h1>
                <p>Capital {country.capital}</p>
                <p>Population {country.population}</p>
    
                <h2>Languages</h2>
                <ul>
                    {country.languages.map( (language) =>
                    <li key={language.name}>{language.name}</li>)}
                </ul>
    
                <img src={country.flag} alt={country.nativeName}></img>
    
                <h2>Weather in {country.capital}</h2>
                <p><span>Temperature:</span> {weather.main.temp} Celsius</p>
                <img className="weather" src={iconURL} alt=""></img>
                <p><span>Wind:</span> {weather.wind.speed} m/s, direction {weather.wind.deg}</p>  
            </div>    
        )
    }  

    return(
        <div>
            <h1>{country.name}</h1>
            <p>Capital {country.capital}</p>
            <p>Population {country.population}</p>

            <h2>Languages</h2>
            <ul>
                {country.languages.map( (language) =>
                <li key={language.name}>{language.name}</li>)}
            </ul>

            <img src={country.flag} alt={country.nativeName}></img>

            <h2>Weather in {country.capital}</h2>
            <p>Loading weather information</p>
            
        </div>    
    )
}

export default SingleCountry