import React, {useState} from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, fireEvent} from '@testing-library/react'
import AddBlog from './AddBlog'

test('<AddBlog /> works on submit', () => {
    const newBlog = jest.fn()

    const component = render(
        <AddBlog  />
    )

    const inputTitle = component.container.querySelector('#title')
    const inputAuthor = component.container.querySelector('#author')
    const inputUrl = component.container.querySelector('#url')
    const form = component.container.querySelector('#form')

    fireEvent.change(inputTitle, {
        target: {value: 'Testing'}
    })
    fireEvent.change(inputAuthor, {
        target: {value: 'Testaaja'}
    })
    fireEvent.change(inputUrl, {
        target: {value: 'testi.fi'}
    })
    fireEvent.submit(form)

    expect(newBlog.mock.calls).toHaveLength(1)
    /*
    Expected length: 1
    Received length: 0
    Received array:  []

    Sama vika kuin edellisenkin tehtävän kanssa. Ikään kuin jest.fn() ei toimisi niin kuin sen kuuluisi
    */
})

