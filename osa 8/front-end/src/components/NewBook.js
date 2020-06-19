import React, { useState } from 'react'
import { useMutation, useApolloClient } from '@apollo/client'
import { CREATE_BOOK, /* ALL_AUTHORS, ALL_BOOKS */ } from '../queries'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const client = useApolloClient()

  const [createBook] = useMutation(CREATE_BOOK, {
/*    refetchQueries: [
      { query: ALL_AUTHORS},
      { query: ALL_BOOKS}
    ], */
    onError: (error) => {
        alert(error.graphQLErrors[0].message)
    },
    update: (store, response) => {
      props.updateCacheWith(response.data.createBook)
      client.resetStore() //Tehtävän 8.22 ratkaisu, jotta tulokset päivittyvät myös kun genrefiltteri on päällä.
    }
  })

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    const year = Number(published)
    
    createBook({
      variables: {
        title, author, published: year, genres
      }
    })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
    props.setPage('books')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook