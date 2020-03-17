import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [points, setPoints] = useState([0, 0, 0, 0, 0, 0]) 
    const [currentPoint, setCurrent] = useState(0)
    const [highestIndex, setHighestIndex] = useState(0)
    const [highestScore, setHighestScore] = useState(0)

    const handleVote = () => {
        const copy = points
        copy[selected] += 1
        setPoints(copy)
        setCurrent(points[selected])
        handleHighest()
    }

    const handleChange = () => {
        const random = Math.floor(Math.random() * (anecdotes.length - 0) ) + 0
        setSelected(random)
        setCurrent(points[random])
        handleHighest()
    }

    const handleHighest = () => {
        let highestIndex = 0
        let highestScore = 0

        const copy = points

        for (let i = 0; i < copy.length; i++) {
            if (copy[i] > highestScore) {
                highestScore = copy[i]
                highestIndex = i
            }
        }

        setHighestIndex(highestIndex)
        setHighestScore(highestScore)
    }

    return (
        <div>
            <h1>Anecdote of the day</h1>
            <p>{props.anecdotes[selected]}</p>
            <p>has {currentPoint} votes</p>
            <button onClick={handleVote}>vote</button>
            <button onClick={handleChange}>next anecdote</button>
            <h1>Anecdote with most votes</h1>
            <p>{props.anecdotes[highestIndex]}</p>
            <p>has {highestScore} votes</p>
        </div>
    )
}

ReactDOM.render(<App anecdotes={anecdotes}/>, document.getElementById('root'));