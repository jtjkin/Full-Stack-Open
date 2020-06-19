import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ALL_BOOKS, BOOKS_BY_GENRE } from '../queries'
import BookTable from './BookTable'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [buttons, setButtons] = useState([])
  const [books, setBooks] = useState([])
  const [setFilteredBooks, filterResult] = useLazyQuery(BOOKS_BY_GENRE)
  const [booksFilter, setBooksFilter] = useState([])
  const [genre, setGenre] = useState('')

  const [filterOff, setFilterOff] = useState(false)

  useEffect(() => {
    if(result.data) {
      setBooks(result.data.allBooks)
    }
  }, [result])

  
  useEffect(() => {
      let genreList = []

      books.forEach(book => {
        if (book.genres.length > 0) {
          book.genres.forEach(genre => {
            if(!genreList.includes(genre)) {
              genreList.push(genre)
            }
          })
        }
      })

      setButtons(genreList) 
  }, [books])

  useEffect(() => {
    if(filterResult.data) {
      setBooksFilter(filterResult.data.allBooks)
    }
  }, [filterResult])

  const filter = (genre) => {
    setFilteredBooks({variables: {genre: genre}})
    setGenre(genre)
    setFilterOff(true)
  }


  if (!props.show) {
    return null
  }

  if(result.loading) {
    return <div>Loading...</div>
  }

  if(filterOff) {
    return (
      <BookTable 
        books={booksFilter}
        buttons={buttons}
        filter={filter}
        setFilterOff={setFilterOff}
        showAllButton={true}
        genre={genre}
      />
  )
  }
  return (
    <BookTable 
      books={books}
      buttons={buttons}
      filter={filter}
      showAllButton={false}
    />
  )
}

export default Books