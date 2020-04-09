import React from 'react';
import ServiceMethods from '../services/ServiceMethods'

const Person = (props) => {

    const removeItem = () => {
        const removal = window.confirm(`Delete ${props.person.name}?`)
        if (removal === true) { 
            ServiceMethods
            .remove(props.person.id)
            
            props.setPersons(props.allPersons
                .filter(n => n.id !== props.person.id))
            props.setNewFilteredPersons(props.allPersons
                .filter(n => n.id !== props.person.id))

            props.setMessage(`${props.person.name} has been removed.`)
            setTimeout( () => {
                props.setMessage(null)
            }, 2000)    
        }        
    }

    return(
        <p className="person">{props.person.name} {props.person.phonenumber} <button onClick={removeItem}>delete</button>
        </p>
    )
}

export default Person