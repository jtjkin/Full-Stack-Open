import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Countries from './Countries'
import SingleCountry from './SingleCountry'
import './App.css'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState("")
  const [filteredSelection, setFilteredSelection] = useState([])

  useEffect(() => {
    Axios
    .get("https://restcountries.eu/rest/v2/all")
    .then(response => {
      setCountries(response.data)
      setFilteredSelection(response.data)
    })
  }, [])

  const handleInputChange = (event) => {
    setFilteredSelection([])
    setFilter(event.target.value)
    filterSelection(event.target.value)
  }

  const filterSelection = (props) => {
    if (props === "") {
      setFilteredSelection(countries)
    } 

    const filtered = countries.filter(country => 
      country.name.toLowerCase().includes(props))
    
    setFilteredSelection(filtered)  
  }

  if (filteredSelection.length > 10) {
    return (
      <div>
        <div>
          <label htmlFor="find-country">find countries</label>
          <input id="find-country" value={filter} onChange={handleInputChange}/>
        <div>Too many countries, specify another filter</div>
        </div>
      </div>
    )
  }

  if (filteredSelection.length === 0) {
    return (
      <div>
        <div>
          <label htmlFor="find-country">find countries</label>
          <input id="find-country" value={filter} onChange={handleInputChange}/>
        <div>No countries found, change filter</div>
        </div>
      </div>
    )
  }

  if (filteredSelection.length === 1) {
    return (
      <div>
        <div>
          <label htmlFor="find-country">find countries</label>
          <input id="find-country" value={filter} onChange={handleInputChange}/>
        </div>
        <SingleCountry country={filteredSelection}/>
      </div>
    )
  }

  return (
    <div>
    <div>
      <label htmlFor="find-country">find countries</label>
      <input id="find-country" value={filter} onChange={handleInputChange}/>
    </div>
    <Countries countries={filteredSelection} />
    </div>
  );

}

export default App;
