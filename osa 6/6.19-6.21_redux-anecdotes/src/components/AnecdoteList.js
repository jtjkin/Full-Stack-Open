import React from 'react'
import { useDispatch, connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { addMessage } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
    const allAnecdotes = props.anecdotes
    const filter = props.filter
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

const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes,
        filter: state.filter
    }
}


const ConnectedAnecdoteList = connect(mapStateToProps)(AnecdoteList)
export default ConnectedAnecdoteList