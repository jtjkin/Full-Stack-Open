import React from 'react'

const BookTable = (props) => {
    if(props.showAllButton) {
        return(
            <div>
            <h2>books</h2>
            <div>in genre <b>{props.genre}</b></div>
            <br></br>

            <table>
            <tbody>
                <tr>
                <th></th>
                <th>
                    author
                </th>
                <th>
                    published
                </th>
                </tr>
                {props.books.map(a =>
                <tr key={a.title}>
                    <td>{a.title}</td>
                    <td>{a.author.name}</td>
                    <td>{a.published}</td>
                </tr>
                )}
            </tbody>
            </table>
            <button onClick={() => props.setFilterOff()}>all genres</button>
            {props.buttons.map(b => 
            <button key={b} onClick={() => props.filter(b)}>{b}</button>)}
        </div> 
        )
    }

    return (
        <div>
            <h2>books</h2>

            <table>
            <tbody>
                <tr>
                <th></th>
                <th>
                    author
                </th>
                <th>
                    published
                </th>
                </tr>
                {props.books.map(a =>
                <tr key={a.title}>
                    <td>{a.title}</td>
                    <td>{a.author.name}</td>
                    <td>{a.published}</td>
                </tr>
                )}
            </tbody>
            </table>
            {props.buttons.map(b => 
            <button key={b} onClick={() => props.filter(b)}>{b}</button>)}
        </div>
    )
}

export default BookTable