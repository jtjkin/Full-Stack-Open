import React from 'react'

export const Header: React.FC<{courseName : string}> = ({courseName}) => (
        <h1>{courseName}</h1>
)