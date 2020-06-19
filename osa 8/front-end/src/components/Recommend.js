import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { GET_ME, BOOKS_BY_GENRE } from '../queries'

const Recommend = (props) => {
    const result = useQuery(GET_ME)
    const [favorite, setFavorite] = useState('')
    const [books, setBooks] = useState([])
    const [getList, listResult] = useLazyQuery(BOOKS_BY_GENRE)

    useEffect(() => {
        if(result.data) {
            setFavorite(result.data.me.favoriteGenre)
        }
    }, [result.data])

    useEffect(() => {
        if(favorite.length > 0) {
            getList({variables: {genre: favorite}})
        }
    }, [favorite]) //eslint-disable-line

    useEffect(() => {
        if(listResult.data) {
            setBooks(listResult.data.allBooks)
        }
    }, [listResult])
    

    if (!props.show) {
        return null
      }

    if(books.length === 0) {
        return <div>Loading...</div>
    }  

    return (
        <div>
            <h2>Recommendations</h2>
            <div>books in your favorite genre <b>{favorite}</b></div>
            <br></br>

            <table>
            <tbody>
                <tr>
                <th></th>
                <th>
                    author
                </th>
                <th>
                    published
                </th>
                </tr>
                {books.map(a =>
                <tr key={a.title}>
                    <td>{a.title}</td>
                    <td>{a.author.name}</td>
                    <td>{a.published}</td>
                </tr>
                )}
            </tbody>
            </table>
        </div>
    )
}

export default Recommend