import React, { useState } from 'react'
import commentService from '../services/commentService'
import { useDispatch } from 'react-redux'
import { initBlogs } from '../reducers/blogsReducer'

import { Input, Button } from './style-components/generalStyles'

const Comments = (props) => {
    const [comment, setComment] = useState('')
    const dispatch = useDispatch()

    const blog = props.blog

    const randomId = () => {
        return Math.floor(Math.random() * 99999999999)
    }

    const addComment = async (event) => {
        event.preventDefault()

        const newComments = blog.comments.concat(comment)

        const newData = {
            id: blog.id,
            comments: newComments
        }

        const result = await commentService.postNewComment(newData)
        console.log(result)

        dispatch(initBlogs())
        setComment('')
    }

    if (blog === undefined) {
        return (
           <div>
               <h3>Comments</h3>
               <div>This blog was added before the era of commenting. 
                   Unfortunately this blog cannot be commented.</div>
           </div> 
        )
    }
    if(blog.comments.length === 0) {
        return (
            <div>
                <h3>Comments</h3>
                <form onSubmit={addComment}>
                    Add Comment: 
                    <Input 
                        type='text' 
                        value={comment} 
                        onChange={({target}) => setComment(target.value)}/>
                    <Button type='submit'>Add comment</Button>  
                </form>
                <div>No comments. Be first to comment.</div>
            </div>
        )
    }

    return (
        <div>
            <h3>Comments</h3>
            <form onSubmit={addComment}>
                <Input 
                    type='text' 
                    value={comment} 
                    onChange={({target}) => setComment(target.value)}/>
                <Button type='submit'>Add comment</Button>    
             </form>
            <ul>
                {blog.comments.map(comment =>
                    <li key={randomId}>{comment}</li>)}
            </ul>    
        </div>
    )
}

export default Comments