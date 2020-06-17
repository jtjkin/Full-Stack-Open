import React from 'react'
import { useSelector } from 'react-redux'

import { Header1, BlogList } from './style-components/generalStyles'

const User = ({ blogUser }) => {
    const blogs = useSelector(state => state.blogs)

    if (blogUser === undefined) {
        return null
    } else {
        const userId = blogUser.user.id

        return (
            <div>
                <Header1>{blogUser.user.name}</Header1>
                <BlogList>added blogs</BlogList>
                <ul> {/* eslint-disable-next-line */ }
                {blogs.map(blog => {
                    if (blog.user.id === userId) {
                        return <li key={blog.id}>{blog.title}</li>
                    }
                })}
                </ul>
            </div>
        )
    }
    
    
}

export default User