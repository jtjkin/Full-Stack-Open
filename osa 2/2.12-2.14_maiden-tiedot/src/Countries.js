import React, {useState} from 'react';
import SingleCountry from './SingleCountry'

const Countries = (props) => {
    const [selected, setSelected] = useState([])
    const [buttonClicked, setButton] = useState(false)

    const showSingleCountry = (event) => {
        const filtered = props.countries.filter(country =>
            country.alpha3Code.includes(event))
        
        setButton(true)
        setSelected(filtered)
    }

    if(buttonClicked === true) {
        return (
            <SingleCountry country={selected}/>
        )
    }

    return (
        <div>
            {props.countries.map( (country) => 
                <p key={country.alpha3Code}>{country.name}
                <button onClick={() => {showSingleCountry(country.alpha3Code)}}>show</button>
                </p>
            )}
        </div>
    )

}

export default Countries