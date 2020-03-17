import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = (props) => {
    return(
        <button onClick={props.handleClick}>{props.name}</button>
    )
}

const Statistics = (props) => {
    const good = props.good
    const bad = props.bad
    const neutral = props.neutral
    const all = good + bad + neutral
    const average = (good - bad) / (good + bad + neutral)
    const percentage = (good / (good + bad + neutral)) * 100

    if (good === 0 && bad === 0 && neutral === 0) {
        return (
            "No feedback given"
        )
    }

    return(
        <table>
            <tbody>
                <StatisticsLine text="good" value={good}/>
                <StatisticsLine text="neutral" value={neutral}/>
                <StatisticsLine text="bad" value={bad}/>
                <StatisticsLine text="all" value={all}/>
                <StatisticsLine text="average" value={average}/>
                <StatisticsLine text="percentage" value={percentage}/>
            </tbody>
        </table>
    )
}

const StatisticsLine = (props) => {
    if (props.text === "percentage") {
        return (
            <tr>
                <td>{props.text}</td> 
                <td>{props.value} %</td>
            </tr>
        )
    }

    return(
        <tr>
            <td>{props.text}</td> 
            <td>{props.value}</td>
        </tr>
    )
}

const App = () => {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const addGood = () => {
        setGood(good + 1)
    }

    const addNeutral = () => {
        setNeutral(neutral + 1)
    }

    const addBad = () => {
        setBad(bad + 1)
    }

    return(
        <div>
            <h2>give feedback</h2>
            <Button handleClick={addGood} name="good"/>
            <Button handleClick={addNeutral} name="neutral"/>
            <Button handleClick={addBad} name="bad"/>
            <h2>statistics</h2>
            <Statistics good={good} bad={bad} neutral={neutral}/>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));