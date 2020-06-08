import anecdotesService from "../services/anecdotesService"

const anecdotesAtStart = []
const initialState = anecdotesAtStart

//Action creators
export const voteAnecdote = (id, anecdote, votes) => {
  return async dispatch => {
    const updatedAnecdote = await anecdotesService.updateVote(id, anecdote, votes)
    dispatch(
      {type: 'VOTE', data: updatedAnecdote}
    )
  }
}

export const addAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.addNew(content)
    dispatch(
      {type: 'ADD', content: newAnecdote}
    )
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const initialAnecdotes = await anecdotesService.getAll()
    dispatch(
      {type: 'INIT_ALL', data: initialAnecdotes.data}
    )
  }
}
//--------------


const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'VOTE':
      console.log('TESTI:', action.data.data)
      let voted = state.find(n => n.id === action.data.data.id)
      voted.votes += 1

      const newState = state.map(anecdote => 
        anecdote.id !== action.id ? anecdote : voted)

      return newState.sort((a,b) => b.votes - a.votes)
    case 'ADD':
      return state.concat(action.content)
    case 'INIT_ALL':
      return action.data    
    default: return state  
  }

}

export default reducer