import blogsService from '../services/blogs'

const blogs = []

//Action creators
export const initBlogs = () => {
    return async dispatch => {
        const initBlogs = await blogsService.getAll()
        initBlogs.sort(function(a, b) {
            return b.likes - a.likes
          })

        dispatch(
            {type: 'INIT_ALL', data: initBlogs}
        )
    }
}

export const addBlog = (content) => {
    return async dispatch => {
        const newBlog = await blogsService.postNew(content)
        dispatch(
            {type: 'ADD', content: newBlog}
        )
    }
}
//----------------


const reducer = (state = blogs, action) => {
    switch (action.type) {
        case 'INIT_ALL':
            return action.data
        case 'ADD':
            const newState = state.concat(action.content)
            newState.sort(function(a, b) {
                return b.likes - a.likes
              })
            return newState
        default: return state        
    }
}

export default reducer