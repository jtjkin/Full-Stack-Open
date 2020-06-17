const user = null

//Action creators
export const addUser = (user) => {
    return {type: 'ADD_USER', user}
}

export const removeUser = () => {
    return {type: 'REMOVE_USER'}
}
//----------------


const reducer = (state = user, action) => {
    switch (action.type) {
        case 'ADD_USER':
            return action.user
        case 'REMOVE_USER':
            return null    
        default: return state        
    }
}

export default reducer
