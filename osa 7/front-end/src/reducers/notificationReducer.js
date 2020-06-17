const initialMessage = ''

//Action creators
export const clearMessage = () => {
    return {type: 'CLEAR'}
}

export const addNotificationMessage = (message, time) => {
    return  dispatch => {
        setTimeout(() => {
            dispatch(clearMessage())
        }, time * 1000)
        
        dispatch(
          {type: 'MESSAGE', message}
        )
    }
}
//--------------

const reducer = (state = initialMessage, action) => {
    switch (action.type) {
        case 'MESSAGE':
            return action.message
        case 'CLEAR':
            return ''   
        default: return state        
    }
}

export default reducer