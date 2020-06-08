import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { addMessage } from '../reducers/notificationReducer'
//import { clearMessage } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const allAnecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)
    let anecdotes

    if (filter === '') {
        anecdotes = allAnecdotes
    } else {
        anecdotes = allAnecdotes.filter(n => n.content.includes(filter))
    }

    
    const dispatch = useDispatch()

    const vote = (id, anecdoteContent, anecdoteVotes) => {

        dispatch(voteAnecdote(id, anecdoteContent, anecdoteVotes))
        dispatch(addMessage(`You voted '${anecdoteContent}'`, 5))
    }

    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote.id, anecdote.content, anecdote.votes)}>vote</button>
                </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList