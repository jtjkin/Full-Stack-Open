import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
    return(
        <div>
        <h1>{props.course.name}</h1>
        </div>
    )
}

const Content = (props) => {

    return(
        <div>
        <Part part={props.course.parts[0]}/>
        <Part part={props.course.parts[1]}/>
        <Part part={props.course.parts[2]}/>
        </div>
    )
}

const Part = (props) => {

    return(
        <p>{props.part.name} {props.part.excercises}</p>
    )
}

const Total = (props) => {
    return(
        <div>
        <p>Number of excercises {props.course.parts[0].excercises + props.course.parts[1].excercises + props.course.parts[2].excercises}</p>
        </div>
    )
}

const App = () => {
    const course = {
        name: "Half Stack application development",

        parts: [
            {
                name: "Fundamentals of React",
                excercises: 10
            },

            {
                name: "Using props to pass data",
                excercises: 7
            },

            {
                name: "State of a component",
                excercises: 14
            }
        ]
    }

    return(
        <div>
            <Header course={course}/>
            <Content course={course}/>
            <Total course={course}/>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
