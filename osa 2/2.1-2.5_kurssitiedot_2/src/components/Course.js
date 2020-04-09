import React from 'react';


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
            {props.course.parts.map( (part) =>
                <Part key={part.id} part={part} />
            )}
        </div>
    )
}

const Part = (props) => {

    return(
        <p>{props.part.name} {props.part.excercises}</p>
    )
}

const Total = (props) => {
    const reducer = (sum, currentValue) => sum + currentValue;
    const excercises = props.course.parts.map((part) => part.excercises)
    const total = excercises.reduce(reducer)

    return(
        <div>
        <p className="total">Number of excercises: {total}</p>
        </div>
    )
}

const Course = ({course}) => {
    return(
        <>
            <Header course={course}/>
            <Content course={course}/>
            <Total course={course} />
        </>
    )
}

export default Course