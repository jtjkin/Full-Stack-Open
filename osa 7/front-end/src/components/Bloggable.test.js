import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, fireEvent} from '@testing-library/react'
import Blogglable from './Bloggable'

const blog = {
    id: "123456789",
    title: "Testing",
    author: "Tester",
    likes: 345,
    url: "testsite.com",
    user: {id: "12345678990"}
}

const user = {
    id: "12345678990"
}

let component

beforeEach(() => {
    component = render(
        <Blogglable 
            key={blog.id}
            url={blog.url}
            likes={blog.likes}
            user={blog.user}
            id={blog.id}
            blogTitle={blog.title}
            loggedInUser={user}
        />
    )
})

test ('url and likes are hidden on start', () => {

    //component.debug()

    const div = component.container.querySelector('.toggableContent')

    expect(div).toHaveStyle('display: none')

})

test('url and likes are shown when button is clicked', () => {
    const button = component.container.querySelector('.hideButton')

    fireEvent.click(button)

    const div = component.container.querySelector('.toggableContent')

    expect(div).toHaveStyle('display: block')
})

test('clicking like-button twice calls function each time', () => {
    const updateLikes = jest.fn()
    const button = component.container.querySelector('.likeButton')

    fireEvent.click(button)
    fireEvent.click(button)

    //component.debug()

    expect(updateLikes).toBeCalled();
    expect(updateLikes.mock.calls).toHaveLength(2)
    /*
        Expected length: 2
        Received length: 0
        Received array:  []

        En ymmärrä missä on vika... ikäänkuin jest.fn() olisi importtaamatta
    */
})