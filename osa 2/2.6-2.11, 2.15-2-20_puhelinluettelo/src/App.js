import React, {useState, useEffect} from 'react';
import Filter from './components/Filter';
import Persons from './components/Persons';
import Form from './components/Form';
import ServiceMethods from './services/ServiceMethods'
import ErrorMessage from './components/ErrorMessage'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filter, setNewFilter] = useState("")
  const [filteredPersons, setNewFilteredPersons] = useState([])
  const [message, setMessage] = useState(null)
  const [messageClass, setMessageClass] = useState("message")

  useEffect(() => {
    ServiceMethods
      .getAll()
      .then(all => {
        setPersons(all)
        setNewFilteredPersons(all)
      })
  }, [])

  const changeHandler = (event) => {
    setNewName(event.target.value)
  }

  const numberHandler = (event) => {
    setNewNumber(event.target.value)
  }

  const filterHandler = (event) => {
    setNewFilter(event.target.value)

    if (event.target.value === "") {
      setNewFilteredPersons(persons)
    }

    const filtered = persons.filter(person =>
      person.name.toLowerCase().includes(event.target.value))
    
    setNewFilteredPersons(filtered) 
  }

  const handleSubmit = (event) => {
    event.preventDefault()
      if(checkUniques()) {
       const isAlready = window.confirm(`${newName} is already added to the phonebook, update old number?`)

       if (isAlready === true) {
          const person = persons.find(person => person.name === newName)
          const newPerson = {...person, phonenumber: newNumber}

          ServiceMethods
          .update(person.id, newPerson)
          .then(returnedResponse => {
            setPersons(persons.map(person2 => person2.id !== person.id ? person2 : returnedResponse))
            setNewFilteredPersons(persons.map(person2 => person2.id !== person.id ? person2 : returnedResponse))
            setMessage(`${newName}'s phonenumber has been updated!`)
            setTimeout( () => {
              setMessage(null)
            }, 2000)
          }).catch(error => {
            setMessageClass("errorMessage")
            setMessage(`Cannot update. ${person.name} has already been deleted from server.`)
            setTimeout( () => {
              setMessage(null)
              setMessageClass("message")
            }, 3000)
            setNewName("")
            setNewNumber("")
            return
          })
       }

       setNewName("")
       setNewNumber("")
       return
     }

    const newInput = {
      name: newName,
      phonenumber: newNumber
    }

    ServiceMethods
      .addNew(newInput)
      .then(returnedInfo => {
        setPersons(persons.concat(returnedInfo))
        setNewFilteredPersons(persons.concat(returnedInfo))
      })
    
    setMessage(`${newName} has been added!`)
    setTimeout( () => {
      setMessage(null)
    }, 2000)  

    setNewName("")
    setNewNumber("")
  }

  const checkUniques = () => {
    const found = persons.map( (person) =>
    person.name)
    return found.includes(newName)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <ErrorMessage message={message} messageClass={messageClass}/>
      <Filter value={filter} filterHandler={filterHandler}/>
      <h2>Add new</h2>
      <Form handleSubmit={handleSubmit}
        nameValue={newName}
        nameChange={changeHandler}
        numberValue={newNumber}
        numberChange={numberHandler}/>
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} 
        setPersons={setPersons} 
        setNewFilteredPersons={setNewFilteredPersons}
        allPersons={persons}
        setMessage={setMessage}/>
    </div>
  );
}

export default App;
