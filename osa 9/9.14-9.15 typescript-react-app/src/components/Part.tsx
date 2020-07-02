import React from 'react'
import { CoursePart } from '../types';

const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

const Part: React.FC<{part : CoursePart}> = ({part}) => {
    switch (part.name) {
        case "Fundamentals":
            return (
                <div>
                    <b>{part.name} {part.exerciseCount}</b>
                    <p>{part.description}</p>
                    <br></br>
                </div>
            );
        case "Using props to pass data":
            return (
                <div>
                    <b>{part.name} {part.exerciseCount}</b>
                    <p>{part.groupProjectCount}</p>
                    <br></br>
                </div>
            );
        case "Deeper type usage":
            return (
                <div>
                    <b>{part.name} {part.exerciseCount}</b>
                    <p>{part.description}</p>
                    <p>{part.exerciseSubmissionLink}</p>
                    <br></br>
                </div>
            );
        case "Basic education": 
                return (
                    <div>
                    <b>{part.name} {part.exerciseCount}</b>
                    <p>{part.description}</p>
                    <p>{part.teacher}</p>
                    <br></br>
                </div>
                )
        default:
            return assertNever(part);
    }
}

export default Part;