import React from 'react'
import Person from './Person'

const Persons = (props) => {

    return(
        <div>
            {props.persons.map( (person) =>
            <Person key={person.name} 
                    person={person} 
                    setPersons={props.setPersons}
                    setNewFilteredPersons={props.setNewFilteredPersons}
                    allPersons={props.allPersons}
                    setMessage={props.setMessage}/>)}
      </div>
    )
}

export default Persons