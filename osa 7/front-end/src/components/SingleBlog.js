import React from 'react'
import blogService from '../services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { initBlogs } from '../reducers/blogsReducer'
import Comments from '../components/Comments'

//styles
import { 
    DeleteButton, Header1, Space, AddedSpaceLeftButton 
} from './style-components/generalStyles'

const SingleBlog = ({ blog }) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const history = useHistory()

    if (!blog) {
        return null
    }

    const updateLikes = async () => {
    const newLike = blog.likes + 1

    const newInfo = {
        id: blog.id,
        likes: newLike
    }

    const result = await blogService.update(newInfo)
    dispatch(initBlogs())

    console.log(result)
    }
    
    const deletePost = async () => {
    const info = blog.id

    const message = window.confirm(`Do you really want to delete blog: ${blog.title}?`)

    if (message) {
        const result = await blogService.deletePost(info)
        dispatch(initBlogs())
        history.push('/')
        console.log(result)
    }

    }

    if (user.id === blog.user.id) {
        return (
            <Space>
                <Header1>{blog.title}</Header1>
                <h2>by {blog.author}</h2>
                <a href={blog.url} 
                    target='_blank' rel="noopener noreferrer">
                        {blog.url}
                </a>
                <div>
                    {blog.likes} likes
                    <AddedSpaceLeftButton onClick={updateLikes}>like</AddedSpaceLeftButton>
                </div>
                <div>added by {blog.user.name}</div>
                <DeleteButton onClick={deletePost}>delete post</DeleteButton>
                <Comments blog={blog}/>
             </Space>
        )}


    return (
        <div>
            <Header1>{blog.title}</Header1>
            <h2>by {blog.author}</h2>
            <a href={blog.url} 
                target='_blank' rel="noopener noreferrer">
                    {blog.url}
            </a>
            <div>
                {blog.likes} likes
                <AddedSpaceLeftButton onClick={updateLikes}>like</AddedSpaceLeftButton>
            </div>
            <div>added by {blog.user.name}</div>

            <Comments comments={blog.comments}/>
        </div>
    )
}

export default SingleBlog