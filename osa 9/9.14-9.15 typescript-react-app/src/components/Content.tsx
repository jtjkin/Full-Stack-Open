import React from 'react'
import Part from './Part'
import { CoursePart } from '../types'

export const Content: React.FC<{courseParts : CoursePart[]}> = ({courseParts}) => (
        <div>
            {courseParts.map((course: any) => 
                <Part part={course}/>)}
        </div>
)