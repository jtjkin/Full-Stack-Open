import React from 'react'
import { CoursePart } from '../types'

export const Total: React.FC<{courseParts : CoursePart[]}> = ({courseParts}) => (
    <p>
        Number of exercises{" "}
        {courseParts.reduce(
            (carry: number, part: { exerciseCount: number }) => 
            carry + part.exerciseCount, 0)
        }
  </p>
)