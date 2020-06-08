import axios from 'axios'

const baseUrl = 'http://localhost:3003/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response
}

const addNew = async (content) => {
    const newAnecdote = {
        content: content,
        id: getId(),
        votes: 0
    }
    const response = await axios.post(baseUrl, newAnecdote)
    return response.data
}

const updateVote = async (id, content, votes) => {
    const updateUrl = baseUrl + '/' + id
    const newVotes = {
        content, 
        votes: votes + 1
    }
    const response = await axios.put(updateUrl, newVotes)
    return response
}

export default { getAll, addNew, updateVote }