import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            name
            id
            born
            bookCount
        }
    }
`

export const ALL_BOOKS = gql`
    query {
        allBooks {
            title
            id
            author {
                name
            }
            published
            genres
        }
    }
`

export const BOOKS_BY_GENRE = gql`
    query allBooks($genre: String) {
        allBooks(genre: $genre) {
            title
            id
            author {
                name
            }
            published
        }
    }
`

export const CREATE_BOOK = gql`
    mutation createBook(
        $title: String!, 
        $author: String!, 
        $published: Int!,
        $genres: [String]
        ) {
            addBook(
                title: $title,
                author: $author,
                published: $published,
                genres: $genres
            ) {
                title
                author {
                    name
                    id
                    born
                }
                published
                genres
                id
            }
        }
`

export const UPDATE_AUTHOR_BIRTHYEAR = gql`
    mutation updateAuthorBirthyear($name: String!, $setBornTo: Int!) {
        editAuthor(
            name: $name,
            setBornTo: $setBornTo
        ) {
            name
            born
            id
        }
    }
`

export const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            value
        }
    }
`

export const GET_ME = gql`
    query {
        me {
            favoriteGenre
        }
    }
`

export const BOOK_ADDED = gql`
    subscription {
        bookAdded {
            title
            author {
                name
            }
            published
            genres
        }
    }
`