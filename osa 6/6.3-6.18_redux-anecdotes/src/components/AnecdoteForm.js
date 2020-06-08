import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { addMessage } from '../reducers/notificationReducer'

const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const addNew = async (event) => {
        event.preventDefault()
        const content = event.target.add.value
        event.target.add.value = ''
        dispatch(addAnecdote(content))
        dispatch(addMessage(`You added '${content}'`, 5))
    }

    return (
        <div>
            <h2>create new</h2>
        <form onSubmit={addNew}>
            <div><input name='add'/></div>
            <button type='submit'>create</button>
        </form>
        </div>
    )

}

export default AnecdoteForm