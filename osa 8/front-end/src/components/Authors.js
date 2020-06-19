  
import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, UPDATE_AUTHOR_BIRTHYEAR } from '../queries'

const Authors = (props) => {
  const [person, setPerson] = useState('')
  const [birthyear, setBirthyear] = useState('')

  const result = useQuery(ALL_AUTHORS)

  const [updateAuthorBirthyear] = useMutation(UPDATE_AUTHOR_BIRTHYEAR, {
    onError: (error) => {
      alert(error.graphQLErrors[0].message)
    }
  })

  const handleChange = (event) => {
    setPerson(event.target.value)
  }

  const submit = (event) => {
    event.preventDefault()

    if(person === '') {
      alert('Please select a person')
      return
    }

    const year = Number(birthyear)

    updateAuthorBirthyear({variables: {
      name: person, setBornTo: year
    }})

    setPerson('')
    setBirthyear('')
  }

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>Loading...</div>
  }

  const authors = result.data.allAuthors

  if (!localStorage.getItem('library-user-token')) {
    return (
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>
                born
              </th>
              <th>
                books
              </th>
            </tr>
            {authors.map(a =>
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            )}
          </tbody>
        </table> 
      </div>
    )
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          Name:
          <select value={person} onChange={handleChange}>
            <option key='select' value='-- select --'>-- select --</option>
            {authors.map(author => 
              <option key={author.id} value={author.name}>{author.name}</option>
            )}
          </select>
        </div>
        <div>
          Born: 
          <input value={birthyear} onChange={({ target }) => setBirthyear(target.value)}/>
        </div>
        <button type='submit'>update author</button>
      </form>

    </div>
  )
}

export default Authors
